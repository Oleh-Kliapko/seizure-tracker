// components/dashboard/DashboardRecentSeizures.tsx

import { SEVERITY_LABELS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { router } from "expo-router"
import { format } from "date-fns"
import { enUS, uk } from "date-fns/locale"
import { ChevronRight } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizures: Seizure[]
}


export function DashboardRecentSeizures({ seizures }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t, i18n } = useTranslation()
	const dateFnsLocale = i18n.language === "uk" ? uk : enUS

	return (
		<View style={styles.sectionCard}>
			<Text style={styles.recentSectionLabel}>{t("dashboard.recentSeizures")}</Text>

			{seizures.map((s, i) => {
				const date = format(new Date(s.startedAt), "d MMM", { locale: dateFnsLocale })
				const time = format(new Date(s.startedAt), "HH:mm")
				const severity = s.severity ? t(SEVERITY_LABELS[s.severity]) : "—"
				const severityColor = s.severity === 1
				? theme.colors.success
				: s.severity === 2
					? theme.colors.warning
					: s.severity === 3
						? theme.colors.error
						: theme.colors.textSecondary

				return (
					<View key={s.id}>
						{i > 0 && <View style={styles.divider} />}
						<TouchableOpacity
							onPress={() => router.push(`/(tabs)/seizures/${s.id}` as any)}
							activeOpacity={0.7}
							style={styles.seizureRow}
						>
							<Text style={styles.seizureDate}>{date}</Text>
							<Text style={styles.seizureTime}>{time}</Text>
							<Text style={[styles.seizureSeverity, { color: severityColor }]}>{severity}</Text>
							<ChevronRight size={16} color={theme.colors.textSecondary} />
						</TouchableOpacity>
					</View>
				)
			})}

			<View style={styles.divider} />

			<TouchableOpacity
				onPress={() => router.push("/(tabs)/seizures")}
				activeOpacity={0.7}
				style={styles.allSeizuresRow}
			>
				<Text style={styles.allSeizuresText}>{t("dashboard.allSeizures")}</Text>
				<ChevronRight size={16} color={theme.colors.primary} />
			</TouchableOpacity>
		</View>
	)
}
