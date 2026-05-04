// utils/seizureFormatters.ts

import i18n from "@/config/i18n"

function getLocale(): string {
	return i18n.language === "uk" ? "uk-UA" : "en-US"
}

export function formatDate(ts: number): string {
	return new Date(ts).toLocaleDateString(getLocale(), {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

export function formatTime(ts: number): string {
	return new Date(ts).toLocaleTimeString(getLocale(), {
		hour: "2-digit",
		minute: "2-digit",
	})
}

export function formatDuration(start: number, end?: number): string {
	if (!end) return ""
	const mins = Math.round((end - start) / 60000)
	const min = i18n.t("common.minutesShort")
	const hr = i18n.t("common.hoursShort")
	if (mins < 60) return `${mins} ${min}`
	const h = Math.floor(mins / 60)
	const m = mins % 60
	return m > 0 ? `${h} ${hr} ${m} ${min}` : `${h} ${hr}`
}
