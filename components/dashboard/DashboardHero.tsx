// components/dashboard/DashboardHero.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	lastSeizure: Seizure | null
	daysSinceLastSeizure: number | null
}

export function DashboardHero({ lastSeizure, daysSinceLastSeizure }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const isToday = daysSinceLastSeizure === 0

	const lastSeizureLabel = lastSeizure
		? format(new Date(lastSeizure.startedAt), "d MMM, HH:mm", { locale: uk })
		: null

	function daysWord(n: number): string {
		if (n === 1) return t("dashboard.day")
		if (n >= 2 && n <= 4) return t("dashboard.days_2_4")
		return t("dashboard.days_other")
	}

	return (
		<View style={styles.heroCard}>
			{lastSeizure === null ? (
				<Text style={styles.heroNoSeizures}>{t("dashboard.noSeizures")}</Text>
			) : (
				<>
					<Text style={styles.heroLabel}>
						{isToday ? t("dashboard.lastSeizure") : t("dashboard.noSeizuresLabel")}
					</Text>

					{isToday ? (
						<Text style={styles.heroToday}>{t("dashboard.today")}</Text>
					) : (
						<View style={styles.heroDaysRow}>
							<Text style={styles.heroDaysCount}>{daysSinceLastSeizure}</Text>
							<Text style={styles.heroDaysWord}>{daysWord(daysSinceLastSeizure!)}</Text>
						</View>
					)}

					<View style={styles.heroBadge}>
						<Text style={styles.heroBadgeText}>
							{t("dashboard.lastSeizure")} — {lastSeizureLabel}
						</Text>
					</View>
				</>
			)}
		</View>
	)
}
