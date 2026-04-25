// utils/seizureReport.ts

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	SEIZURE_TYPES,
	SEVERITY_LABELS,
} from "@/constants/commonConstants"
import { Seizure } from "@/models"
import { User } from "@/models/user"
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

function getMoodEmoji(mood?: number): string {
	if (!mood) return "—"
	const emojis: Record<number, string> = {
		1: "дуже поганий",
		2: "поганий",
		3: "задовільний",
		4: "добрий",
		5: "відмінний",
	}
	return emojis[mood] ?? "—"
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

async function generateTableRows(seizures: Seizure[], includeQr: boolean): Promise<string> {
	const rows = seizures.map(s => {
		let qrCell = ""
		if (includeQr && s.videoUrl) {
			qrCell = `<td style="text-align: center; word-break: break-all;"><span style="font-size: 9px; color: #4A90E2;">🎥 ${s.videoUrl}</span></td>`
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
	})
	return rows.join("")
}

export function generateSeizureReportHtml(
	user: User,
	seizures: Seizure[],
	from: number,
	to: number,
): string {
	const stats = getStats(seizures)
	const patientName =
		[user.lastName, user.firstName, user.middleName]
			.filter(Boolean)
			.join(" ") || user.displayName

	const seizuresWithVideo = seizures.filter(s => s.videoUrl)
	const seizuresWithoutVideo = seizures.filter(s => !s.videoUrl)

	const rowsWithVideo = generateTableRows(seizuresWithVideo, true)
	const rowsWithoutVideo = generateTableRows(seizuresWithoutVideo, false)

	return htmlReport(
		user,
		from,
		to,
		formatDate,
		stats,
		rowsWithVideo,
		rowsWithoutVideo,
		patientName,
	)
}
