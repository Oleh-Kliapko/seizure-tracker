// services/cloudinaryService.ts

import {
	CLOUDINARY_UPLOAD_URL,
	cloudinaryConfig,
	MAX_VIDEO_SIZE_BYTES,
	MAX_VIDEO_SIZE_MB,
	MAX_VIDEOS_PER_USER,
} from "@/config/cloudinary"
import { getSeizures } from "./seizureService"

type UploadProgress = (progress: number) => void

export async function checkVideoLimits(
	userId: string,
	fileSize: number,
): Promise<string | null> {
	if (fileSize > MAX_VIDEO_SIZE_BYTES) {
		return `Відео перевищує ліміт ${MAX_VIDEO_SIZE_MB}MB`
	}

	const seizures = await getSeizures(userId)
	const videoCount = seizures.filter(s => s.videoUrl?.startsWith("http")).length

	if (videoCount >= MAX_VIDEOS_PER_USER) {
		return `Досягнуто ліміт відео (${MAX_VIDEOS_PER_USER} шт). Видаліть старі відео`
	}

	return null
}

export type CloudinaryUploadResponse = {
	url: string
	publicId: string
}

export async function uploadVideoToCloudinary(
	localUri: string,
	onProgress?: UploadProgress,
	signal?: AbortSignal,
): Promise<CloudinaryUploadResponse> {
	const formData = new FormData()

	formData.append("file", {
		uri: localUri,
		type: "video/mp4",
		name: `seizure_${Date.now()}.mp4`,
	} as any)

	formData.append("upload_preset", cloudinaryConfig.uploadPreset)
	formData.append("resource_type", "video")

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		// Set timeout for 15 minutes (for large files)
		xhr.timeout = 15 * 60 * 1000

		xhr.upload.addEventListener("progress", e => {
			if (e.lengthComputable) {
				const progress = Math.round((e.loaded / e.total) * 100)
				onProgress?.(progress)
			}
		})

		xhr.addEventListener("load", () => {
			if (xhr.status === 200) {
				try {
					const response = JSON.parse(xhr.responseText)
					resolve({
						url: response.secure_url,
						publicId: response.public_id,
					})
				} catch (e) {
					reject(new Error("Невірна відповідь від сервера"))
				}
			} else {
				try {
					const errorResponse = JSON.parse(xhr.responseText)
					reject(new Error(errorResponse.error?.message || "Помилка завантаження на Cloudinary"))
				} catch {
					reject(new Error(`Помилка завантаження: ${xhr.status}`))
				}
			}
		})

		xhr.addEventListener("error", () => {
			reject(new Error("Помилка мережі"))
		})

		xhr.addEventListener("timeout", () => {
			xhr.abort()
			reject(new Error("Час очікування завантаження закінчився"))
		})

		signal?.addEventListener("abort", () => {
			xhr.abort()
			reject(new Error("Завантаження скасовано"))
		})

		try {
			xhr.open("POST", CLOUDINARY_UPLOAD_URL)
			xhr.send(formData)
		} catch (e) {
			reject(new Error("Не вдалося почати завантаження"))
		}
	})
}

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"
const BACKEND_API_KEY = process.env.EXPO_PUBLIC_BACKEND_API_KEY

export async function deleteVideoFromCloudinary(
	userId: string,
	publicId: string,
): Promise<void> {
	console.log("deleteVideoFromCloudinary called with:", { userId, publicId })
	console.log("BACKEND_URL:", BACKEND_URL)
	console.log("BACKEND_API_KEY configured:", !!BACKEND_API_KEY)

	if (!BACKEND_API_KEY) {
		console.warn("Backend API key not configured, skipping video deletion")
		return
	}

	try {
		const url = `${BACKEND_URL}/api/videos/delete`
		console.log("Fetching:", url)
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

		console.log("Response status:", response.status)

		if (!response.ok) {
			const error = await response.json()
			console.error("Backend error:", error)
			throw new Error(error.error || "Failed to delete video")
		}

		const result = await response.json()
		console.log("Video deleted successfully:", result)
	} catch (error: any) {
		console.error("Error deleting video from backend:", error.message)
		// Don't throw - deletion failure shouldn't block seizure deletion
	}
}
