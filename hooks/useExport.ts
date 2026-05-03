// hooks/useExport.ts

import { exportSeizuresToPdf, getSeizuresByPeriod } from "@/services"
import { generateSeizureReportHtml } from "@/utils"
import i18n from "@/config/i18n"
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
				setError(i18n.t("error.exportNoSeizures"))
				return
			}

			await exportSeizuresToPdf(profile, seizures, from, to)
		} catch {
			setError(i18n.t("error.exportError"))
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
				setError(i18n.t("error.exportNoSeizures"))
				return
			}

			console.log("[Email Export] 1. Generating HTML...")
			const html = await generateSeizureReportHtml(profile, seizures, from, to)
			console.log("[Email Export] 2. HTML generated, length:", html.length)

			console.log("[Email Export] 3. Generating PDF...")
			const { uri } = await Print.printToFileAsync({ html, base64: false })
			console.log("[Email Export] 4. PDF generated:", uri)

			console.log("[Email Export] 5. Reading as base64...")
			const fileContent = await readFileAsBase64(uri)
			console.log("[Email Export] 6. Base64 length:", fileContent.length)

			console.log("[Email Export] 7. Sending to backend:", BACKEND_URL)
			const response = await fetch(`${BACKEND_URL}/api/emails/send-report`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": BACKEND_API_KEY || "",
				},
				body: JSON.stringify({
					email,
					pdfBase64: fileContent,
					locale: i18n.language,
					patientName: [profile.lastName, profile.firstName, profile.middleName]
						.filter(Boolean)
						.join(" ") || profile.displayName,
				}),
			})
			console.log("[Email Export] 8. Response status:", response.status)

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ error: i18n.t("error.unknownError") }))
				setError(errorData.error || i18n.t("error.sendError"))
				return
			}

			setError(null)
		} catch (e: any) {
			console.log("[Email Export] EXCEPTION:", e.message, e)
			setError(i18n.t("error.sendError"))
		} finally {
			setIsLoading(false)
		}
	}

	return { exportPdf, exportPdfToEmail, isLoading, error }
}

async function readFileAsBase64(uri: string): Promise<string> {
	const fs = require("expo-file-system/legacy")
	const content = await fs.readAsStringAsync(uri, { encoding: "base64" })
	return content
}
