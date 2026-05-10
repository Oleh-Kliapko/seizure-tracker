// utils/validateOthers.ts

import { ERROR_MESSAGES } from "@/constants/errorMessages"
import i18n from "@/config/i18n"
import { validate, ValidationResult } from "./validation"

export function validatePhone(phone: string): ValidationResult {
	return validate([
		[
			phone.length > 0 && !/^\+\d{11,14}$/.test(phone.trim()),
			i18n.t(ERROR_MESSAGES.invalidPhone),
		],
	])
}

export function validateEmail(email: string): ValidationResult {
	return validate([
		[
			email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
			i18n.t(ERROR_MESSAGES.invalidEmail),
		],
	])
}
