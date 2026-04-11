// utils/parseFirebaseError.ts

export function parseFirebaseError(code: string): string {
	switch (code) {
		case "auth/invalid-email":
			return "Невірний формат email"
		case "auth/user-not-found":
			return "Користувача не знайдено"
		case "auth/wrong-password":
			return "Невірний пароль"
		case "auth/email-already-in-use":
			return "Email вже використовується"
		case "auth/weak-password":
			return "Пароль має бути не менше 6 символів"
		case "auth/too-many-requests":
			return "Забагато спроб. Спробуйте пізніше"
		case "auth/network-request-failed":
			return "Помилка мережі. Перевірте підключення"
		default:
			return "Сталася помилка. Спробуйте ще раз"
	}
}
