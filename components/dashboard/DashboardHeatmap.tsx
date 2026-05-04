// components/dashboard/DashboardHeatmap.tsx

import { useAppTheme } from "@/hooks"
import { HeatmapDay } from "@/hooks/useDashboard"
import { enUS, uk } from "date-fns/locale"
import { format } from "date-fns"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

function dotColor(count: number, colors: ReturnType<typeof useAppTheme>["colors"]): string {
	if (count === 0) return colors.border
	if (count === 1) return "#FFA726"
	if (count === 2) return "#FB8C00"
	return colors.error
}

type Props = {
	days: HeatmapDay[]
}

export function DashboardHeatmap({ days }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t, i18n } = useTranslation()
	const dateFnsLocale = i18n.language === "uk" ? uk : enUS

	const firstRow = days.slice(0, 15)
	const secondRow = days.slice(15)

	const firstDay = days[0] ? format(new Date(days[0].dateStr), "d MMM", { locale: dateFnsLocale }) : ""
	const lastDay = days[29] ? format(new Date(days[29].dateStr), "d MMM", { locale: dateFnsLocale }) : ""

	return (
		<View style={styles.heatmapCard}>
			<Text style={styles.heatmapTitle}>{t("dashboard.heatmapTitle")}</Text>

			<View style={styles.heatmapGrid}>
				{[firstRow, secondRow].map((row, rowIdx) => (
					<View key={rowIdx} style={styles.heatmapRow}>
						{row.map(day => (
							<View
								key={day.dateStr}
								style={[styles.heatmapDot, { backgroundColor: dotColor(day.count, theme.colors) }]}
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
