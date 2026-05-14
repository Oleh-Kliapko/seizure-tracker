// components/history/HistoryCalendar.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { getMonthsInRange } from "@/utils/historyHelpers"
import { ChevronDown, ChevronRight } from "lucide-react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Pressable, Text, View } from "react-native"
import { getStyles } from "./getStyles"
import { HistoryCalendarMonth } from "./HistoryCalendarMonth"

type Props = {
	seizuresByDate: Record<string, Seizure[]>
	from: number
	to: number
	onDayPress?: (dateKey: string) => void
}

export function HistoryCalendar({ seizuresByDate, from, to, onDayPress }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { colors, fonts, fontSize, spacing } = theme
	const { t } = useTranslation()

	const months = getMonthsInRange(from, to)
	const today = new Date()
	const dayNames = [
		t("history.dayMon"), t("history.dayTue"), t("history.dayWed"),
		t("history.dayThu"), t("history.dayFri"), t("history.daySat"), t("history.daySun"),
	]

	// Group months by year
	const byYear = new Map<number, number[]>()
	months.forEach(({ year, month }) => {
		if (!byYear.has(year)) byYear.set(year, [])
		byYear.get(year)!.push(month)
	})
	const years = Array.from(byYear.keys()).sort((a, b) => a - b)

	const [expandedYears, setExpandedYears] = useState<Set<number>>(() => new Set())

	const toggleYear = (year: number) =>
		setExpandedYears(prev => {
			const next = new Set(prev)
			if (next.has(year)) next.delete(year)
			else next.add(year)
			return next
		})

	const palette = theme.calendarSeverityColors

	return (
		<View style={styles.calendarContainer}>
			<View style={{ flexDirection: "row", gap: 12, marginBottom: spacing.sm, flexWrap: "wrap" }}>
				{([1, 2, 3] as const).map(sev => (
					<View key={sev} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: palette[sev] }} />
						<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.xs, color: colors.textSecondary }}>
							{t(`severity.${sev}`)}
						</Text>
					</View>
				))}
			</View>

			{years.map(year => {
				const isExpanded = expandedYears.has(year)
				return (
					<View key={year}>
						<Pressable style={styles.yearHeader} onPress={() => toggleYear(year)}>
							<Text style={styles.yearHeaderText}>{year}</Text>
							{isExpanded
								? <ChevronDown size={18} color={theme.colors.textSecondary} />
								: <ChevronRight size={18} color={theme.colors.textSecondary} />
							}
						</Pressable>
						{isExpanded && (
							<View style={styles.yearMonths}>
								{byYear.get(year)!.map(month => (
									<HistoryCalendarMonth
										key={`${year}-${month}`}
										year={year}
										month={month}
										seizuresByDate={seizuresByDate}
										today={today}
										dayNames={dayNames}
										onDayPress={onDayPress}
									/>
								))}
							</View>
						)}
					</View>
				)
			})}
		</View>
	)
}
