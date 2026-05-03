// components/settings/app-settings/ChangePasswordSection.tsx

import { auth } from "@/config/firebase"
import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { ChevronRight, Lock } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

export function ChangePasswordSection() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const isPasswordUser = auth.currentUser?.providerData.some(
		p => p.providerId === "password",
	)
	const isGoogleOnlyUser =
		!isPasswordUser &&
		auth.currentUser?.providerData.some(p => p.providerId === "google.com")

	if (!isPasswordUser && !isGoogleOnlyUser) return null

	const label = isGoogleOnlyUser ? t('settings.setPassword') : t('settings.changePassword')
	const route = isGoogleOnlyUser
		? "/(tabs)/settings/set-password"
		: "/(tabs)/settings/change-password"

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>{t('settings.security')}</Text>
			<TouchableOpacity
				style={styles.settingsRow}
				onPress={() => router.push(route as any)}
				activeOpacity={0.7}
			>
				<View style={styles.iconRow}>
					<Lock size={20} color={theme.colors.primary} />
					<Text style={styles.settingsRowTitle}>{label}</Text>
				</View>
				<ChevronRight size={20} color={theme.colors.textSecondary} />
			</TouchableOpacity>
		</View>
	)
}
