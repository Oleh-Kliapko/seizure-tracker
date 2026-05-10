// hooks/auth/useLoginForm.ts

import { validateLogin } from "@/utils"
import { useState } from "react"
import { useAuthActions } from "./useAuthActions"

export function useLoginForm() {
	const { login, loginWithGoogle, isLoading, error } = useAuthActions()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [validationError, setValidationError] = useState<string | null>(null)

	const handleLogin = async () => {
		const { isValid, error } = validateLogin(email, password)
		if (!isValid) {
			setValidationError(error)
			return
		}
		setValidationError(null)
		await login(email, password)
	}

	return {
		email,
		setEmail,
		password,
		setPassword,
		isLoading,
		displayError: validationError ?? error?.message ?? null,
		handleLogin,
		loginWithGoogle,
	}
}
