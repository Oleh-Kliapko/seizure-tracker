// utils/validateOthers.ts
import { validate, ValidationResult } from "./validation"

export function validatePhone(phone: string): ValidationResult {
	return validate([
		[
			phone.length > 0 && !/^\+?\d{10,15}$/.test(phone.trim()),
			"Невірний формат телефону (приклад: +380XXXXXXXXX)",
		],
	])
}

export function validateEmail(email: string): ValidationResult {
	return validate([
		[
			email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
			"Невірний формат email",
		],
	])
}
