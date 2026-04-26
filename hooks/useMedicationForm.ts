// hooks/useMedicationForm.ts

import { Medication } from "@/models/medication"
import { createMedication, updateMedication } from "@/services"
import { useState } from "react"
import { useAuth } from "./useAuth"

export function useMedicationForm(initial?: Medication) {
	const { user } = useAuth()
	const [name, setName] = useState(initial?.name ?? "")
	const [dose, setDose] = useState(initial?.dose ?? "")
	const [scheduledTimes, setScheduledTimes] = useState<string[]>(
		initial?.scheduledTimes ?? [],
	)
	const [notes, setNotes] = useState(initial?.notes ?? "")
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const addTime = (time: string) => {
		setScheduledTimes(prev => {
			if (prev.includes(time)) return prev
			return [...prev, time].sort()
		})
	}

	const removeTime = (time: string) => {
		setScheduledTimes(prev => prev.filter(t => t !== time))
	}

	const validate = () => {
		if (!name.trim()) { setError("Введіть назву ліків"); return false }
		if (!dose.trim()) { setError("Введіть дозу"); return false }
		return true
	}

	const handleSave = async (onSuccess: () => void) => {
		if (!user || !validate()) return
		setIsSaving(true)
		setError(null)
		try {
			const data = {
				userId: user.uid,
				patientId: user.uid,
				name: name.trim(),
				dose: dose.trim(),
				...(scheduledTimes.length > 0 ? { scheduledTimes } : {}),
				...(notes.trim() ? { notes: notes.trim() } : {}),
			}
			if (initial) {
				await updateMedication(user.uid, initial.id, data)
			} else {
				await createMedication(user.uid, data)
			}
			onSuccess()
		} catch {
			setError("Помилка збереження")
		} finally {
			setIsSaving(false)
		}
	}

	return {
		name, setName,
		dose, setDose,
		scheduledTimes, addTime, removeTime,
		notes, setNotes,
		isSaving, error,
		handleSave,
	}
}
