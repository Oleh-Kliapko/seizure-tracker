// hooks/useExportForm.ts

import i18n from "@/config/i18n"
import { REPORT_COOLDOWN_DAYS } from "@/constants/commonConstants"
import { useEffect, useState } from "react"

function formatShortDate(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleDateString(locale, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

function makeMinFromDate(): Date {
	const d = new Date()
	d.setMonth(d.getMonth() - 5)
	d.setHours(0, 0, 0, 0)
	return d
}

export function useExportForm(
	userEmail: string | null | undefined,
	lastReportSentAt: number | undefined,
) {
	const minFromDate = makeMinFromDate()

	const [from, setFrom] = useState(() => minFromDate.getTime())
	const [to, setTo] = useState(() => {
		const d = new Date()
		d.setHours(23, 59, 59, 999)
		return d.getTime()
	})

	const [showEmailModal, setShowEmailModal] = useState(false)
	const [email, setEmail] = useState(userEmail ?? "")

	useEffect(() => {
		if (userEmail) setEmail(userEmail)
	}, [userEmail])

	const cooldownMs = REPORT_COOLDOWN_DAYS * 24 * 60 * 60 * 1000
	const inCooldown =
		!!lastReportSentAt && Date.now() - lastReportSentAt < cooldownMs
	const sentDateLabel = inCooldown ? formatShortDate(lastReportSentAt!) : null

	return {
		minFromDate,
		from,
		to,
		setFrom,
		setTo,
		email,
		showEmailModal,
		setShowEmailModal,
		inCooldown,
		sentDateLabel,
	}
}
