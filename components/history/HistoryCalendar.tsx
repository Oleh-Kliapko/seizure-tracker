// components/history/HistoryCalendar.tsx

import { useAppTheme, useIsDarkTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { Text, View } from "react-native"

type Props = {
	seizuresByDate: Record<string, Seizure[]>
	from: number
	to: number
}

const SEVERITY_COLORS_DARK: Record<number, string> = {
	1: "#FFCA28",
	2: "#F06292",
	3: "#7B1FA2",
}

const SEVERITY_COLORS_LIGHT: Record<number, string> = {
	1: "#E6A817",
	2: "#F06292",
	3: "#7B1FA2",
}

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]
const MONTH_NAMES = [
	"Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
	"Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
]

function getMonthsInRange(from: number, to: number): { year: number; month: number }[] {
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

function getDaysInMonth(year: number, month: number): (number | null)[] {
	const firstDay = new Date(year, month, 1)
	const lastDay = new Date(year, month + 1, 0)
	// Mon=0, Sun=6
	const startDow = (firstDay.getDay() + 6) % 7
	const days: (number | null)[] = []
	for (let i = 0; i < startDow; i++) days.push(null)
	for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
	return days
}

function makeDateKey(year: number, month: number, day: number): string {
	return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function maxSeverityColor(seizures: Seizure[], palette: Record<number, string>): string | null {
	if (!seizures?.length) return null
	const max = Math.max(...seizures.map(s => s.severity ?? 0))
	return palette[max] ?? "#999"
}

export function HistoryCalendar({ seizuresByDate, from, to }: Props) {
	const { colors, fonts, spacing, radius } = useAppTheme()
	const isDark = useIsDarkTheme()
	const severityColors = isDark ? SEVERITY_COLORS_DARK : SEVERITY_COLORS_LIGHT
	const months = getMonthsInRange(from, to)
	const today = new Date()

	return (
		<View style={{ gap: spacing.sm }}>
			{months.map(({ year, month }) => {
				const days = getDaysInMonth(year, month)
				return (
					<View
						key={`${year}-${month}`}
						style={{
							borderWidth: 1,
							borderColor: colors.border,
							borderRadius: radius.md,
							padding: spacing.sm,
						}}
					>
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: 12,
								color: colors.textSecondary,
								marginBottom: spacing.sm,
								textTransform: "uppercase",
								letterSpacing: 0.5,
							}}
						>
							{MONTH_NAMES[month]} {year}
						</Text>

						<View style={{ flexDirection: "row", marginBottom: 4 }}>
							{DAY_NAMES.map(d => (
								<View key={d} style={{ flex: 1, alignItems: "center" }}>
									<Text style={{ fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary }}>
										{d}
									</Text>
								</View>
							))}
						</View>

						<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
							{days.map((day, i) => {
								if (day === null) {
									return (
										<View
											key={`empty-${i}`}
											style={{ width: `${100 / 7}%`, height: 34 }}
										/>
									)
								}

								const key = makeDateKey(year, month, day)
								const daySeizures = seizuresByDate[key]
								const color = maxSeverityColor(daySeizures, severityColors)
								const isToday =
									today.getFullYear() === year &&
									today.getMonth() === month &&
									today.getDate() === day

								return (
									<View
										key={key}
										style={{
											width: `${100 / 7}%`,
											height: 34,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<View
											style={{
												width: 30,
												height: 30,
												borderRadius: 15,
												alignItems: "center",
												justifyContent: "center",
												backgroundColor: color ? `${color}25` : "transparent",
												borderWidth: isToday ? 1.5 : 0,
												borderColor: isToday ? colors.primary : "transparent",
											}}
										>
											<Text
												style={{
													fontFamily: color ? fonts.medium : fonts.regular,
													fontSize: 13,
													color: color ?? colors.onSurface,
												}}
											>
												{day}
											</Text>
										</View>
										{daySeizures?.length >= 1 && (
											<View
												style={{
													position: "absolute",
													top: 0,
													right: 2,
													width: 13,
													height: 13,
													borderRadius: 7,
													backgroundColor: color!,
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<Text style={{ fontSize: 8, color: "#fff", fontFamily: fonts.bold }}>
													{daySeizures.length}
												</Text>
											</View>
										)}
									</View>
								)
							})}
						</View>
					</View>
				)
			})}
		</View>
	)
}
