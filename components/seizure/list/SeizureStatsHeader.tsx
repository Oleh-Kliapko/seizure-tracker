// components/seizure/list/SeizureStatsHeader.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizures: Seizure[]
}

type StatItem = {
	value: number
	labelKey: string
	color?: string
}

export function SeizureStatsHeader({ seizures }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const stats: StatItem[] = [
		{ value: seizures.length, labelKey: "seizure.statsTotal" },
		{
			value: seizures.filter(s => s.severity === 1).length,
			labelKey: "seizure.statsLight",
			color: theme.seizureColors.light,
		},
		{
			value: seizures.filter(s => s.severity === 2).length,
			labelKey: "seizure.statsMedium",
			color: theme.seizureColors.medium,
		},
		{
			value: seizures.filter(s => s.severity === 3).length,
			labelKey: "seizure.statsHeavy",
			color: theme.seizureColors.severe,
		},
	]

	return (
		<View style={styles.statsCard}>
			{stats.map((item, i) => (
				<Fragment key={item.labelKey}>
					<View style={styles.statItem}>
						<Text style={[styles.statValue, item.color ? { color: item.color } : undefined]}>
							{item.value}
						</Text>
						<Text style={styles.statLabel}>{t(item.labelKey)}</Text>
					</View>
					{i < stats.length - 1 && <View style={styles.statDivider} />}
				</Fragment>
			))}
		</View>
	)
}
