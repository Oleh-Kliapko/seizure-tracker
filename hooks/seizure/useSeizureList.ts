// hooks/seizure/useSeizureList.ts

import { SeizureFilter } from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { getSeizures } from "@/services"
import { useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { useAuth } from "../auth/useAuth"

const PAGE_SIZE = 4

export function useSeizureList(dateFilter?: string) {
	const { user } = useAuth()
	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [filter, setFilter] = useState<SeizureFilter>("all")
	const [page, setPage] = useState(1)

	const fetchSeizures = useCallback(async () => {
		if (!user) return

		let cancelled = false

		try {
			setIsLoading(true)
			const data = await getSeizures(user.uid)
			setSeizures(data)
		} catch {
		} finally {
			if (!cancelled) setIsLoading(false)
		}

		return () => {
			cancelled = true
		}
	}, [user])

	useFocusEffect(
		useCallback(() => {
			if (!user) return
			fetchSeizures()
		}, [fetchSeizures, user]),
	)

	const filtered = useMemo(() => {
		let list = seizures
		if (dateFilter) {
			list = list.filter(s => {
				const d = new Date(s.startedAt)
				const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
				return key === dateFilter
			})
		}
		if (filter === "all") return list
		if (filter === "video") return list.filter(s => !!s.videoUrl)
		if (filter === "unknown") return list.filter(s => !s.severity)
		return list.filter(s => s.severity === Number(filter))
	}, [seizures, filter, dateFilter])

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

	const paginated = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE
		return filtered.slice(start, start + PAGE_SIZE)
	}, [filtered, page])

	const handleFilterChange = (f: SeizureFilter) => {
		setFilter(f)
		setPage(1)
	}

	const updateSeizureInList = (updated: Seizure) => {
		setSeizures(prev => prev.map(s => (s.id === updated.id ? updated : s)))
	}

	return {
		seizures,
		paginated,
		filter,
		page,
		totalPages,
		isLoading,
		handleFilterChange,
		setPage,
		updateSeizureInList,
		reload: fetchSeizures,
	}
}
