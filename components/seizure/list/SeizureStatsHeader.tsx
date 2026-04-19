// components/seizure/list/SeizureStatsHeader.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizures: Seizure[]
}

export function SeizureStatsHeader({ seizures }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const total = seizures.length
	const severe = seizures.filter(s => s.severity === 3).length
	const medium = seizures.filter(s => s.severity === 2).length
	const light = seizures.filter(s => s.severity === 1).length

	return (
		<View style={styles.statsCard}>
			<View style={styles.statItem}>
				<Text style={styles.statValue}>{total}</Text>
				<Text style={styles.statLabel}>Всього</Text>
			</View>
			<View style={styles.statDivider} />
			<View style={styles.statItem}>
				<Text style={[styles.statValue, { color: theme.seizureColors.light }]}>
					{light}
				</Text>
				<Text style={styles.statLabel}>Легких</Text>
			</View>
			<View style={styles.statDivider} />
			<View style={styles.statItem}>
				<Text style={[styles.statValue, { color: theme.seizureColors.medium }]}>
					{medium}
				</Text>
				<Text style={styles.statLabel}>Середніх</Text>
			</View>
			<View style={styles.statDivider} />
			<View style={styles.statItem}>
				<Text style={[styles.statValue, { color: theme.seizureColors.severe }]}>
					{severe}
				</Text>
				<Text style={styles.statLabel}>Важких</Text>
			</View>
		</View>
	)
}
