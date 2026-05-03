// utils/validateAuth.ts

import { ERROR_MESSAGES } from "@/constants/errorMessages"
import { validate, ValidationResult } from "./validation"

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export function validatePassword(password: string): ValidationResult {
	return validate([[!PASSWORD_REGEX.test(password), ERROR_MESSAGES.weakPassword]])
}

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
		[!PASSWORD_REGEX.test(password), ERROR_MESSAGES.weakPassword],
		[password !== confirmPassword, ERROR_MESSAGES.passwordMatch],
	])
}
