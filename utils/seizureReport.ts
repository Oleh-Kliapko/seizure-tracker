// utils/seizureReport.ts

import i18n from "@/config/i18n"
import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	SEIZURE_TYPES,
	SEVERITY_LABELS,
} from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { Medication } from "@/models/medication"
import { User } from "@/models/user"
import QRCode from "qrcode"
import { htmlReport } from "./seizureReportHtml"
import { buildMedicationsHtml, formatReportDate as formatDate, getPatientName } from "./reportShared"

function formatTime(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleTimeString(locale, {
		hour: "2-digit",
		minute: "2-digit",
	})
}

function formatDuration(seconds?: number): string {
	if (!seconds) return "—"
	const secLabel = i18n.t("common.secondsShort")
	const minLabel = i18n.t("report.minutes")
	const hourLabel = i18n.t("report.hours")
	if (seconds < 60) return `${seconds} ${secLabel}`
	const totalMins = Math.floor(seconds / 60)
	const secs = seconds % 60
	if (totalMins < 60) return secs > 0 ? `${totalMins} ${minLabel} ${secs} ${secLabel}` : `${totalMins} ${minLabel}`
	const h = Math.floor(totalMins / 60)
	const m = totalMins % 60
	return m > 0 ? `${h} ${hourLabel} ${m} ${minLabel}` : `${h} ${hourLabel}`
}

function getTypeLabel(seizure: Seizure): string {
	const types: string[] = seizure.types?.length ? seizure.types : [(seizure as any).type ?? "tonic-clonic"]
	return types
		.map(type => {
			if (type === "custom") return seizure.customType ?? i18n.t("seizureType.custom")
			const found = SEIZURE_TYPES.find(item => item.value === type)
			return found ? i18n.t(found.labelKey) : type
		})
		.join(" + ")
}

function getTriggers(seizure: Seizure): string {
	const internal = (seizure.internalTriggers ?? []).map(item => {
		const found = INTERNAL_TRIGGERS.find(t => t.value === item.type)
		return found ? i18n.t(found.labelKey) : item.type
	})
	const external = (seizure.externalTriggers ?? []).map(item => {
		const found = EXTERNAL_TRIGGERS.find(t => t.value === item.type)
		return found ? i18n.t(found.labelKey) : item.type
	})
	return [...internal, ...external].join(", ") || "—"
}

function getSeverityLabel(severity?: number): string {
	if (!severity) return "—"
	const key = SEVERITY_LABELS[severity as keyof typeof SEVERITY_LABELS]
	return key ? i18n.t(key) : "—"
}

function getStats(seizures: Seizure[]) {
	const total = seizures.length
	const withDuration = seizures.filter(s => s.durationSeconds)
	const avgDuration = withDuration.length
		? Math.round(
				withDuration.reduce((acc, s) => acc + s.durationSeconds! / 60, 0) / withDuration.length,
			)
		: 0

	const severe = seizures.filter(s => s.severity === 3).length
	const medium = seizures.filter(s => s.severity === 2).length
	const light = seizures.filter(s => s.severity === 1).length

	// Найчастіші тригери
	const triggerCount: Record<string, number> = {}
	seizures.forEach(s => {
		;(s.internalTriggers ?? []).forEach(item => {
			const found = INTERNAL_TRIGGERS.find(t => t.value === item.type)
			const label = found ? i18n.t(found.labelKey) : item.type
			triggerCount[label] = (triggerCount[label] ?? 0) + 1
		})
		;(s.externalTriggers ?? []).forEach(item => {
			const found = EXTERNAL_TRIGGERS.find(t => t.value === item.type)
			const label = found ? i18n.t(found.labelKey) : item.type
			triggerCount[label] = (triggerCount[label] ?? 0) + 1
		})
	})

	const topTriggers =
		Object.entries(triggerCount)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([label, count]) => `${label} (${count})`)
			.join(", ") || "—"

	return { total, avgDuration, severe, medium, light, topTriggers }
}

type DayData = { count: number; maxSeverity: number }

function buildDayMap(seizures: Seizure[]): Record<string, DayData> {
	const map: Record<string, DayData> = {}
	seizures.forEach(s => {
		const d = new Date(s.startedAt)
		const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
		if (!map[key]) map[key] = { count: 0, maxSeverity: 0 }
		map[key].count++
		const sev = s.severity ?? 1
		if (sev > map[key].maxSeverity) map[key].maxSeverity = sev
	})
	return map
}

type CalEntry = {
	inMonth: boolean
	day?: number
	severity?: number
	count?: number
}

