// hooks/seizure/useSeizureForm.ts

import i18n from "@/config/i18n"
import { Seizure } from "@/models"
import { createSeizure, deleteSeizure, updateSeizure } from "@/services"
import { router } from "expo-router"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useSeizureFormBase } from "./useSeizureFormBase"
import { useVideoUpload } from "./useVideoUpload"

export function useSeizureForm() {
	const { user } = useAuth()
	const base = useSeizureFormBase()
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)
	const {
		upload,
		cancel,
		isUploading,
		uploadProgress,
		error: uploadError,
	} = useVideoUpload()

	const handleSave = async () => {
		if (!user) return

		if (!base.startedAt) {
			base.setError(i18n.t("seizure.specifyStartTime"))
			return
		}

		const validationError = base.validateFields()
		if (validationError) {
			base.setError(validationError)
			return
		}

		try {
			base.setIsLoading(true)
			base.setError(null)

			const seizureData: Record<string, any> = {
				userId: user.uid,
				patientId: user.uid,
				startedAt: base.startedAt,
				types: base.types,
				internalTriggers: base.internalTriggers,
				externalTriggers: base.externalTriggers,
			}

			if (base.durationSeconds) seizureData.durationSeconds = base.durationSeconds
			if (base.customType && base.types.includes("custom")) seizureData.customType = base.customType
			if (base.severity !== undefined) seizureData.severity = base.severity
			if (base.moodBefore !== undefined) seizureData.moodBefore = base.moodBefore
			if (base.moodAfter !== undefined) seizureData.moodAfter = base.moodAfter
			if (base.sleepHoursBefore !== undefined) seizureData.sleepHoursBefore = base.sleepHoursBefore
			if (base.description) seizureData.description = base.description

			const seizureId = await createSeizure(
				user.uid,
				seizureData as Omit<Seizure, "id" | "createdAt" | "updatedAt">,
			)

			if (videoUrl && !videoUrl.startsWith("http")) {
				const { url: uploadedUrl, error: videoError } = await upload(
					user.uid,
					seizureId,
					videoUrl,
				)

				if (!uploadedUrl) {
					await deleteSeizure(user.uid, seizureId)
					base.setError(videoError ?? i18n.t("error.videoUploadError"))
					return
				}

				await updateSeizure(user.uid, seizureId, { videoUrl: uploadedUrl })
			}

			router.back()
		} catch {
			base.setError(i18n.t("error.savingError"))
		} finally {
			base.setIsLoading(false)
		}
	}

	return {
		...base,
		videoUrl,
		setVideoUrl,
		isUploading,
		uploadProgress,
		uploadError,
		cancelUpload: cancel,
		handleSave,
	}
}
