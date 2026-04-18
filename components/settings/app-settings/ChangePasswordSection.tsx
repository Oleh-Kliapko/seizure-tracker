// components/settings/app-settings/ChangePasswordSection.tsx

import { useAppTheme } from "@/hooks"
import { auth } from "@/config/firebase"
import { ChevronRight, Lock } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { router } from "expo-router"

export function ChangePasswordSection() {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const isPasswordUser = auth.currentUser?.providerData.some(
		p => p.providerId === "password",
	)

	if (!isPasswordUser) return null

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>Безпека</Text>
			<TouchableOpacity
				style={styles.settingsRow}
				onPress={() => router.push("/(tabs)/settings/change-password")}
				activeOpacity={0.7}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
					<Lock size={20} color={theme.colors.primary} />
					<Text style={styles.settingsRowTitle}>Змінити пароль</Text>
				</View>
				<ChevronRight size={20} color={theme.colors.textSecondary} />
			</TouchableOpacity>
		</View>
	)
}
