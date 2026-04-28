// utils/parseFirebaseError.ts

export function parseFirebaseError(code: string): string {
	switch (code) {
		case "auth/invalid-email":
			return "Невірний формат email"
		case "auth/user-not-found":
			return "Користувача не знайдено"
		case "auth/wrong-password":
		case "auth/invalid-credential":
			return "Невірний email або пароль"
		case "auth/email-already-in-use":
			return "Email вже використовується"
		case "auth/weak-password":
			return "Пароль має бути не менше 6 символів"
		case "auth/too-many-requests":
			return "Забагато спроб. Спробуйте пізніше"
		case "auth/network-request-failed":
			return "Помилка мережі. Перевірте підключення"
		case "auth/account-exists-with-different-credential":
			return "Цей email вже використовується з іншим способом входу"
		case "auth/requires-recent-login":
			return "Для цієї дії потрібно повторно увійти"
		default:
			return "Сталася помилка. Спробуйте ще раз"
	}
}
