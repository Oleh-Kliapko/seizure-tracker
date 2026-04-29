// utils/validateAuth.ts

import { ERROR_MESSAGES } from "@/constants/errorMessages"
import { validate, ValidationResult } from "./validation"

export function validateLogin(
	email: string,
	password: string,
): ValidationResult {
	return validate([[!email.trim() || !password.trim(), ERROR_MESSAGES.requiredFields]])
}

export function validateRegister(
	email: string,
	password: string,
	confirmPassword: string,
): ValidationResult {
	return validate([
		[
			!email.trim() || !password.trim() || !confirmPassword.trim(),
			ERROR_MESSAGES.requiredFields,
		],
		[password.length < 6, ERROR_MESSAGES.weakPassword],
		[password !== confirmPassword, ERROR_MESSAGES.passwordMatch],
	])
}
