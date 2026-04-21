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

export async function uploadVideoToCloudinary(
	localUri: string,
	onProgress?: UploadProgress,
	signal?: AbortSignal,
): Promise<string> {
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
			console.log("Cloudinary response status:", xhr.status)
			console.log("Cloudinary response:", xhr.responseText)
			if (xhr.status === 200) {
				const response = JSON.parse(xhr.responseText)
				resolve(response.secure_url)
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

export async function deleteVideoFromCloudinary(url: string): Promise<void> {
	// Видалення через unsigned preset неможливе без серверної частини
	// TODO: реалізувати через Cloud Function або серверний endpoint
	console.warn("Видалення відео з Cloudinary потребує серверної частини", url)
}
