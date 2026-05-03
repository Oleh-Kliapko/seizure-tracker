// constants/errorMessages.ts

export const ERROR_MESSAGES = {
	// Firebase auth
	invalidEmail: "Невірний формат email",
	invalidPhone: "Невірний формат телефону (приклад: +380XXXXXXXXX)",
	userNotFound: "Користувача не знайдено",
	wrongPassword: "Невірний email або пароль",
	emailInUse: "Email вже використовується",
	weakPassword: "Пароль повинен містити мінімум 8 символів, велику літеру, цифру та спецсимвол",
	tooManyRequests: "Забагато спроб. Спробуйте пізніше",
	networkError: "Помилка мережі. Перевірте підключення",
	accountExistsWithDifferentCredential:
		"Цей email вже використовується з іншим способом входу",
	requiresRecentLogin: "Для цієї дії потрібно повторно увійти",
	generic: "Сталася помилка. Спробуйте ще раз",

	// Validation
	requiredFields: "Всі поля обов'язкові",
	passwordMatch: "Паролі не співпадають",
} as const
