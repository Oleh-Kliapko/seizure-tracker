import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

export function DashboardEmpty() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyTitle}>{t("dashboard.emptyTitle")}</Text>
			<Text style={styles.emptySubtitle}>{t("dashboard.emptySubtitle")}</Text>
			<TouchableOpacity
				onPress={() => router.push("/(tabs)/seizures/add")}
				activeOpacity={0.8}
				style={styles.emptyButton}
			>
				<Text style={styles.emptyButtonText}>{t("dashboard.addSeizure")}</Text>
			</TouchableOpacity>
		</View>
	)
}
