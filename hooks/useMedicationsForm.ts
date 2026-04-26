// hooks/useMedicationsForm.ts

import { DoseUnit, Medication } from "@/models/medication"
import {
	createMedication,
	deleteMedication,
	getMedications,
	updateMedication,
} from "@/services"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

export type MedEntry = {
	id?: string
	name: string
	doseAmount: string   // string для форми, конвертується в number при збереженні
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
	const [deletedIds, setDeletedIds] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [error, setError] = useState<string | null>(null)

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

	const addEntry = () =>
		setEntries(prev => [
			...prev,
			{ name: "", doseAmount: "1", doseUnit: "таблетки", scheduledTimes: [], notes: "" },
		])

	const removeEntry = (index: number) => {
		const entry = entries[index]
		if (entry.id) setDeletedIds(prev => [...prev, entry.id!])
		setEntries(prev => prev.filter((_, i) => i !== index))
	}

	const updateEntry = (index: number, field: keyof MedEntry, value: string) => {
		setEntries(prev =>
			prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
		)
	}

	const addEntryTime = (index: number, time: string) => {
		setEntries(prev =>
			prev.map((e, i) => {
				if (i !== index) return e
				if (e.scheduledTimes.includes(time)) return e
				return { ...e, scheduledTimes: [...e.scheduledTimes, time].sort() }
			}),
		)
	}

	const removeEntryTime = (index: number, time: string) => {
		setEntries(prev =>
			prev.map((e, i) =>
				i === index
					? { ...e, scheduledTimes: e.scheduledTimes.filter(t => t !== time) }
					: e,
			),
		)
	}

	const handleSave = async () => {
		if (!user) return
		for (const e of entries) {
			const amount = parseFloat(e.doseAmount)
			if (!e.name.trim() || isNaN(amount) || amount <= 0) {
				setError("Введіть назву і кількість для кожного препарату")
				return
			}
		}
		setIsSaving(true)
		setError(null)
		try {
			await Promise.all(deletedIds.map(id => deleteMedication(user.uid, id)))
			await Promise.all(
				entries.map(e => {
					const data = {
						userId: user.uid,
						patientId: user.uid,
						name: e.name.trim(),
						doseAmount: parseFloat(e.doseAmount),
						doseUnit: (e.doseUnit || "таблетки") as DoseUnit,
						...(e.scheduledTimes.length > 0 ? { scheduledTimes: e.scheduledTimes } : {}),
						...(e.notes.trim() ? { notes: e.notes.trim() } : {}),
					}
					return e.id
						? updateMedication(user.uid, e.id, data)
						: createMedication(user.uid, data)
				}),
			)
			setDeletedIds([])
			const fresh = await getMedications(user.uid)
			setEntries(fresh.map(medToEntry))
			setIsSaved(true)
			setTimeout(() => setIsSaved(false), 2000)
		} catch {
			setError("Помилка збереження")
		} finally {
			setIsSaving(false)
		}
	}

	return {
		entries,
		isLoading,
		isSaving,
		isSaved,
		error,
		addEntry,
		removeEntry,
		updateEntry,
		addEntryTime,
		removeEntryTime,
		handleSave,
	}
}
