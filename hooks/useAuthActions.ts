// hooks/useAuthActions.ts

import { auth } from "@/config/firebase"
import { createUser } from "@/services"
import { parseFirebaseError } from "@/utils"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth"
import { useState } from "react"
import { useGoogleAuth } from "./useGoogleAuth"

type AuthError = {
	message: string
}

export function useAuthActions() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<AuthError | null>(null)
	const {
		signInWithGoogle,
		isLoading: isGoogleLoading,
		error: googleError,
	} = useGoogleAuth()

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
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			)
			await createUser(user.uid, email)
		} catch (e: any) {
			setError({ message: parseFirebaseError(e.code) })
		} finally {
			setIsLoading(false)
		}
	}

	const loginWithGoogle = async () => {
		setError(null)
		const success = await signInWithGoogle()
		if (!success && googleError) {
			setError({ message: googleError })
		}
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

	return {
		login,
		register,
		loginWithGoogle,
		logout,
		isLoading: isLoading || isGoogleLoading,
		error,
	}
}
