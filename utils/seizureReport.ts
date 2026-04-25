// utils/seizureReport.ts

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	SEIZURE_TYPES,
	SEVERITY_LABELS,
} from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { User } from "@/models/user"
import QRCode from "qrcode"
import { htmlReport } from "./seizureReportHtml"

function formatDate(ts: number): string {
	return new Date(ts).toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

function formatTime(ts: number): string {
	return new Date(ts).toLocaleTimeString("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
	})
}

function formatDuration(start: number, end?: number): string {
	if (!end) return "—"
	const mins = Math.round((end - start) / 60000)
	if (mins < 60) return `${mins} хв`
	const h = Math.floor(mins / 60)
	const m = mins % 60
	return m > 0 ? `${h} год ${m} хв` : `${h} год`
}

function getTypeLabel(seizure: Seizure): string {
	if (seizure.type === "custom") return "Unknown"
	return (
		SEIZURE_TYPES.find(t => t.value === seizure.type)?.label ?? seizure.type
	)
}

function getTriggers(seizure: Seizure): string {
	const internal = (seizure.internalTriggers ?? []).map(
		t => INTERNAL_TRIGGERS.find(i => i.value === t.type)?.label ?? t.type,
	)
	const external = (seizure.externalTriggers ?? []).map(
		t => EXTERNAL_TRIGGERS.find(e => e.value === t.type)?.label ?? t.type,
	)
	return [...internal, ...external].join(", ") || "—"
}

function getSeverityLabel(severity?: number): string {
	if (!severity) return "—"
	return SEVERITY_LABELS[severity as keyof typeof SEVERITY_LABELS] ?? "—"
}

function getStats(seizures: Seizure[]) {
	const total = seizures.length
	const withDuration = seizures.filter(s => s.endedAt)
	const avgDuration = withDuration.length
		? Math.round(
				withDuration.reduce(
					(acc, s) => acc + (s.endedAt! - s.startedAt) / 60000,
					0,
				) / withDuration.length,
			)
		: 0

	const severe = seizures.filter(s => s.severity === 3).length
	const medium = seizures.filter(s => s.severity === 2).length
	const light = seizures.filter(s => s.severity === 1).length

	// Найчастіші тригери
	const triggerCount: Record<string, number> = {}
	seizures.forEach(s => {
		;(s.internalTriggers ?? []).forEach(t => {
			const label =
				INTERNAL_TRIGGERS.find(i => i.value === t.type)?.label ?? t.type
			triggerCount[label] = (triggerCount[label] ?? 0) + 1
		})
		;(s.externalTriggers ?? []).forEach(t => {
			const label =
				EXTERNAL_TRIGGERS.find(e => e.value === t.type)?.label ?? t.type
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

const MONTH_NAMES_UK = [
	"Січень",
	"Лютий",
	"Березень",
	"Квітень",
	"Травень",
	"Червень",
	"Липень",
	"Серпень",
	"Вересень",
	"Жовтень",
	"Листопад",
	"Грудень",
]

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
      <h4 class="month-title">${MONTH_NAMES_UK[month]} ${year}</h4>
      <table class="calendar">
        <thead>
          <tr>
            <th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Нд</th>
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
	const rows = await Promise.all(
		seizures.map(async s => {
			let qrCell = ""
			if (includeQr && s.videoUrl) {
				try {
					const qrSvg = await QRCode.toString(s.videoUrl, {
						type: "image/svg+xml",
						width: 80,
						margin: 0,
						color: { dark: "#4A90E2", light: "#ffffff" },
					})
					qrCell = `<td style="text-align: center;"><img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}" alt="QR" style="width: 60px; height: 60px;"/></td>`
				} catch {
					qrCell = `<td style="text-align: center;"><span style="font-size: 9px; color: #4A90E2;">🎥</span></td>`
				}
			}

			return `
      <tr>
        <td>${formatDate(s.startedAt)}</td>
        <td>${formatTime(s.startedAt)}</td>
        <td>${formatDuration(s.startedAt, s.endedAt)}</td>
        <td>${getTypeLabel(s)}</td>
        <td>${getSeverityLabel(s.severity)}</td>
        <td>${getTriggers(s)}</td>
        <td>${(s.description ?? "—").substring(0, 150)}</td>
        ${qrCell}
      </tr>
    `
		}),
	)
	return rows.join("")
}

export async function generateSeizureReportHtml(
	user: User,
	seizures: Seizure[],
	from: number,
	to: number,
): Promise<string> {
	const stats = getStats(seizures)
	const patientName =
		[user.lastName, user.firstName, user.middleName]
			.filter(Boolean)
			.join(" ") || user.displayName

	const seizuresWithVideo = seizures.filter(s => s.videoUrl)
	const seizuresWithoutVideo = seizures.filter(s => !s.videoUrl)

	const [rowsWithVideo, rowsWithoutVideo] = await Promise.all([
		generateTableRows(seizuresWithVideo, true),
		generateTableRows(seizuresWithoutVideo, false),
	])

	const calendarHtml = buildCalendarHtml(seizures, from, to)

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
	)
}
