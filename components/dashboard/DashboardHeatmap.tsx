// components/dashboard/DashboardHeatmap.tsx

import { useAppTheme } from "@/hooks"
import { HeatmapDay } from "@/hooks/dashboard/useDashboard"
import { enUS, uk } from "date-fns/locale"
import { format } from "date-fns"
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

function dotColor(count: number, theme: ReturnType<typeof useAppTheme>): string {
	if (count === 0) return theme.colors.border
	if (count === 1) return theme.heatmapColors.low
	if (count === 2) return theme.heatmapColors.medium
	return theme.colors.error
}

type Props = {
	days: HeatmapDay[]
}

export function DashboardHeatmap({ days }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t, i18n } = useTranslation()
	const router = useRouter()
	const dateFnsLocale = i18n.language === "uk" ? uk : enUS

	const firstRow = days.slice(0, 15)
	const secondRow = days.slice(15)

	const firstDay = days[0]
		? format(new Date(days[0].dateStr), "d MMM", { locale: dateFnsLocale })
		: ""
	const lastDay = days[29]
		? format(new Date(days[29].dateStr), "d MMM", { locale: dateFnsLocale })
		: ""

	return (
		<View style={styles.heatmapCard}>
			<View style={styles.heatmapHeader}>
				<Text style={styles.heatmapTitle}>{t("dashboard.heatmapTitle")}</Text>
				<TouchableOpacity
					onPress={() => router.push("/(tabs)/history")}
					activeOpacity={0.7}
				>
					<Text style={styles.heatmapDetailsLink}>
						{t("dashboard.heatmapDetails")}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.heatmapGrid}>
				{[firstRow, secondRow].map((row, rowIdx) => (
					<View key={rowIdx} style={styles.heatmapRow}>
						{row.map(day => (
							<View
								key={day.dateStr}
								style={[
									styles.heatmapDot,
									{ backgroundColor: dotColor(day.count, theme) },
								]}
							/>
						))}
					</View>
				))}
			</View>

			<View style={styles.heatmapDates}>
				<Text style={styles.heatmapDate}>{firstDay}</Text>
				<Text style={styles.heatmapDate}>{lastDay}</Text>
			</View>
		</View>
	)
}
