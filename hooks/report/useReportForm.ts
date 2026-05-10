// hooks/report/useReportForm.ts

import i18n from "@/config/i18n"
import { REPORT_COOLDOWN_DAYS } from "@/constants/commonConstants"
import { useEffect, useMemo, useState } from "react"

function formatShortDate(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleDateString(locale, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

function minFromForTo(toTs: number): Date {
	const d = new Date(toTs)
	d.setMonth(d.getMonth() - 5)
	d.setHours(0, 0, 0, 0)
	return d
}

export function useReportForm(
	userEmail: string | null | undefined,
	lastReportSentAt: number | undefined,
) {
	const [to, setToRaw] = useState(() => {
		const d = new Date()
		d.setHours(23, 59, 59, 999)
		return d.getTime()
	})

	const minFromDate = useMemo(() => minFromForTo(to), [to])

	const [from, setFrom] = useState(() => minFromDate.getTime())

	// When "to" moves and the current "from" falls outside the new 5-month window, clamp it
	const setTo = (ts: number) => {
		const end = new Date(ts)
		end.setHours(23, 59, 59, 999)
		const newTo = end.getTime()
		setToRaw(newTo)
		const newMin = minFromForTo(newTo).getTime()
		setFrom(prev => (prev < newMin ? newMin : prev))
	}

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
