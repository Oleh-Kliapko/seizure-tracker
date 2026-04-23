// hooks/useGoogleAuth.ts

import { auth } from "@/config/firebase"
import { GOOGLE_AUTH_CONFIG } from "@/config/googleAuth"
import { createUser, getUser } from "@/services"
import { parseFirebaseError } from "@/utils"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import {
	GoogleAuthProvider,
	reauthenticateWithCredential,
	signInWithCredential,
} from "firebase/auth"
import { useState } from "react"

WebBrowser.maybeCompleteAuthSession()

type GoogleAuthResult = {
	success: boolean
	error?: string
	credential?: ReturnType<typeof GoogleAuthProvider.credential>
}

export function useGoogleAuth() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [request, response, promptAsync] = Google.useAuthRequest({
		iosClientId: GOOGLE_AUTH_CONFIG.iosClientId,
		webClientId: GOOGLE_AUTH_CONFIG.webClientId,
	})

	const getGoogleCredential = async (): Promise<GoogleAuthResult> => {
		try {
			const result = await promptAsync()

			if (result.type !== "success") {
				return { success: false, error: "Авторизацію скасовано" }
			}

			const { id_token } = result.params
			if (!id_token) {
				return { success: false, error: "Не вдалось отримати токен" }
			}

			const credential = GoogleAuthProvider.credential(id_token)
			return { success: true, credential }
		} catch (e: any) {
			return { success: false, error: parseFirebaseError(e.code) }
		}
	}

	const signInWithGoogle = async (): Promise<boolean> => {
		try {
			setIsLoading(true)
			setError(null)

			const {
				success,
				credential,
				error: authError,
			} = await getGoogleCredential()

			if (!success || !credential) {
				setError(authError ?? "Помилка авторизації")
				return false
			}

			const { user } = await signInWithCredential(auth, credential)

			const existingUser = await getUser(user.uid)
			if (!existingUser) {
				await createUser(user.uid, user.email ?? "")
			}

			return true
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
			return false
		} finally {
			setIsLoading(false)
		}
	}

	const reauthWithGoogle = async (): Promise<boolean> => {
		try {
			setIsLoading(true)
			setError(null)

			const {
				success,
				credential,
				error: authError,
			} = await getGoogleCredential()

			if (!success || !credential) {
				setError(authError ?? "Помилка авторизації")
				return false
			}

			const user = auth.currentUser
			if (!user) {
				setError("Користувач не знайдений")
				return false
			}

			await reauthenticateWithCredential(user, credential)
			return true
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		signInWithGoogle,
		reauthWithGoogle,
		isLoading,
		error,
		request,
	}
}
