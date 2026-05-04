import { Seizure } from "@/models/seizure"

export type HistoryPeriod = "month" | "3months" | "6months" | "year"

export function getMonthsInRange(
	from: number,
	to: number,
): { year: number; month: number }[] {
	const result: { year: number; month: number }[] = []
	const start = new Date(from)
	const end = new Date(to)
	start.setDate(1)
	end.setDate(1)
	const cur = new Date(start)
	while (cur <= end) {
		result.push({ year: cur.getFullYear(), month: cur.getMonth() })
		cur.setMonth(cur.getMonth() + 1)
	}
	return result
}

export function getDaysInMonth(year: number, month: number): (number | null)[] {
	const firstDay = new Date(year, month, 1)
	const lastDay = new Date(year, month + 1, 0)
	// Mon=0, Sun=6
	const startDow = (firstDay.getDay() + 6) % 7
	const days: (number | null)[] = []
	for (let i = 0; i < startDow; i++) days.push(null)
	for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
	return days
}

export function makeDateKey(year: number, month: number, day: number): string {
	return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function maxSeverityColor(
	seizures: Seizure[],
	palette: Record<1 | 2 | 3, string>,
): string | null {
	if (!seizures?.length) return null
	const max = Math.max(...seizures.map(s => s.severity ?? 0)) as 1 | 2 | 3
	return palette[max] ?? "#999"
}

export function polarToCartesian(
	cx: number,
	cy: number,
	r: number,
	deg: number,
) {
	const rad = ((deg - 90) * Math.PI) / 180
	return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export function slicePath(
	cx: number,
	cy: number,
	outerR: number,
	innerR: number,
	startDeg: number,
	endDeg: number,
): string {
	const gap = 2
	const s = startDeg + gap / 2
	const e = endDeg - gap / 2
	if (e - s < 1) return ""
	const large = e - s > 180 ? 1 : 0
	const o1 = polarToCartesian(cx, cy, outerR, s)
	const o2 = polarToCartesian(cx, cy, outerR, e)
	const i1 = polarToCartesian(cx, cy, innerR, s)
	const i2 = polarToCartesian(cx, cy, innerR, e)
	return [
		`M ${o1.x} ${o1.y}`,
		`A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
		`L ${i2.x} ${i2.y}`,
		`A ${innerR} ${innerR} 0 ${large} 0 ${i1.x} ${i1.y}`,
		"Z",
	].join(" ")
}

export function getPeriodRange(period: HistoryPeriod): {
	from: number
	to: number
} {
	const to = new Date()
	to.setHours(23, 59, 59, 999)
	const from = new Date()
	from.setHours(0, 0, 0, 0)
	switch (period) {
		case "month":
			from.setDate(from.getDate() - 29)
			break
		case "3months":
			from.setMonth(from.getMonth() - 3)
			break
		case "6months":
			from.setMonth(from.getMonth() - 6)
			break
		case "year":
			from.setFullYear(from.getFullYear() - 1)
			break
	}
	return { from: from.getTime(), to: to.getTime() }
}
