// hooks/useMedicationsForm.ts

import { DoseUnit, Medication } from "@/models/medication"
import {
	createMedication,
	deleteMedication,
	getMedications,
	updateMedication,
} from "@/services"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAuth } from "./useAuth"

export type MedEntry = {
	id?: string
	name: string
	doseAmount: string
	doseUnit: string
	scheduledTimes: string[]
	notes: string
}

function medToEntry(m: Medication): MedEntry {
	return {
		id: m.id,
		name: m.name,
		doseAmount: String(m.doseAmount ?? 1),
		doseUnit: m.doseUnit ?? "таблетки",
		scheduledTimes: m.scheduledTimes ?? [],
		notes: m.notes ?? "",
	}
}

export function useMedicationsForm() {
	const { user } = useAuth()
	const [entries, setEntries] = useState<MedEntry[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const entriesRef = useRef<MedEntry[]>([])
	entriesRef.current = entries

	const load = async () => {
		if (!user) return
		setIsLoading(true)
		try {
			const meds = await getMedications(user.uid)
			setEntries(meds.map(medToEntry))
		} catch {
			setError("Помилка завантаження")
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => { load() }, [user])

	const saveEntry = useCallback(async (index: number, overrides: Partial<MedEntry> = {}) => {
		if (!user) return
		const e = { ...entriesRef.current[index], ...overrides }
		const amount = parseFloat(e.doseAmount)
		if (!e.name.trim() || isNaN(amount) || amount <= 0) return

		try {
			const data = {
				userId: user.uid,
				patientId: user.uid,
				name: e.name.trim(),
				doseAmount: amount,
				doseUnit: (e.doseUnit || "таблетки") as DoseUnit,
				...(e.scheduledTimes.length > 0 ? { scheduledTimes: e.scheduledTimes } : {}),
				...(e.notes.trim() ? { notes: e.notes.trim() } : {}),
			}
			if (e.id) {
				await updateMedication(user.uid, e.id, data)
			} else {
				const newId = await createMedication(user.uid, data)
				setEntries(prev => prev.map((en, i) => i === index ? { ...en, id: newId } : en))
			}
			setError(null)
		} catch {
			setError("Помилка збереження")
		}
	}, [user])

	const addEntry = () =>
		setEntries(prev => [
			...prev,
			{ name: "", doseAmount: "1", doseUnit: "таблетки", scheduledTimes: [], notes: "" },
		])

	const removeEntry = async (index: number) => {
		const entry = entriesRef.current[index]
		setEntries(prev => prev.filter((_, i) => i !== index))
		if (entry?.id && user) {
			try {
				await deleteMedication(user.uid, entry.id)
			} catch {
				setError("Помилка видалення")
			}
		}
	}

	const updateEntry = (index: number, field: keyof MedEntry, value: string) => {
		setEntries(prev => prev.map((e, i) => {
			if (i !== index) return e
			const updated = { ...e, [field]: value }
			if (field === "doseUnit") saveEntry(index, { [field]: value })
			return updated
		}))
	}

	const addEntryTime = (index: number, time: string) => {
		setEntries(prev => prev.map((e, i) => {
			if (i !== index) return e
			if (e.scheduledTimes.includes(time)) return e
			const newTimes = [...e.scheduledTimes, time].sort()
			saveEntry(index, { scheduledTimes: newTimes })
			return { ...e, scheduledTimes: newTimes }
		}))
	}

	const removeEntryTime = (index: number, time: string) => {
		setEntries(prev => prev.map((e, i) => {
			if (i !== index) return e
			const newTimes = e.scheduledTimes.filter(t => t !== time)
			saveEntry(index, { scheduledTimes: newTimes })
			return { ...e, scheduledTimes: newTimes }
		}))
	}

	const saveAllEntries = useCallback(async () => {
		for (let i = 0; i < entriesRef.current.length; i++) {
			await saveEntry(i)
		}
	}, [saveEntry])

	return {
		entries,
		isLoading,
		error,
		addEntry,
		removeEntry,
		updateEntry,
		addEntryTime,
		removeEntryTime,
		saveEntry,
		saveAllEntries,
	}
}
