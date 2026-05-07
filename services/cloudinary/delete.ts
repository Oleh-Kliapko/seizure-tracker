import i18n from "@/config/i18n"
import { auth } from "@/config/firebase"

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

async function getAuthHeader(): Promise<Record<string, string>> {
	const token = await auth.currentUser?.getIdToken()
	if (!token) throw new Error("Not authenticated")
	return { "Authorization": `Bearer ${token}` }
}

export async function deleteImageFromCloudinary(
	publicId: string,
): Promise<string | null> {
	if (!BACKEND_URL) return null

	try {
		const authHeader = await getAuthHeader()
		const response = await fetch(`${BACKEND_URL}/api/images/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...authHeader,
			},
			body: JSON.stringify({ publicId }),
		})

		if (!response.ok) {
			try {
				const errorData = await response.json()
				return errorData.error || i18n.t("error.deleteImageError")
			} catch {
				return i18n.t("error.deleteImageError")
			}
		}
		return null
	} catch {
		return i18n.t("error.deleteImageError")
	}
}

export async function deleteVideoFromCloudinary(
	userId: string,
	publicId: string,
): Promise<string | null> {
	if (!BACKEND_URL) return null

	try {
		const authHeader = await getAuthHeader()
		const url = `${BACKEND_URL}/api/videos/delete`
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...authHeader,
			},
			body: JSON.stringify({
				publicId,
				userId,
			}),
		})

		if (!response.ok) {
			try {
				const errorData = await response.json()
				return errorData.error || i18n.t("error.deleteVideoCloudError")
			} catch {
				return i18n.t("error.deleteVideoCloudError")
			}
		}
		return null
	} catch (error: any) {
		return i18n.t("error.deleteVideoCloudError")
	}
}
