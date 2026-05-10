// hooks/settings/useMedicationsForm.ts
import i18n from "@/config/i18n"

import { DoseUnit, Medication } from "@/models/medication"
import {
	createMedication,
	deleteMedication,
	getMedications,
	updateMedication,
} from "@/services"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAuth } from "../auth/useAuth"

export type MedEntry = {
	id?: string
	name: string
	doseAmount: string
	doseUnit: string
	scheduledTimes: string[]
	notes: string
	startMonth: number
	startYear: number
}

function medToEntry(m: Medication): MedEntry {
	return {
		id: m.id,
		name: m.name,
		doseAmount: String(m.doseAmount ?? 1),
		doseUnit: m.doseUnit ?? "tablets",
		scheduledTimes: m.scheduledTimes ?? [],
		notes: m.notes ?? "",
		startMonth: m.startedAt?.month ?? 0,
		startYear: m.startedAt?.year ?? 0,
	}
}

export function useMedicationsForm() {
	const { user } = useAuth()
	const [entries, setEntries] = useState<MedEntry[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const entriesRef = useRef<MedEntry[]>([])
	entriesRef.current = entries

	const load = useCallback(async () => {
		if (!user) return
		setIsLoading(true)
		try {
			const meds = await getMedications(user.uid)
			setEntries(meds.map(medToEntry))
		} catch {
			setError(i18n.t("error.loadingError"))
		} finally {
			setIsLoading(false)
		}
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	const saveEntry = useCallback(
		async (index: number, overrides: Partial<MedEntry> = {}) => {
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
					doseUnit: (e.doseUnit || "tablets") as DoseUnit,
					...(e.scheduledTimes.length > 0
						? { scheduledTimes: e.scheduledTimes }
						: {}),
					...(e.notes.trim() ? { notes: e.notes.trim() } : {}),
					...(e.startMonth > 0 && e.startYear > 0
						? { startedAt: { month: e.startMonth, year: e.startYear } }
						: {}),
				}
				if (e.id) {
					await updateMedication(user.uid, e.id, data)
				} else {
					const newId = await createMedication(user.uid, data)
					setEntries(prev =>
						prev.map((en, i) => (i === index ? { ...en, id: newId } : en)),
					)
				}
				setError(null)
			} catch {
				setError(i18n.t("error.savingErrorShort"))
			}
		},
		[user],
	)

	const addEntry = () =>
		setEntries(prev => [
			...prev,
			{
				name: "",
				doseAmount: "1",
				doseUnit: "tablets",
				scheduledTimes: [],
				notes: "",
				startMonth: 0,
				startYear: 0,
			},
		])

	const removeEntry = async (index: number) => {
		const entry = entriesRef.current[index]
		setEntries(prev => prev.filter((_, i) => i !== index))
		if (entry?.id && user) {
			try {
				await deleteMedication(user.uid, entry.id)
			} catch {
				setError(i18n.t("error.deleteError"))
			}
		}
	}

	const updateEntry = (index: number, field: keyof MedEntry, value: string) => {
		setEntries(prev =>
			prev.map((e, i) => {
				if (i !== index) return e
				const updated = { ...e, [field]: value }
				if (field === "doseUnit") saveEntry(index, { [field]: value })
				return updated
			}),
		)
	}

	const addEntryTime = (index: number, time: string) => {
		setEntries(prev =>
			prev.map((e, i) => {
				if (i !== index) return e
				if (e.scheduledTimes.includes(time)) return e
				const newTimes = [...e.scheduledTimes, time].sort()
				saveEntry(index, { scheduledTimes: newTimes })
				return { ...e, scheduledTimes: newTimes }
			}),
		)
	}

	const removeEntryTime = (index: number, time: string) => {
		setEntries(prev =>
			prev.map((e, i) => {
				if (i !== index) return e
				const newTimes = e.scheduledTimes.filter(t => t !== time)
				saveEntry(index, { scheduledTimes: newTimes })
				return { ...e, scheduledTimes: newTimes }
			}),
		)
	}

	const updateEntryStarted = (index: number, month: number, year: number) => {
		setEntries(prev =>
			prev.map((e, i) =>
				i !== index ? e : { ...e, startMonth: month, startYear: year },
			),
		)
		saveEntry(index, { startMonth: month, startYear: year })
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
		updateEntryStarted,
		addEntryTime,
		removeEntryTime,
		saveEntry,
		saveAllEntries,
	}
}
