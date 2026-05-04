import { Seizure } from "@/models/seizure"

export function getMonthsInRange(from: number, to: number): { year: number; month: number }[] {
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
