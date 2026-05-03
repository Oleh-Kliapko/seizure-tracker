import { cloudinaryConfig, CLOUDINARY_IMAGE_UPLOAD_URL, CLOUDINARY_UPLOAD_URL } from "@/config/cloudinary"
import i18n from "@/config/i18n"

export type CloudinaryUploadResponse = {
	url: string
	publicId: string
}

type UploadProgress = (progress: number) => void

export async function uploadImageToCloudinary(localUri: string): Promise<CloudinaryUploadResponse> {
	const formData = new FormData()
	formData.append("file", {
		uri: localUri,
		type: "image/jpeg",
		name: `avatar_${Date.now()}.jpg`,
	} as any)
	formData.append("upload_preset", cloudinaryConfig.uploadPreset)

	const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, {
		method: "POST",
		body: formData,
	})

	if (!response.ok) {
		const err = await response.json()
		throw new Error(err.error?.message ?? i18n.t("error.imageUploadError"))
	}

	const data = await response.json()
	return { url: data.secure_url, publicId: data.public_id }
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
					reject(new Error(i18n.t("error.invalidServerResponse")))
				}
			} else {
				try {
					const errorResponse = JSON.parse(xhr.responseText)
					reject(
						new Error(
							errorResponse.error?.message ||
								i18n.t("error.cloudinaryUploadError"),
						),
					)
				} catch {
					reject(new Error(i18n.t("error.uploadStatusError", { status: xhr.status })))
				}
			}
		})

		xhr.addEventListener("error", () => {
			reject(new Error(i18n.t("error.networkError")))
		})

		xhr.addEventListener("timeout", () => {
			xhr.abort()
			reject(new Error(i18n.t("error.uploadTimeout")))
		})

		signal?.addEventListener("abort", () => {
			xhr.abort()
			reject(new Error("UPLOAD_CANCELLED"))
		})

		try {
			xhr.open("POST", CLOUDINARY_UPLOAD_URL)
			xhr.send(formData)
		} catch (e) {
			reject(new Error(i18n.t("error.uploadStartError")))
		}
	})
}
