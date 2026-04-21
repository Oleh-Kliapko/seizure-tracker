// hooks/useSeizureForm.ts

import {
	ExternalTrigger,
	InternalTrigger,
	Seizure,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { createSeizure, deleteSeizure, updateSeizure } from "@/services"
import { router } from "expo-router"
import { useState } from "react"
import { useAuth } from "./useAuth"
import { useVideoUpload } from "./useVideoUpload"

export function useSeizureForm() {
	const { user } = useAuth()

	const [startedAt, setStartedAt] = useState<number>(Date.now())
	const [endedAt, setEndedAt] = useState<number | undefined>(undefined)
	const [type, setType] = useState<SeizureType>("tonic-clonic")
	const [customType, setCustomType] = useState("")
	const [severity, setSeverity] = useState<SeizureSeverity | undefined>(
		undefined,
	)
	const [internalTriggers, setInternalTriggers] = useState<
		TriggerItem<InternalTrigger>[]
	>([])
	const [externalTriggers, setExternalTriggers] = useState<
		TriggerItem<ExternalTrigger>[]
	>([])
	const [moodBefore, setMoodBefore] = useState<number | undefined>(undefined)
	const [moodAfter, setMoodAfter] = useState<number | undefined>(undefined)
	const [isMedicationTaken, setIsMedicationTaken] = useState(false)
	const [sleepHoursBefore, setSleepHoursBefore] = useState<number | undefined>(
		undefined,
	)
	const [description, setDescription] = useState("")
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined)

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const {
		upload,
		cancel,
		isUploading,
		uploadProgress,
		error: uploadError,
	} = useVideoUpload()

	const toggleInternalTrigger = (trigger: InternalTrigger) => {
		setInternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			if (exists) return prev.filter(t => t.type !== trigger)
			return [...prev, { type: trigger }]
		})
	}

	const toggleExternalTrigger = (trigger: ExternalTrigger) => {
		setExternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			if (exists) return prev.filter(t => t.type !== trigger)
			return [...prev, { type: trigger }]
		})
	}

	const handleSave = async () => {
		if (!user) return

		if (!startedAt) {
			setError("Вкажіть дату та час початку приступу")
			return
		}

		if (endedAt && endedAt < startedAt) {
			setError("Час закінчення не може бути раніше часу початку")
			return
		}

		if (type === "custom" && !customType.trim()) {
			setError("Вкажіть власний тип приступу")
			return
		}

		try {
			setIsLoading(true)
			setError(null)

			const seizureData: Record<string, any> = {
				userId: user.uid,
				patientId: user.uid,
				startedAt,
				type,
				isMedicationTaken,
				internalTriggers,
				externalTriggers,
			}

			if (endedAt !== undefined) seizureData.endedAt = endedAt
			if (customType && type === "custom") seizureData.customType = customType
			if (severity !== undefined) seizureData.severity = severity
			if (moodBefore !== undefined) seizureData.moodBefore = moodBefore
			if (moodAfter !== undefined) seizureData.moodAfter = moodAfter
			if (sleepHoursBefore !== undefined)
				seizureData.sleepHoursBefore = sleepHoursBefore
			if (description) seizureData.description = description

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
					setError(videoError ?? "Помилка завантаження відео")
					return
				}

				await updateSeizure(user.uid, seizureId, { videoUrl: uploadedUrl })
			}

			router.back()
		} catch {
			setError("Помилка збереження. Спробуйте ще раз")
		} finally {
			setIsLoading(false)
		}
	}

	return {
		startedAt,
		setStartedAt,
		endedAt,
		setEndedAt,
		type,
		setType,
		customType,
		setCustomType,
		severity,
		setSeverity,
		internalTriggers,
		externalTriggers,
		moodBefore,
		setMoodBefore,
		moodAfter,
		setMoodAfter,
		isMedicationTaken,
		setIsMedicationTaken,
		sleepHoursBefore,
		setSleepHoursBefore,
		description,
		setDescription,
		videoUrl,
		setVideoUrl,
		isLoading,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		isUploading,
		uploadProgress,
		uploadError,
		cancelUpload: cancel,
		handleSave,
	}
}
