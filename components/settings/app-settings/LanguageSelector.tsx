// components/settings/app-settings/LanguageSelector.tsx

import { setAppLanguage } from "@/config/i18n"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

const LANGUAGES = [
	{ value: "uk" as const, label: "Українська" },
	{ value: "en" as const, label: "English" },
]

export function LanguageSelector() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t, i18n } = useTranslation()

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>{t("settings.language")}</Text>
			{LANGUAGES.map(lang => {
				const active = i18n.language === lang.value
				return (
					<TouchableOpacity
						key={lang.value}
						style={styles.themeOption}
						onPress={() => setAppLanguage(lang.value)}
						activeOpacity={0.7}
					>
						<View
							style={[styles.radioCircle, active && styles.radioCircleActive]}
						>
							{active && <View style={styles.radioDot} />}
						</View>
						<Text
							style={[
								styles.themeOptionLabel,
								active && styles.themeOptionLabelActive,
							]}
						>
							{lang.label}
						</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
