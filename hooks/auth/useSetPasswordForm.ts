// hooks/auth/useSetPasswordForm.ts

import { auth } from "@/config/firebase"
import { ERROR_MESSAGES } from "@/constants/errorMessages"
import { parseFirebaseError, validatePassword } from "@/utils"
import { EmailAuthProvider, linkWithCredential } from "firebase/auth"
import { useState } from "react"

export function useSetPasswordForm() {
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const handleSave = async () => {
		const { isValid, error: validationError } = validatePassword(newPassword)
		if (!isValid) {
			setError(validationError)
			return
		}
		if (newPassword !== confirmPassword) {
			setError(ERROR_MESSAGES.passwordMatch)
			return
		}

		try {
			setIsLoading(true)
			setError(null)

			const user = auth.currentUser
			if (!user?.email) return

			const credential = EmailAuthProvider.credential(user.email, newPassword)
			await linkWithCredential(user, credential)

			setIsSuccess(true)
			setNewPassword("")
			setConfirmPassword("")
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	return {
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
