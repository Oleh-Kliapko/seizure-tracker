// hooks/useSeizureEditForm.ts
import i18n from "@/config/i18n"

import {
	ExternalTrigger,
	InternalTrigger,
	Seizure,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { deleteSeizure, getSeizureById, updateSeizure } from "@/services"
import { isInvalidSeizureTime, isInvalidSleepHours } from "@/utils"
import { router, useLocalSearchParams } from "expo-router"
import { deleteField } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"
import { useAuth } from "./useAuth"

export function useSeizureEditForm() {
	const { user } = useAuth()
	const { id } = useLocalSearchParams<{ id: string }>()

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

	const [isLoading, setIsLoading] = useState(false)
	const [isFetching, setIsFetching] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const loadSeizure = useCallback(async () => {
		if (!user || !id) return
		if (!user?.uid) return

		try {
			setIsFetching(true)

			const seizure = await getSeizureById(user.uid, id)
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
		} catch {
			setError(i18n.t("error.loadingError"))
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
			setError(i18n.t("seizure.endTimeBeforeStart"))
			return
		}

		if (isInvalidSeizureTime(startedAt, endedAt)) {
			setError(i18n.t("seizure.timeInFuture"))
			return
		}

		if (isInvalidSleepHours(sleepHoursBefore)) {
			setError(i18n.t("seizure.invalidSleepHours"))
			return
		}

		if (type === "custom" && !customType.trim()) {
			setError(i18n.t("seizure.specifyCustomType"))
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

			seizureData.endedAt = endedAt !== undefined ? endedAt : deleteField()
			if (customType && type === "custom") seizureData.customType = customType
			if (severity !== undefined) seizureData.severity = severity
			if (moodBefore !== undefined) seizureData.moodBefore = moodBefore
			if (moodAfter !== undefined) seizureData.moodAfter = moodAfter
			if (sleepHoursBefore !== undefined)
				seizureData.sleepHoursBefore = sleepHoursBefore
			if (description) seizureData.description = description

			await updateSeizure(user.uid, id, seizureData as Partial<Seizure>)
			router.back()
		} catch (e: any) {
			console.error("Save error:", e.message, JSON.stringify(e))
			setError(i18n.t("error.savingError"))
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = () => {
		Alert.alert(
			i18n.t("seizure.confirmDeleteTitle"),
			i18n.t("seizure.confirmDeleteMessage"),
			[
				{ text: i18n.t("common.cancel"), style: "cancel" },
				{
					text: i18n.t("seizure.confirmDeleteBtn"),
					style: "destructive",
					onPress: async () => {
						if (!user || !id) return
						try {
							setIsLoading(true)
							await deleteSeizure(user.uid, id)
							router.back()
						} catch {
							setError(i18n.t("error.deleteError"))
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
		isLoading,
		isFetching,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		handleSave,
		handleDelete,
	}
}
