// hooks/useSeizureList.ts

import { SeizureFilter } from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { getSeizures } from "@/services"
import { useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { useAuth } from "./useAuth"

const PAGE_SIZE = 4

export function useSeizureList() {
	const { user } = useAuth()
	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [filter, setFilter] = useState<SeizureFilter>("all")
	const [page, setPage] = useState(1)

	const fetchSeizures = useCallback(async () => {
		if (!user) return
		try {
			setIsLoading(true)
			const data = await getSeizures(user.uid)
			setSeizures(data)
		} catch {
			// тихо ігноруємо
		} finally {
			setIsLoading(false)
		}
	}, [user])

	useFocusEffect(
		useCallback(() => {
			fetchSeizures()
		}, [fetchSeizures]),
	)

	const filtered = useMemo(() => {
		if (filter === "all") return seizures
		if (filter === "unknown") return seizures.filter(s => !s.severity)
		return seizures.filter(s => s.severity === Number(filter))
	}, [seizures, filter])

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

	const paginated = useMemo(() => {
		const start = (page - 1) * PAGE_SIZE
		return filtered.slice(start, start + PAGE_SIZE)
	}, [filtered, page])

	const handleFilterChange = (f: SeizureFilter) => {
		setFilter(f)
		setPage(1)
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
	}
}
