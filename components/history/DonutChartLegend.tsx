// components/history/DonutChartLegend.tsx

import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type LegendItem = {
	key: string
	label: string
	color: string
}

type Props = {
	items: LegendItem[]
}

export function DonutChartLegend({ items }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.donutLegend}>
			{items.map(item => (
				<View key={item.key} style={styles.donutLegendItem}>
					<View style={[styles.donutLegendDot, { backgroundColor: item.color }]} />
					<Text style={styles.donutLegendText}>{item.label}</Text>
				</View>
			))}
		</View>
	)
}
