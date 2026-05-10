// hooks/dashboard/useDashboard.ts

import { DailyTracking } from "@/models"
import { Medication } from "@/models/medication"
import { Seizure } from "@/models/seizure"
import {
	getMedicationsByPatient,
	getSeizures,
	getTrackingByDate,
} from "@/services"
import { countFilledSections } from "@/utils/trackingHelpers"
import { useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useUser } from "../useUser"

export type HeatmapDay = {
	dateStr: string
	count: number
}

export function useDashboard() {
	const { user } = useAuth()
	const { profile } = useUser()

	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [tracking, setTracking] = useState<DailyTracking | null>(null)
	const [medications, setMedications] = useState<Medication[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const load = useCallback(async () => {
		if (!user) return
		setIsLoading(true)
		try {
			const [seizuresData, trackingData, medsData] = await Promise.all([
				getSeizures(user.uid),
				getTrackingByDate(user.uid, user.uid, Date.now()).catch(() => null),
				getMedicationsByPatient(user.uid, user.uid).catch(() => []),
			])
			setSeizures(seizuresData)
			setTracking(trackingData)
			setMedications(medsData)
		} finally {
			setIsLoading(false)
		}
	}, [user])

	useFocusEffect(
		useCallback(() => {
			load()
		}, [load]),
	)

	const computed = useMemo(() => {
		const lastSeizure = seizures[0] ?? null

		const daysSinceLastSeizure = lastSeizure
			? Math.floor((Date.now() - lastSeizure.startedAt) / (1000 * 60 * 60 * 24))
			: null

		const now = new Date()
		const thisMonthStart = new Date(
			now.getFullYear(),
			now.getMonth(),
			1,
		).getTime()
		const lastMonthStart = new Date(
			now.getFullYear(),
			now.getMonth() - 1,
			1,
		).getTime()
		const lastMonthEnd = thisMonthStart - 1

		const thisMonthCount = seizures.filter(
			s => s.startedAt >= thisMonthStart,
		).length
		const lastMonthCount = seizures.filter(
			s => s.startedAt >= lastMonthStart && s.startedAt <= lastMonthEnd,
		).length

		const heatmapDays: HeatmapDay[] = []
		for (let i = 29; i >= 0; i--) {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			d.setDate(d.getDate() - i)
			const dayStart = d.getTime()
			const dayEnd = dayStart + 24 * 60 * 60 * 1000 - 1
			const count = seizures.filter(
				s => s.startedAt >= dayStart && s.startedAt <= dayEnd,
			).length
			heatmapDays.push({ dateStr: d.toISOString().split("T")[0], count })
		}

		const recentSeizures = seizures.slice(0, 3)

		const trackingFilledSections = countFilledSections(tracking)

		const medicationsTakenToday = tracking?.medications
			? new Set(tracking.medications.map(m => m.medicationId)).size
			: 0

		return {
			lastSeizure,
			daysSinceLastSeizure,
			thisMonthCount,
			lastMonthCount,
			heatmapDays,
			recentSeizures,
			trackingFilledSections,
			medicationsTakenToday,
		}
	}, [seizures, tracking])

	return {
		isLoading,
		profile,
		medications,
		hasSeizures: seizures.length > 0,
		reload: load,
		...computed,
	}
}
