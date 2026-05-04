// components/dashboard/DashboardStats.tsx

import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	thisMonthCount: number
	lastMonthCount: number
}

export function DashboardStats({ thisMonthCount, lastMonthCount }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	function trendLabel(
		current: number,
		previous: number,
	): { text: string; color: string } | null {
		if (previous === 0 && current === 0) return null
		if (previous === 0) return null
		const diff = current - previous
		const pct = Math.round(Math.abs(diff / previous) * 100)
		if (diff === 0) return { text: t("dashboard.noChange"), color: "#888" }
		if (diff > 0) return { text: `↑ +${pct}%`, color: "#e53935" }
		return { text: `↓ −${pct}%`, color: "#43a047" }
	}

	function seizureWord(n: number): string {
		if (n === 1) return t("dashboard.seizure_1")
		if (n >= 2 && n <= 4) return t("dashboard.seizure_2_4")
		return t("dashboard.seizure_other")
	}

	const trend = trendLabel(thisMonthCount, lastMonthCount)

	return (
		<View style={styles.statsRow}>
			<View style={styles.statsCard}>
				<Text style={styles.statsLabel}>{t("dashboard.thisMonth")}</Text>
				<Text style={styles.statsCount}>{thisMonthCount}</Text>
				<Text style={styles.statsUnit}>{seizureWord(thisMonthCount)}</Text>
				{trend && (
					<Text style={[styles.statsTrend, { color: trend.color }]}>
						{trend.text}
					</Text>
				)}
			</View>

			<View style={styles.statsCard}>
				<Text style={styles.statsLabel}>{t("dashboard.lastMonth")}</Text>
				<Text style={styles.statsCount}>{lastMonthCount}</Text>
				<Text style={styles.statsUnit}>{seizureWord(lastMonthCount)}</Text>
			</View>
		</View>
	)
}
