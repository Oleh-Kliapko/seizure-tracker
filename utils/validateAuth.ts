// utils/validateAuth.ts

type ValidationResult = {
	isValid: boolean
	error: string | null
}

const errorMsg = {
	required: "Всі поля обов'язкові",
	passwordLength: "Пароль має бути не менше 6 символів",
	passwordMatch: "Паролі не співпадають",
}

function validate(rules: [boolean, string][]): ValidationResult {
	for (const [condition, message] of rules) {
		if (condition) return { isValid: false, error: message }
	}
	return { isValid: true, error: null }
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
