// hooks/useDeleteAccount.ts

import { auth, db } from "@/config/firebase"
import { parseFirebaseError } from "@/utils"
import {
	deleteUser,
	EmailAuthProvider,
	GoogleAuthProvider,
	reauthenticateWithCredential,
	reauthenticateWithPopup,
} from "firebase/auth"
import { deleteDoc, doc } from "firebase/firestore"
import { useState } from "react"

export function useDeleteAccount() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

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
					setError("Введіть пароль для підтвердження")
					return
				}
				const credential = EmailAuthProvider.credential(user.email!, password)
				await reauthenticateWithCredential(user, credential)
			} else {
				const provider = new GoogleAuthProvider()
				await reauthenticateWithPopup(user, provider)
			}

			await deleteDoc(doc(db, "users", user.uid))
			await deleteUser(user)
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	return { deleteAccount, isLoading, error }
}
