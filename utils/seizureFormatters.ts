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

export function formatDoseAmount(v: number): string {
	return v % 1 === 0 ? String(v) : v.toFixed(1)
}

export function formatDurationSeconds(seconds?: number): string {
	if (!seconds) return ""
	const min = i18n.t("common.minutesShort")
	const hr = i18n.t("common.hoursShort")
	const totalMins = Math.floor(seconds / 60)
	const secs = seconds % 60
	if (seconds < 60) return `${seconds} ${i18n.t("common.secondsShort")}`
	if (totalMins < 60) return secs > 0 ? `${totalMins} ${min} ${secs} ${i18n.t("common.secondsShort")}` : `${totalMins} ${min}`
	const h = Math.floor(totalMins / 60)
	const m = totalMins % 60
	return m > 0 ? `${h} ${hr} ${m} ${min}` : `${h} ${hr}`
}
