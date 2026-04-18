// hooks/useSeizureForm.ts

import {
	ExternalTrigger,
	InternalTrigger,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { createSeizure } from "@/services"
import { router } from "expo-router"
import { useState } from "react"
import { useAuth } from "./useAuth"

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

			await createSeizure(user.uid, {
				userId: user.uid,
				patientId: user.uid,
				startedAt,
				endedAt,
				type,
				customType: type === "custom" ? customType : undefined,
				severity,
				internalTriggers,
				externalTriggers,
				moodBefore,
				moodAfter,
				isMedicationTaken,
				sleepHoursBefore,
				description: description || undefined,
				videoUrl,
			})

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
		handleSave,
	}
}
