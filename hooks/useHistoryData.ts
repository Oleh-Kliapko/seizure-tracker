// hooks/useHistoryData.ts

import { auth } from "@/config/firebase"
import { EXTERNAL_TRIGGERS, INTERNAL_TRIGGERS } from "@/constants/commonConstants"
import { Seizure } from "@/models/seizure"
import { getSeizuresByPeriod } from "@/services"
import { useEffect, useState } from "react"

export type TimeOfDay = {
	night: number
	morning: number
	afternoon: number
	evening: number
}

export type TriggerStat = {
	label: string
	count: number
}

const ALL_TRIGGER_LABELS: Record<string, string> = {
	...Object.fromEntries(INTERNAL_TRIGGERS.map(t => [t.value, t.label])),
	...Object.fromEntries(EXTERNAL_TRIGGERS.map(t => [t.value, t.label])),
}

function getTimeOfDayKey(timestamp: number): keyof TimeOfDay {
	const hour = new Date(timestamp).getHours()
	if (hour < 6) return "night"
	if (hour < 12) return "morning"
	if (hour < 18) return "afternoon"
	return "evening"
}

export function formatDateKey(timestamp: number): string {
	const d = new Date(timestamp)
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function useHistoryData(from: number, to: number, refreshKey?: number) {
	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const uid = auth.currentUser?.uid
		if (!uid) return
		setIsLoading(true)
		getSeizuresByPeriod(uid, from, to)
			.then(setSeizures)
			.finally(() => setIsLoading(false))
	}, [from, to, refreshKey])

	const seizuresByDate: Record<string, Seizure[]> = {}
	for (const s of seizures) {
		const key = formatDateKey(s.startedAt)
		if (!seizuresByDate[key]) seizuresByDate[key] = []
		seizuresByDate[key].push(s)
	}

	const timeOfDay: TimeOfDay = { night: 0, morning: 0, afternoon: 0, evening: 0 }
	for (const s of seizures) {
		timeOfDay[getTimeOfDayKey(s.startedAt)]++
	}

	const triggerCounts: Record<string, number> = {}
	for (const s of seizures) {
		const all = [...(s.internalTriggers ?? []), ...(s.externalTriggers ?? [])]
		for (const t of all) {
			const label =
				t.type === "custom"
					? (typeof t.value === "string" ? t.value : "Інше")
					: (ALL_TRIGGER_LABELS[t.type] ?? t.type)
			triggerCounts[label] = (triggerCounts[label] ?? 0) + 1
		}
	}

	const topTriggers: TriggerStat[] = Object.entries(triggerCounts)
		.map(([label, count]) => ({ label, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, 5)

	return { seizures, seizuresByDate, timeOfDay, topTriggers, isLoading }
}