function buildMonthHtml(
	year: number,
	month: number,
	dayMap: Record<string, DayData>,
): string {
	const firstDay = new Date(year, month, 1)
	const daysInMonth = new Date(year, month + 1, 0).getDate()
	const startCol = (firstDay.getDay() + 6) % 7

	const entries: CalEntry[] = []
	for (let i = 0; i < startCol; i++) {
		entries.push({ inMonth: false })
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const key = `${year}-${month}-${day}`
		const data = dayMap[key]
		entries.push({
			inMonth: true,
			day,
			severity: data?.maxSeverity,
			count: data?.count,
		})
	}
	while (entries.length % 7 !== 0) {
		entries.push({ inMonth: false })
	}

	const weeks: CalEntry[][] = []
	for (let i = 0; i < entries.length; i += 7) {
		weeks.push(entries.slice(i, i + 7))
	}

	const rowsHtml = weeks
		.map(week => {
			const numRow = week
				.map(e =>
					e.inMonth
						? `<td class="cal-num">${e.day}</td>`
						: `<td class="cal-num-empty"></td>`,
				)
				.join("")

			const cellRow = week
				.map(e => {
					if (!e.inMonth) return `<td class="cal-cell-empty"></td>`
					if (!e.count) return `<td class="cal-cell"></td>`
					const cls =
						e.severity === 3
							? "cal-severe"
							: e.severity === 2
								? "cal-medium"
								: "cal-light"
					return `<td class="cal-cell ${cls}"><span class="cal-count">${e.count}</span></td>`
				})
				.join("")

			return `<tr class="cal-num-row">${numRow}</tr><tr class="cal-cell-row">${cellRow}</tr>`
		})
		.join("")

	return `
    <div class="month-block">
      <h4 class="month-title">${i18n.t(`month.${month + 1}`)} ${year}</h4>
      <table class="calendar">
        <thead>
          <tr>
            <th>${i18n.t("history.dayMon")}</th><th>${i18n.t("history.dayTue")}</th><th>${i18n.t("history.dayWed")}</th><th>${i18n.t("history.dayThu")}</th><th>${i18n.t("history.dayFri")}</th><th>${i18n.t("history.daySat")}</th><th>${i18n.t("history.daySun")}</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `
}

function buildCalendarHtml(
	seizures: Seizure[],
	from: number,
	to: number,
): string {
	if (seizures.length === 0) return ""

	const dayMap = buildDayMap(seizures)

	const months: { year: number; month: number }[] = []
	const cursor = new Date(from)
	cursor.setDate(1)
	const end = new Date(to)
	while (
		cursor.getFullYear() < end.getFullYear() ||
		(cursor.getFullYear() === end.getFullYear() &&
			cursor.getMonth() <= end.getMonth())
	) {
		months.push({ year: cursor.getFullYear(), month: cursor.getMonth() })
		cursor.setMonth(cursor.getMonth() + 1)
	}

	return months.map(m => buildMonthHtml(m.year, m.month, dayMap)).join("")
}

async function generateTableRows(
	seizures: Seizure[],
	includeQr: boolean,
): Promise<string> {
	const rowClass = includeQr ? "cols-with-video with-qr-cell" : "cols-no-video"
	const rows = await Promise.all(
		seizures.map(async s => {
			let qrCell = ""
			if (includeQr) {
				if (s.videoUrl) {
					try {
						const qrSvg = (await QRCode.toString(s.videoUrl, {
							type: "svg",
							width: 80,
							margin: 0,
							color: { dark: "#4A90E2", light: "#ffffff" },
						})) as string
						qrCell = `<div><img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}" alt="QR" style="width: 60px; height: 60px;"/></div>`
					} catch {
						qrCell = `<div><span style="font-size: 9px; color: #4A90E2;">🎥</span></div>`
					}
				} else {
					qrCell = `<div></div>`
				}
			}

			return `
      <div class="data-row ${rowClass}">
        <div>${formatDate(s.startedAt)}</div>
        <div>${formatTime(s.startedAt)}</div>
        <div>${formatDuration(s.durationSeconds)}</div>
        <div>${getTypeLabel(s)}</div>
        <div>${getSeverityLabel(s.severity)}</div>
        <div>${getTriggers(s)}</div>
        <div>${(s.description ?? "—").substring(0, 150)}</div>
        ${qrCell}
      </div>
    `
		}),
	)
	return rows.join("")
}

export async function generateSeizureReportHtml(
	user: User,
	medications: Medication[],
	seizures: Seizure[],
	from: number,
	to: number,
): Promise<string> {
	const stats = getStats(seizures)
	const patientName = getPatientName(user)

	const seizuresWithVideo = seizures.filter(s => s.videoUrl)
	const seizuresWithoutVideo = seizures.filter(s => !s.videoUrl)

	const [rowsWithVideo, rowsWithoutVideo] = await Promise.all([
		generateTableRows(seizuresWithVideo, true),
		generateTableRows(seizuresWithoutVideo, false),
	])

	const calendarHtml = buildCalendarHtml(seizures, from, to)
	const medicationsHtml = buildMedicationsHtml(medications)

	return htmlReport(
		user,
		from,
		to,
		formatDate,
		stats,
		rowsWithVideo,
		rowsWithoutVideo,
		patientName,
		calendarHtml,
		medicationsHtml,
	)
}
