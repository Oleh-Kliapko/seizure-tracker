// components/history/HistoryCalendarMonth.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { getDaysInMonth, makeDateKey, maxSeverityColor } from "@/utils/historyHelpers"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	year: number
	month: number
	seizuresByDate: Record<string, Seizure[]>
	today: Date
	dayNames: string[]
}

export function HistoryCalendarMonth({ year, month, seizuresByDate, today, dayNames }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const days = getDaysInMonth(year, month)
	const palette = theme.calendarSeverityColors

	return (
		<View style={styles.monthCard}>
			<Text style={styles.monthTitle}>
				{t(`month.${month + 1}`)} {year}
			</Text>

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

					return (
						<View key={key} style={styles.dayCellOuter}>
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

							{daySeizures?.length >= 1 && (
								<View style={[styles.seizureBadge, { backgroundColor: color! }]}>
									<Text style={styles.seizureBadgeText}>{daySeizures.length}</Text>
								</View>
							)}
						</View>
					)
				})}
			</View>
		</View>
	)
}
