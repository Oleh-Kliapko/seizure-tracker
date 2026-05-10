// hooks/tracking/useTrackingCalendar.ts

import { getSeizuresByPeriod, getTrackingByPeriod } from "@/services"
import { countFilledSections } from "@/utils/trackingHelpers"
import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { useAuth } from "../auth/useAuth"

function toDateKey(ts: number): string {
	const d = new Date(ts)
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function useTrackingCalendar() {
	const { user } = useAuth()
	const now = new Date()

	const [viewYear, setViewYear] = useState(now.getFullYear())
	const [viewMonth, setViewMonth] = useState(now.getMonth())
	const [filledDates, setFilledDates] = useState<Set<string>>(new Set())
	const [seizureDates, setSeizureDates] = useState<Set<string>>(new Set())
	const [isLoading, setIsLoading] = useState(true)

	const load = useCallback(async () => {
		if (!user) return
		const from = new Date(viewYear, viewMonth, 1).getTime()
		const to = new Date(viewYear, viewMonth + 1, 0, 23, 59, 59, 999).getTime()
		setIsLoading(true)
		try {
			const [records, seizures] = await Promise.all([
				getTrackingByPeriod(user.uid, from, to),
				getSeizuresByPeriod(user.uid, from, to),
			])
			setFilledDates(new Set(
				records
					.filter(r => countFilledSections(r) >= 1)
					.map(r => toDateKey(r.date))
			))
			setSeizureDates(new Set(seizures.map(s => toDateKey(s.startedAt))))
		} finally {
			setIsLoading(false)
		}
	}, [user, viewYear, viewMonth])

	useFocusEffect(
		useCallback(() => {
			load()
		}, [load]),
	)

	const prevMonth = () => {
		if (viewMonth === 0) {
			setViewYear(y => y - 1)
			setViewMonth(11)
		} else {
			setViewMonth(m => m - 1)
		}
	}

	const nextMonth = () => {
		const current = new Date()
		if (
			viewYear > current.getFullYear() ||
			(viewYear === current.getFullYear() && viewMonth >= current.getMonth())
		)
			return
		if (viewMonth === 11) {
			setViewYear(y => y + 1)
			setViewMonth(0)
		} else {
			setViewMonth(m => m + 1)
		}
	}

	const isCurrentMonth =
		viewYear === now.getFullYear() && viewMonth === now.getMonth()

	return { viewYear, viewMonth, filledDates, seizureDates, isLoading, prevMonth, nextMonth, isCurrentMonth }
}
