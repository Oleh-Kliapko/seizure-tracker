// hooks/history/useHistoryData.ts

import { auth } from "@/config/firebase"
import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
} from "@/constants/commonConstants"
import { Seizure } from "@/models/seizure"
import { getSeizuresByPeriod } from "@/services"
import { computeTimeOfDay, groupSeizuresByDate } from "@/utils/historyHelpers"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export type { TimeOfDay, TriggerStat } from "@/utils/historyHelpers"

export function useHistoryData(from: number, to: number, refreshKey?: number) {
	const { t } = useTranslation()
	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const allTriggerLabels: Record<string, string> = {
		...Object.fromEntries(
			INTERNAL_TRIGGERS.map(tr => [tr.value, t(tr.labelKey)]),
		),
		...Object.fromEntries(
			EXTERNAL_TRIGGERS.map(tr => [tr.value, t(tr.labelKey)]),
		),
	}

	useEffect(() => {
		const uid = auth.currentUser?.uid
		if (!uid) return
		setIsLoading(true)
		getSeizuresByPeriod(uid, from, to)
			.then(setSeizures)
			.finally(() => setIsLoading(false))
	}, [from, to, refreshKey])

	const seizuresByDate = groupSeizuresByDate(seizures)
	const timeOfDay = computeTimeOfDay(seizures)

	const triggerCounts: Record<string, number> = {}
	for (const s of seizures) {
		const all = [...(s.internalTriggers ?? []), ...(s.externalTriggers ?? [])]
		for (const tr of all) {
			const label =
				tr.type === "custom"
					? typeof tr.value === "string"
						? tr.value
						: t("common.other")
					: (allTriggerLabels[tr.type] ?? tr.type)
			triggerCounts[label] = (triggerCounts[label] ?? 0) + 1
		}
	}

	const topTriggers = Object.entries(triggerCounts)
		.map(([label, count]) => ({ label, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 5)

	return { seizures, seizuresByDate, timeOfDay, topTriggers, isLoading }
}
