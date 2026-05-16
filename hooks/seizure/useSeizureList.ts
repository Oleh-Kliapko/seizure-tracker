// hooks/seizure/useSeizureList.ts

import { SeizureFilter } from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { getSeizuresBatch, getSeizuresByPeriod } from "@/services"
import { useFocusEffect } from "expo-router"
import { QueryDocumentSnapshot } from "firebase/firestore"
import { useCallback, useMemo, useRef, useState } from "react"
import { useAuth } from "../auth/useAuth"

const PAGE_SIZE = 4
const BATCH_SIZE = 50

export function useSeizureList(dateFilter?: string) {
	const { user } = useAuth()
	const [seizures, setSeizures] = useState<Seizure[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [hasMore, setHasMore] = useState(false)
	const [filter, setFilter] = useState<SeizureFilter>("all")
	const [page, setPage] = useState(1)
	const cursorRef = useRef<QueryDocumentSnapshot | null>(null)

	const fetchSeizures = useCallback(async () => {
		if (!user) return
		setIsLoading(true)
		cursorRef.current = null
		try {
			if (dateFilter) {
				const [year, month, day] = dateFilter.split("-").map(Number)
				const dayStart = new Date(year, month - 1, day).getTime()
				const dayEnd = dayStart + 24 * 60 * 60 * 1000 - 1
				const data = await getSeizuresByPeriod(user.uid, dayStart, dayEnd)
				setSeizures(data)
				setHasMore(false)
			} else {
				const { seizures: data, cursor } = await getSeizuresBatch(user.uid, BATCH_SIZE)
				setSeizures(data)
				cursorRef.current = cursor
				setHasMore(cursor !== null)
			}
			setPage(1)
		} catch {
		} finally {
			setIsLoading(false)
		}
	}, [user, dateFilter])

	const loadMore = useCallback(async () => {
		if (!user || !cursorRef.current || isLoadingMore) return
		setIsLoadingMore(true)
		try {
			const { seizures: more, cursor } = await getSeizuresBatch(user.uid, BATCH_SIZE, cursorRef.current)
			setSeizures(prev => [...prev, ...more])
			cursorRef.current = cursor
			setHasMore(cursor !== null)
		} catch {
		} finally {
			setIsLoadingMore(false)
		}
	}, [user, isLoadingMore])

	useFocusEffect(
		useCallback(() => {
			if (!user) return
			fetchSeizures()
		}, [fetchSeizures, user]),
	)

	const filtered = useMemo(() => {
		let list = seizures
		if (filter === "all") return list
		if (filter === "video") return list.filter(s => !!s.videoUrl)
		if (filter === "unknown") return list.filter(s => !s.severity)
		return list.filter(s => s.severity === Number(filter))
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
		isLoadingMore,
		hasMore,
		handleFilterChange,
		setPage,
		updateSeizureInList,
		reload: fetchSeizures,
		loadMore,
	}
}
