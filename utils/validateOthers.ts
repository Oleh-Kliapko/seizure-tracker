// utils/validateOthers.ts

import { ERROR_MESSAGES } from "@/constants/errorMessages"
import { validate, ValidationResult } from "./validation"

export function validatePhone(phone: string): ValidationResult {
	return validate([
		[
			phone.length > 0 && !/^\+?\d{10,15}$/.test(phone.trim()),
			ERROR_MESSAGES.invalidPhone,
		],
	])
}

export function validateEmail(email: string): ValidationResult {
	return validate([
		[
			email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
			ERROR_MESSAGES.invalidEmail,
		],
	])
}
