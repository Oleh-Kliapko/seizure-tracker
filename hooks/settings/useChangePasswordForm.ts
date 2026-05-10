// hooks/settings/useChangePasswordForm.ts

import { auth } from "@/config/firebase"
import { parseFirebaseError, validateRegister } from "@/utils"
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
} from "firebase/auth"
import { useState } from "react"

export function useChangePasswordForm() {
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const handleSave = async () => {
		if (!currentPassword.trim()) {
			setError("error.enterCurrentPassword")
			return
		}

		const { isValid, error: validationError } = validateRegister(
			auth.currentUser?.email ?? "",
			newPassword,
			confirmPassword,
		)

		if (!isValid) {
			setError(validationError)
			return
		}

		if (currentPassword === newPassword) {
			setError("error.passwordSame")
			return
		}

		try {
			setIsLoading(true)
			setError(null)

			const user = auth.currentUser
			if (!user?.email) return

			const credential = EmailAuthProvider.credential(
				user.email,
				currentPassword,
			)
			await reauthenticateWithCredential(user, credential)
			await updatePassword(user, newPassword)

			setIsSuccess(true)
			setCurrentPassword("")
			setNewPassword("")
			setConfirmPassword("")
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	return {
		currentPassword,
		setCurrentPassword,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		isLoading,
		error,
		isSuccess,
		handleSave,
	}
}
