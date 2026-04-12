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
