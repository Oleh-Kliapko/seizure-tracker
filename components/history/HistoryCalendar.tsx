// components/history/HistoryCalendar.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { getMonthsInRange } from "@/utils/historyHelpers"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { getStyles } from "./getStyles"
import { HistoryCalendarMonth } from "./HistoryCalendarMonth"

type Props = {
	seizuresByDate: Record<string, Seizure[]>
	from: number
	to: number
}

export function HistoryCalendar({ seizuresByDate, from, to }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const months = getMonthsInRange(from, to)
	const today = new Date()
	const dayNames = [
		t("history.dayMon"), t("history.dayTue"), t("history.dayWed"),
		t("history.dayThu"), t("history.dayFri"), t("history.daySat"), t("history.daySun"),
	]

	return (
		<View style={styles.calendarContainer}>
			{months.map(({ year, month }) => (
				<HistoryCalendarMonth
					key={`${year}-${month}`}
					year={year}
					month={month}
					seizuresByDate={seizuresByDate}
					today={today}
					dayNames={dayNames}
				/>
			))}
		</View>
	)
}
