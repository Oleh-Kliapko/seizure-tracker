// components/dashboard/DashboardStats.tsx

import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	thisMonthCount: number
	lastMonthCount: number
	thisMonthAvgPerDay: number
	lastMonthAvgPerDay: number
}

export function DashboardStats({
	thisMonthCount,
	lastMonthCount,
	thisMonthAvgPerDay,
	lastMonthAvgPerDay,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	function trendLabel(
		currentAvg: number,
		previousAvg: number,
	): { text: string; color: string } | null {
		if (previousAvg === 0 && currentAvg === 0) return null
		if (previousAvg === 0) return null
		const diff = currentAvg - previousAvg
		const pct = Math.round(Math.abs(diff / previousAvg) * 100)
		if (pct === 0) return { text: t("dashboard.noChange"), color: "#888" }
		if (diff > 0) return { text: `↑ +${pct}%`, color: "#e53935" }
		return { text: `↓ −${pct}%`, color: "#43a047" }
	}

	const trend = trendLabel(thisMonthAvgPerDay, lastMonthAvgPerDay)

	return (
		<View style={styles.statsRow}>
			<View style={styles.statsCard}>
				<Text style={styles.statsLabel}>{t("dashboard.thisMonth")}</Text>
				<View style={styles.statsInnerRow}>
					<View style={styles.statsInnerCol}>
						<Text style={styles.statsCount}>{thisMonthCount}</Text>
					</View>
					<View style={styles.statsInnerDivider} />
					<View style={styles.statsInnerCol}>
						<Text style={styles.statsCountSmall}>{thisMonthAvgPerDay}</Text>
						<Text style={styles.statsUnit}>{t("dashboard.perDay")}</Text>
					</View>
				</View>
				{trend && (
					<Text style={[styles.statsTrend, { color: trend.color }]}>
						{trend.text}
					</Text>
				)}
			</View>

			<View style={styles.statsCard}>
				<Text style={styles.statsLabel}>{t("dashboard.lastMonth")}</Text>
				<View style={styles.statsInnerRow}>
					<View style={styles.statsInnerCol}>
						<Text style={styles.statsCount}>{lastMonthCount}</Text>
					</View>
					<View style={styles.statsInnerDivider} />
					<View style={styles.statsInnerCol}>
						<Text style={styles.statsCountSmall}>{lastMonthAvgPerDay}</Text>
						<Text style={styles.statsUnit}>{t("dashboard.perDay")}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}
