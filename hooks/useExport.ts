// hooks/useExport.ts

import { exportSeizuresToPdf, getSeizuresByPeriod } from "@/services"
import { useState } from "react"
import { useAuth } from "./useAuth"
import { useUser } from "./useUser"

export function useExport() {
	const { user } = useAuth()
	const { profile } = useUser()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const exportPdf = async (from: number, to: number) => {
		if (!user || !profile) return

		try {
			setIsLoading(true)
			setError(null)

			const seizures = await getSeizuresByPeriod(user.uid, from, to)

			if (seizures.length === 0) {
				setError("За вибраний період приступів не знайдено")
				return
			}

			await exportSeizuresToPdf(profile, seizures, from, to)
		} catch {
			setError("Помилка експорту. Спробуйте ще раз")
		} finally {
			setIsLoading(false)
		}
	}

	return { exportPdf, isLoading, error }
}
