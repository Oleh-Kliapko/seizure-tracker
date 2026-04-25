import { cloudinaryConfig, CLOUDINARY_UPLOAD_URL } from "@/config/cloudinary"

export type CloudinaryUploadResponse = {
	url: string
	publicId: string
}

type UploadProgress = (progress: number) => void

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

		// Set timeout for 3 minutes (for large files)
		xhr.timeout = 3 * 60 * 1000

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
					reject(
						new Error(
							errorResponse.error?.message ||
								"Помилка завантаження на Cloudinary",
						),
					)
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
