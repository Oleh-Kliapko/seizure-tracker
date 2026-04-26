// hooks/useMedicationForm.ts

import { Medication } from "@/models/medication"
import { createMedication, updateMedication } from "@/services"
import { useState } from "react"
import { useAuth } from "./useAuth"

const TIME_RE = /^([01]?\d|2[0-3]):[0-5]\d$/

export function useMedicationForm(initial?: Medication) {
	const { user } = useAuth()
	const [name, setName] = useState(initial?.name ?? "")
	const [dose, setDose] = useState(initial?.dose ?? "")
	const [scheduledTime, setScheduledTime] = useState(initial?.scheduledTime ?? "")
	const [notes, setNotes] = useState(initial?.notes ?? "")
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const validate = () => {
		if (!name.trim()) { setError("Введіть назву ліків"); return false }
		if (!dose.trim()) { setError("Введіть дозу"); return false }
		if (scheduledTime && !TIME_RE.test(scheduledTime)) {
			setError("Час у форматі ГГ:ХХ, наприклад 08:00")
			return false
		}
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
				...(scheduledTime.trim() ? { scheduledTime: scheduledTime.trim() } : {}),
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
		scheduledTime, setScheduledTime,
		notes, setNotes,
		isSaving, error,
		handleSave,
	}
}
