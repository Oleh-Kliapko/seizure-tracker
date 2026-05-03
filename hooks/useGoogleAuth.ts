// hooks/useGoogleAuth.ts

import { auth } from "@/config/firebase"
import { GOOGLE_AUTH_CONFIG } from "@/config/googleAuth"
import i18n from "@/config/i18n"
import { createUser, getUser } from "@/services"
import { parseFirebaseError } from "@/utils"
let GoogleSignin: any
let statusCodes: any
try {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const m = require("@react-native-google-signin/google-signin")
	GoogleSignin = m.GoogleSignin
	statusCodes = m.statusCodes
} catch {
	GoogleSignin = null
	statusCodes = {}
}
import {
	GoogleAuthProvider,
	reauthenticateWithCredential,
	signInWithCredential,
} from "firebase/auth"
import { useEffect, useState } from "react"

type GoogleAuthResult = {
	success: boolean
	error?: string
	credential?: ReturnType<typeof GoogleAuthProvider.credential>
}

let isConfigured = false

function configureGoogleSignIn() {
	if (isConfigured || !GoogleSignin) return
	GoogleSignin.configure({
		iosClientId: GOOGLE_AUTH_CONFIG.iosClientId,
		webClientId: GOOGLE_AUTH_CONFIG.webClientId,
	})
	isConfigured = true
}

export function useGoogleAuth() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		configureGoogleSignIn()
	}, [])

	const getGoogleCredential = async (): Promise<GoogleAuthResult> => {
		if (!GoogleSignin) {
			return { success: false, error: i18n.t("error.googleUnavailable") }
		}
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			})
			const response = await GoogleSignin.signIn()

			if (response.type === "cancelled") {
				return { success: false, error: i18n.t("error.authCancelled") }
			}

			const idToken = response.data?.idToken
			if (!idToken) {
				return { success: false, error: i18n.t("error.tokenError") }
			}

			const credential = GoogleAuthProvider.credential(idToken)
			return { success: true, credential }
		} catch (e: any) {
			if (e.code === statusCodes.SIGN_IN_CANCELLED) {
				return { success: false, error: i18n.t("error.authCancelled") }
			}
			if (e.code === statusCodes.IN_PROGRESS) {
				return { success: false, error: i18n.t("error.authInProgress") }
			}
			if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				return { success: false, error: i18n.t("error.googlePlayUnavailable") }
			}
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
				setError(authError ?? i18n.t("error.authError"))
				return false
			}

			const { user } = await signInWithCredential(auth, credential)

			const existingUser = await getUser(user.uid)
			if (!existingUser) {
				await createUser(user.uid, user.email ?? "", true)
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
				setError(authError ?? i18n.t("error.authError"))
				return false
			}

			const user = auth.currentUser
			if (!user) {
				setError(i18n.t("error.userNotFound"))
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
	}
}
