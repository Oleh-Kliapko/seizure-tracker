// hooks/useRegisterForm.ts

import { useAuthActions } from "@/hooks"
import { validateRegister } from "@/utils"
import { useState } from "react"

export function useRegisterForm() {
	const { register, loginWithGoogle, isLoading, error } = useAuthActions()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [validationError, setValidationError] = useState<string | null>(null)

	const handleRegister = async () => {
		const { isValid, error } = validateRegister(
			email,
			password,
			confirmPassword,
		)
		if (!isValid) {
			setValidationError(error)
			return
		}
		setValidationError(null)
		await register(email, password)
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		isLoading,
		displayError: validationError ?? error?.message ?? null,
		handleRegister,
		loginWithGoogle,
	}
}
