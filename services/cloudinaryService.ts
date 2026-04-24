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

		xhr.upload.addEventListener("progress", e => {
			if (e.lengthComputable) {
				const progress = Math.round((e.loaded / e.total) * 100)
				onProgress?.(progress)
			}
		})

		xhr.addEventListener("load", () => {
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText)
				resolve({
					url: response.secure_url,
					publicId: response.public_id,
				})
			} else {
				reject(new Error("Помилка завантаження на Cloudinary"))
			}
		})

		xhr.addEventListener("error", () => {
			reject(new Error("Помилка мережі"))
		})

		signal?.addEventListener("abort", () => {
			xhr.abort()
			reject(new Error("Завантаження скасовано"))
		})

		xhr.open("POST", CLOUDINARY_UPLOAD_URL)
		xhr.send(formData)
	})
}

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"
const BACKEND_API_KEY = process.env.EXPO_PUBLIC_BACKEND_API_KEY

export async function deleteVideoFromCloudinary(
	userId: string,
	publicId: string,
): Promise<void> {
	if (!BACKEND_API_KEY) {
		console.warn("Backend API key not configured, skipping video deletion")
		return
	}

	try {
		const response = await fetch(`${BACKEND_URL}/api/videos/delete`, {
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
			const error = await response.json()
			throw new Error(error.error || "Failed to delete video")
		}
	} catch (error: any) {
		console.error("Error deleting video from backend:", error.message)
		// Don't throw - deletion failure shouldn't block seizure deletion
	}
}
