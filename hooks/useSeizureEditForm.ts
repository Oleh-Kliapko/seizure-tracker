// hooks/useSeizureEditForm.ts

import {
	ExternalTrigger,
	InternalTrigger,
	Seizure,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { deleteSeizure, getSeizures, updateSeizure } from "@/services"
import { router, useLocalSearchParams } from "expo-router"
import { deleteField } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"
import { useAuth } from "./useAuth"
import { useVideoUpload } from "./useVideoUpload"

export function useSeizureEditForm() {
	const { user } = useAuth()
	const { id } = useLocalSearchParams<{ id: string }>()
	const { upload, cancel, isUploading, uploadProgress } = useVideoUpload()

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
	const [isFetching, setIsFetching] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadSeizure = useCallback(async () => {
		if (!user || !id) return
		if (!user?.uid) return

		try {
			setIsFetching(true)

			const seizures = await getSeizures(user.uid)
			const seizure = seizures.find(s => s.id === id)
			if (!seizure) return

			setStartedAt(seizure.startedAt)
			setEndedAt(seizure.endedAt)
			setType(seizure.type)
			setCustomType(seizure.customType ?? "")
			setSeverity(seizure.severity)
			setInternalTriggers(seizure.internalTriggers ?? [])
			setExternalTriggers(seizure.externalTriggers ?? [])
			setMoodBefore(seizure.moodBefore)
			setMoodAfter(seizure.moodAfter)
			setIsMedicationTaken(seizure.isMedicationTaken ?? false)
			setSleepHoursBefore(seizure.sleepHoursBefore)
			setDescription(seizure.description ?? "")
			setVideoUrl(seizure.videoUrl ?? undefined)
		} catch {
			setError("Помилка завантаження")
		} finally {
			setIsFetching(false)
		}
	}, [user, id])

	useEffect(() => {
		loadSeizure()
	}, [loadSeizure])

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
		if (!user || !id) return

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

			if (videoUrl === undefined) {
				seizureData.videoUrl = deleteField()
			} else if (videoUrl.startsWith("http")) {
				seizureData.videoUrl = videoUrl
			} else {
				const { url: uploadedUrl, error: videoError } = await upload(
					user.uid,
					id,
					videoUrl, // тепер точно string
				)
				if (!uploadedUrl) {
					setError(videoError ?? "Помилка завантаження відео")
					return
				}
				seizureData.videoUrl = uploadedUrl
			}

			await updateSeizure(user.uid, id, seizureData as Partial<Seizure>)
			router.back()
		} catch (e: any) {
			console.error("Save error:", e.message, JSON.stringify(e))
			setError("Помилка збереження. Спробуйте ще раз")
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = () => {
		Alert.alert(
			"Видалити приступ",
			"Ця дія незворотня. Приступ буде видалено назавжди.",
			[
				{ text: "Скасувати", style: "cancel" },
				{
					text: "Видалити",
					style: "destructive",
					onPress: async () => {
						if (!user || !id) return
						try {
							setIsLoading(true)
							await deleteSeizure(user.uid, id)
							router.back()
						} catch {
							setError("Помилка видалення")
						} finally {
							setIsLoading(false)
						}
					},
				},
			],
		)
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
		isFetching,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		handleSave,
		handleDelete,
		isUploading,
		uploadProgress,
		cancelUpload: cancel,
	}
}
