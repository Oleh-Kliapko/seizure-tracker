// components/history/HistoryCalendarMonth.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { MonthStats, getDaysInMonth, makeDateKey, maxSeverityColor } from "@/utils/historyHelpers"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	year: number
	month: number
	seizuresByDate: Record<string, Seizure[]>
	today: Date
	dayNames: string[]
	from: number
	to: number
	stats: MonthStats
	prevStats?: MonthStats
	onDayPress?: (dateKey: string) => void
}

export function HistoryCalendarMonth({ year, month, seizuresByDate, today, dayNames, from, to, stats, prevStats, onDayPress }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { colors, fonts, fontSize, spacing } = theme
	const { t } = useTranslation()
	const days = getDaysInMonth(year, month)
	const palette = theme.calendarSeverityColors

	const fromDay = new Date(from)
	const toDay = new Date(to)
	const fromStart = new Date(fromDay.getFullYear(), fromDay.getMonth(), fromDay.getDate()).getTime()
	const toStart = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate()).getTime()

	const hasPrev = prevStats !== undefined
	const totalTrend = hasPrev && prevStats!.total > 0
		? Math.round(((stats.total - prevStats!.total) / prevStats!.total) * 100)
		: null
	const trendColor = totalTrend !== null
		? (totalTrend > 0 ? colors.error : colors.success)
		: colors.textSecondary

	const severityKeys = [1, 2, 3] as const
	const severityLabelKeys = ["seizure.statsLight", "seizure.statsMedium", "seizure.statsHeavy"] as const

	return (
		<View style={styles.monthCard}>
			<Text style={[styles.monthTitle, { marginBottom: 4 }]}>
				{t(`month.${month + 1}`)} {year}
			</Text>

			{stats.total > 0 && (
				<View style={styles.typeChipsRow}>
					{severityKeys.map((sev, i) => {
						const count = stats.bySeverity[sev]
						return (
							<View key={sev} style={styles.typeChip}>
								<Text style={styles.typeChipText}>
									{t(severityLabelKeys[i])}: {count}
								</Text>
							</View>
						)
					})}
					<View style={styles.typeChip}>
						<Text style={styles.typeChipText}>
							{t("seizure.statsTotal")}: {stats.total}
						</Text>
					</View>
					{totalTrend !== null && (
						<View style={[styles.trendBadge, { backgroundColor: trendColor + "20" }]}>
							<Text style={[styles.trendText, { color: trendColor }]}>
								{totalTrend > 0 ? "+" : ""}{totalTrend}%
							</Text>
						</View>
					)}
				</View>
			)}

			<View style={styles.dayNamesRow}>
				{dayNames.map(d => (
					<View key={d} style={styles.dayNameCell}>
						<Text style={styles.dayNameText}>{d}</Text>
					</View>
				))}
			</View>

			<View style={styles.daysGrid}>
				{days.map((day, i) => {
					if (day === null) {
						return <View key={`empty-${i}`} style={styles.dayCellOuter} />
					}

					const key = makeDateKey(year, month, day)
					const daySeizures = seizuresByDate[key]
					const color = maxSeverityColor(daySeizures, palette)
					const isToday =
						today.getFullYear() === year &&
						today.getMonth() === month &&
						today.getDate() === day

					const dayStart = new Date(year, month, day).getTime()
					const inRange = dayStart >= fromStart && dayStart <= toStart
					const hasSeizures = (daySeizures?.length ?? 0) >= 1
					const cellContent = (
						<>
							<View
								style={[
									styles.dayCellInner,
									{
										backgroundColor: color ? `${color}25` : "transparent",
										borderWidth: isToday ? 1.5 : 0,
										borderColor: isToday ? theme.colors.primary : "transparent",
									},
								]}
							>
								<Text
									style={[
										styles.dayNumber,
										{
											fontFamily: color ? theme.fonts.medium : theme.fonts.regular,
											color: color ?? theme.colors.onSurface,
										},
									]}
								>
									{day}
								</Text>
							</View>

							{hasSeizures && (
								<View style={[styles.seizureBadge, { backgroundColor: color! }]}>
									<Text style={styles.seizureBadgeText}>{daySeizures.length}</Text>
								</View>
							)}
						</>
					)

					return hasSeizures && onDayPress && inRange ? (
						<TouchableOpacity
							key={key}
							style={[styles.dayCellOuter, !inRange && { opacity: 0.25 }]}
							onPress={() => onDayPress(key)}
							activeOpacity={0.65}
						>
							{cellContent}
						</TouchableOpacity>
					) : (
						<View key={key} style={[styles.dayCellOuter, !inRange && { opacity: 0.25 }]}>
							{cellContent}
						</View>
					)
				})}
			</View>
		</View>
	)
}
