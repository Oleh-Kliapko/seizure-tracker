// components/history/HistoryTriggerBars.tsx

import { useAppTheme } from "@/hooks"
import { TriggerStat } from "@/hooks/useHistoryData"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	data: TriggerStat[]
}

function TriggerBarRow({ item, max }: { item: TriggerStat; max: number }) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View>
			<View style={styles.triggerLabelRow}>
				<Text style={styles.triggerLabel}>{item.label}</Text>
				<Text style={styles.triggerCount}>{item.count}</Text>
			</View>
			<View style={styles.triggerBarBg}>
				<View
					style={[
						styles.triggerBarFill,
						{ width: `${(item.count / max) * 100}%`, backgroundColor: theme.colors.primary },
					]}
				/>
			</View>
		</View>
	)
}

export function HistoryTriggerBars({ data }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	if (data.length === 0) {
		return (
			<View style={styles.emptyState}>
				<Text style={styles.emptyStateText}>{t("history.noTriggers")}</Text>
			</View>
		)
	}

	const max = data[0].count

	return (
		<View style={styles.triggerList}>
			{data.map((item, i) => (
				<TriggerBarRow key={`${item.label}-${i}`} item={item} max={max} />
			))}
		</View>
	)
}
