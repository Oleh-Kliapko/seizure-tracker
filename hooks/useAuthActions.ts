// hooks/useAuthActions.ts

import { auth } from "@/config/firebase"
import { parseFirebaseError } from "@/utils"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { useState } from "react"

type AuthError = {
	message: string
}

export function useAuthActions() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<AuthError | null>(null)

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true)
			setError(null)
			await signInWithEmailAndPassword(auth, email, password)
		} catch (e: any) {
			setError({ message: parseFirebaseError(e.code) })
		} finally {
			setIsLoading(false)
		}
	}

	const register = async (email: string, password: string) => {
		try {
			setIsLoading(true)
			setError(null)
			await createUserWithEmailAndPassword(auth, email, password)
		} catch (e: any) {
			setError({ message: parseFirebaseError(e.code) })
		} finally {
			setIsLoading(false)
		}
	}

	const loginWithGoogle = async () => {
		// TODO: реалізувати через expo-auth-session
		setError({ message: "Google авторизація буде додана незабаром" })
	}

	const logout = async () => {
		try {
			setIsLoading(true)
			setError(null)
			await signOut(auth)
		} catch (e: any) {
			setError({ message: parseFirebaseError(e.code) })
		} finally {
			setIsLoading(false)
		}
	}

	return { login, register, loginWithGoogle, logout, isLoading, error }
}
