// hooks/useExport.ts

import { exportSeizuresToPdf, generateSeizureReportHtml, getSeizuresByPeriod } from "@/services"
import { useState } from "react"
import * as Print from "expo-print"
import { useAuth } from "./useAuth"
import { useUser } from "./useUser"

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000"
const BACKEND_API_KEY = process.env.EXPO_PUBLIC_BACKEND_API_KEY

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

	const exportPdfToEmail = async (from: number, to: number, email: string) => {
		if (!user || !profile) return

		try {
			setIsLoading(true)
			setError(null)

			const seizures = await getSeizuresByPeriod(user.uid, from, to)

			if (seizures.length === 0) {
				setError("За вибраний період приступів не знайдено")
				return
			}

			const html = await generateSeizureReportHtml(profile, seizures, from, to)
			const { uri } = await Print.printToFileAsync({ html, base64: false })

			// Читаємо файл як base64
			const fileContent = await readFileAsBase64(uri)

			// Відправляємо на бекенд
			const response = await fetch(`${BACKEND_URL}/api/emails/send-report`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": BACKEND_API_KEY || "",
				},
				body: JSON.stringify({
					email,
					pdfBase64: fileContent,
					patientName: [profile.lastName, profile.firstName, profile.middleName]
						.filter(Boolean)
						.join(" ") || profile.displayName,
				}),
			})

			if (!response.ok) {
				const errorData = await response.json()
				setError(errorData.error || "Помилка відправлення. Спробуйте ще раз")
				return
			}

			setError(null)
		} catch (e: any) {
			setError("Помилка відправлення. Спробуйте ще раз")
		} finally {
			setIsLoading(false)
		}
	}

	return { exportPdf, exportPdfToEmail, isLoading, error }
}

async function readFileAsBase64(uri: string): Promise<string> {
	const fs = require("expo-file-system")
	const content = await fs.readAsStringAsync(uri, { encoding: "base64" })
	return content
}
