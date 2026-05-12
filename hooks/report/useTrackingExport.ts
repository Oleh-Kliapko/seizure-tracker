// hooks/report/useTrackingExport.ts

import i18n from "@/config/i18n"
import { getSeizuresByPeriod, getTrackingByPeriod } from "@/services"
import { generateTrackingReportHtml } from "@/utils/trackingReport"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { useUser } from "../useUser"

export function useTrackingExport() {
	const { user } = useAuth()
	const { profile } = useUser()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const exportPdf = async (from: number, to: number) => {
		if (!user || !profile) return

		try {
			setIsLoading(true)
			setError(null)

			const [records, seizures] = await Promise.all([
				getTrackingByPeriod(user.uid, from, to),
				getSeizuresByPeriod(user.uid, from, to).catch(() => []),
			])

			if (records.length === 0) {
				setError(i18n.t("error.exportNoTracking"))
				return
			}

			const seizureDayKeys = new Set(
				seizures.map(s => {
					const d = new Date(s.startedAt)
					return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
				}),
			)

			const html = generateTrackingReportHtml(profile, records, seizureDayKeys, from, to)
			const { uri } = await Print.printToFileAsync({
				html: html,
				base64: false,
			})

			const canShare = await Sharing.isAvailableAsync()
			if (canShare) {
				await Sharing.shareAsync(uri, {
					mimeType: "application/pdf",
					dialogTitle: i18n.t("common.share"),
					UTI: "com.adobe.pdf",
				})
			}
		} catch {
			setError(i18n.t("error.exportError"))
		} finally {
			setIsLoading(false)
		}
	}

	return { exportPdf, isLoading, error }
}
