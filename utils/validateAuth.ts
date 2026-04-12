// utils/validateAuth.ts

import { validate, ValidationResult } from "./validation"

const errorMsg = {
	required: "Всі поля обов'язкові",
	passwordLength: "Пароль має бути не менше 6 символів",
	passwordMatch: "Паролі не співпадають",
}

export function validateLogin(
	email: string,
	password: string,
): ValidationResult {
	return validate([[!email.trim() || !password.trim(), errorMsg.required]])
}

export function validateRegister(
	email: string,
	password: string,
	confirmPassword: string,
): ValidationResult {
	return validate([
		[
			!email.trim() || !password.trim() || !confirmPassword.trim(),
			errorMsg.required,
		],
		[password.length < 6, errorMsg.passwordLength],
		[password !== confirmPassword, errorMsg.passwordMatch],
	])
}
