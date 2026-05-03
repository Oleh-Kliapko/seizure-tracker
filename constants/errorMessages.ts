// constants/errorMessages.ts

export const ERROR_MESSAGES = {
	// Firebase auth
	invalidEmail: "validation.invalidEmail",
	invalidPhone: "validation.invalidPhone",
	userNotFound: "error.userNotFound",
	wrongPassword: "error.wrongPassword",
	emailInUse: "error.emailInUse",
	weakPassword: "validation.weakPassword",
	tooManyRequests: "error.tooManyRequests",
	networkError: "error.networkError",
	accountExistsWithDifferentCredential: "error.accountExistsWithDifferentCredential",
	requiresRecentLogin: "error.requiresRecentLogin",
	generic: "error.generic",

	// Validation
	requiredFields: "validation.requiredFields",
	passwordMatch: "validation.passwordMatch",
} as const
