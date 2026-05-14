// hooks/seizure/useSeizureFormBase.ts

import i18n from "@/config/i18n"
import {
	ExternalTrigger,
	InternalTrigger,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { isInvalidSeizureTime, isInvalidSleepHours } from "@/utils"
import { toggleTriggerItem } from "@/utils/seizureHelpers"
import { useState } from "react"

export function useSeizureFormBase() {
	const [startedAt, setStartedAt] = useState<number>(Date.now())
	const [durationSeconds, setDurationSeconds] = useState<number | undefined>(undefined)
	const [types, setTypes] = useState<SeizureType[]>(["tonic-clonic"])
	const [customType, setCustomType] = useState("")
	const [severity, setSeverity] = useState<SeizureSeverity | undefined>(undefined)
	const [internalTriggers, setInternalTriggers] = useState<TriggerItem<InternalTrigger>[]>([])
	const [externalTriggers, setExternalTriggers] = useState<TriggerItem<ExternalTrigger>[]>([])
	const [moodBefore, setMoodBefore] = useState<number | undefined>(undefined)
	const [moodAfter, setMoodAfter] = useState<number | undefined>(undefined)
	const [sleepHoursBefore, setSleepHoursBefore] = useState<number | undefined>(undefined)
	const [description, setDescription] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const toggleType = (t: SeizureType) =>
		setTypes(prev =>
			prev.includes(t) ? prev.filter(v => v !== t) : [...prev, t],
		)

	const toggleInternalTrigger = (trigger: InternalTrigger) =>
		setInternalTriggers(prev => toggleTriggerItem(prev, trigger))

	const toggleExternalTrigger = (trigger: ExternalTrigger) =>
		setExternalTriggers(prev => toggleTriggerItem(prev, trigger))

	// Returns error message or null if valid
	const validateFields = (): string | null => {
		if (isInvalidSeizureTime(startedAt)) return i18n.t("seizure.timeInFuture")
		if (isInvalidSleepHours(sleepHoursBefore)) return i18n.t("seizure.invalidSleepHours")
		if (types.length === 0) return i18n.t("seizure.specifyType")
		if (types.includes("custom") && !customType.trim()) return i18n.t("seizure.specifyCustomType")
		return null
	}

	return {
		startedAt, setStartedAt,
		durationSeconds, setDurationSeconds,
		types, setTypes, toggleType,
		customType, setCustomType,
		severity, setSeverity,
		internalTriggers, setInternalTriggers,
		externalTriggers, setExternalTriggers,
		moodBefore, setMoodBefore,
		moodAfter, setMoodAfter,
		sleepHoursBefore, setSleepHoursBefore,
		description, setDescription,
		isLoading, setIsLoading,
		error, setError,
		toggleInternalTrigger,
		toggleExternalTrigger,
		validateFields,
	}
}
