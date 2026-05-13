// components/history/HistoryPeriodFilter.tsx

import { useAppTheme } from "@/hooks"
import { HistoryPeriod, getPeriodRange } from "@/utils/historyHelpers"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

export type { HistoryPeriod }
export { getPeriodRange }

type PeriodItem = { labelKey: string; value: HistoryPeriod }

const PERIODS: PeriodItem[] = [
	{ labelKey: "history.month", value: "month" },
	{ labelKey: "history.threeMonths", value: "3months" },
	{ labelKey: "history.sixMonths", value: "6months" },
	{ labelKey: "history.year", value: "year" },
	{ labelKey: "history.allTime", value: "all" },
]

type Props = {
	active: HistoryPeriod
	onChange: (v: HistoryPeriod) => void
}

export function HistoryPeriodFilter({ active, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.periodFilterRow}>
			{PERIODS.map(p => (
				<TouchableOpacity
					key={p.value}
					onPress={() => onChange(p.value)}
					activeOpacity={0.7}
					style={[
						styles.periodBtn,
						{ backgroundColor: active === p.value ? theme.colors.primary : theme.colors.surface },
					]}
				>
					<Text style={[styles.periodBtnText, { color: active === p.value ? theme.colors.onPrimary : theme.colors.textSecondary }]}>
						{t(p.labelKey)}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
