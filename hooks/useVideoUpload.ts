// hooks/useVideoUpload.ts

import {
	checkVideoLimits,
	uploadVideoToCloudinary,
} from "@/services/cloudinary"
import i18n from "@/config/i18n"
import { getInfoAsync } from "expo-file-system/legacy"
import { useRef, useState } from "react"
import { useAuth } from "./useAuth"

export function useVideoUpload() {
	const { user } = useAuth()
	const [uploadProgress, setUploadProgress] = useState<number>(0)
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const abortController = useRef<AbortController | null>(null)

	const upload = async (
		_userId: string,
		_seizureId: string,
		localUri: string,
	): Promise<{ url: string | null; publicId: string | null; error: string | null }> => {
		if (!user) {
			return { url: null, publicId: null, error: i18n.t("error.userNotFound") }
		}

		try {
			setIsUploading(true)
			setError(null)
			setUploadProgress(0)

			const fileInfo = await getInfoAsync(localUri, { size: true } as any)
			if (!fileInfo.exists) {
				setError(i18n.t("error.fileNotFound"))
				return { url: null, publicId: null, error: i18n.t("error.fileNotFound") }
			}

			const fileSize = (fileInfo as any).size ?? 0
			const limitError = await checkVideoLimits(user.uid, fileSize)

			if (limitError) {
				setError(limitError)
				return { url: null, publicId: null, error: limitError }
			}

			abortController.current = new AbortController()

			const response = await uploadVideoToCloudinary(
				localUri,
				setUploadProgress,
				abortController.current.signal,
			)

			console.log("Video uploaded successfully:", { url: response.url, publicId: response.publicId })
			return { url: response.url, publicId: response.publicId, error: null }
		} catch (e: any) {
			if (e.message === "UPLOAD_CANCELLED") {
				setError(i18n.t("error.uploadCancelled"))
			} else {
				setError(i18n.t("error.videoUploadError"))
			}
			return { url: null, publicId: null, error: e.message }
		} finally {
			setIsUploading(false)
			abortController.current = null
		}
	}

	const cancel = () => {
		abortController.current?.abort()
	}

	return { upload, cancel, isUploading, uploadProgress, error }
}
