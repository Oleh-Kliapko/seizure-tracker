const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"
const BACKEND_API_KEY = process.env.EXPO_PUBLIC_BACKEND_API_KEY

export async function deleteImageFromCloudinary(publicId: string): Promise<string | null> {
	if (!BACKEND_API_KEY) return null

	try {
		const response = await fetch(`${BACKEND_URL}/api/images/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": BACKEND_API_KEY,
			},
			body: JSON.stringify({ publicId }),
		})

		if (!response.ok) {
			try {
				const errorData = await response.json()
				return errorData.error || "Помилка видалення зображення"
			} catch {
				return "Помилка видалення зображення"
			}
		}
		return null
	} catch {
		return "Помилка видалення зображення"
	}
}

export async function deleteVideoFromCloudinary(
	userId: string,
	publicId: string,
): Promise<string | null> {
	if (!BACKEND_API_KEY) {
		return null
	}

	try {
		const url = `${BACKEND_URL}/api/videos/delete`
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": BACKEND_API_KEY,
			},
			body: JSON.stringify({
				publicId,
				userId,
			}),
		})

		if (!response.ok) {
			try {
				const errorData = await response.json()
				return errorData.error || "Помилка видалення відео"
			} catch {
				return "Помилка видалення відео"
			}
		}
		return null
	} catch (error: any) {
		return "Помилка видалення відео"
	}
}
