// utils/parseFirebaseError.ts

import { ERROR_MESSAGES } from "@/constants/errorMessages"

export function parseFirebaseError(code: string): string {
	switch (code) {
		case "auth/invalid-email":
			return ERROR_MESSAGES.invalidEmail
		case "auth/invalid-phone":
			return ERROR_MESSAGES.invalidPhone
		case "auth/user-not-found":
			return ERROR_MESSAGES.userNotFound
		case "auth/wrong-password":
		case "auth/invalid-credential":
			return ERROR_MESSAGES.wrongPassword
		case "auth/email-already-in-use":
			return ERROR_MESSAGES.emailInUse
		case "auth/weak-password":
			return ERROR_MESSAGES.weakPassword
		case "auth/too-many-requests":
			return ERROR_MESSAGES.tooManyRequests
		case "auth/network-request-failed":
			return ERROR_MESSAGES.networkError
		case "auth/account-exists-with-different-credential":
			return ERROR_MESSAGES.accountExistsWithDifferentCredential
		case "auth/requires-recent-login":
			return ERROR_MESSAGES.requiresRecentLogin
		default:
			return ERROR_MESSAGES.generic
	}
}
