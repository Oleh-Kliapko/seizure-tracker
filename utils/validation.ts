// utils/validation.ts

export type ValidationResult = {
	isValid: boolean
	error: string | null
}

export function validate(rules: [boolean, string][]): ValidationResult {
	for (const [condition, message] of rules) {
		if (condition) return { isValid: false, error: message }
	}
	return { isValid: true, error: null }
}
