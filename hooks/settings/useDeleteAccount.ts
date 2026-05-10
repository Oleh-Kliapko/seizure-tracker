// hooks/settings/useDeleteAccount.ts

import { auth, db } from "@/config/firebase"
import i18n from "@/config/i18n"
import { parseFirebaseError } from "@/utils"
import {
	deleteUser,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import { useState } from "react"
import { useGoogleAuth } from "../auth/useGoogleAuth"

export function useDeleteAccount() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const {
		reauthWithGoogle,
		isLoading: isGoogleLoading,
		error: googleError,
	} = useGoogleAuth()

	const deleteAccount = async (password?: string) => {
		const user = auth.currentUser
		if (!user) return

		try {
			setIsLoading(true)
			setError(null)

			const isPasswordUser = user.providerData.some(
				p => p.providerId === "password",
			)

			if (isPasswordUser) {
				if (!password?.trim()) {
					setError(i18n.t("error.confirmPasswordPrompt"))
					return
				}
				const credential = EmailAuthProvider.credential(user.email!, password)
				await reauthenticateWithCredential(user, credential)
			} else {
				// Google реавторизація
				const success = await reauthWithGoogle()
				if (!success) {
					setError(googleError ?? i18n.t("error.googleConfirmError"))
					return
				}
			}

			await deleteDoc(doc(db, "users", user.uid))
			await deleteUser(user)
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	return { deleteAccount, isLoading: isLoading || isGoogleLoading, error }
}
