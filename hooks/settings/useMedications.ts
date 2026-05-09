// hooks/useMedications.ts

import i18n from "@/config/i18n"
import { Medication } from "@/models/medication"
import { deleteMedication, getMedications } from "@/services"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../auth/useAuth"

export function useMedications() {
	const { user } = useAuth()
	const [medications, setMedications] = useState<Medication[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const load = useCallback(async () => {
		if (!user) return
		setIsLoading(true)
		setError(null)
		try {
			const meds = await getMedications(user.uid)
			setMedications(meds)
		} catch {
			setError(i18n.t("error.loadingError"))
		} finally {
			setIsLoading(false)
		}
	}, [user])

	useEffect(() => {
		load()
	}, [load])

	const remove = async (medicationId: string) => {
		if (!user) return
		await deleteMedication(user.uid, medicationId)
		setMedications(prev => prev.filter(m => m.id !== medicationId))
	}

	return { medications, isLoading, error, reload: load, remove }
}
