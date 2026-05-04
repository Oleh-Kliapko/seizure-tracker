// components/ui/AuthLanguageSwitcher.tsx

import { setAppLanguage } from "@/config/i18n"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { createAuthLanguageSwitcherStyles } from "./AuthLanguageSwitcher.styles"

const LANGUAGES = [
	{ value: "uk" as const, flag: "🇺🇦" },
	{ value: "en" as const, flag: "🇬🇧" },
]

export function AuthLanguageSwitcher() {
	const theme = useAppTheme()
	const styles = createAuthLanguageSwitcherStyles(theme)
	const { i18n } = useTranslation()

	return (
		<View style={styles.container}>
			{LANGUAGES.map(lang => {
				const active = i18n.language === lang.value
				return (
					<TouchableOpacity
						key={lang.value}
						onPress={() => setAppLanguage(lang.value)}
						activeOpacity={0.7}
						style={[
							styles.button,
							{ borderColor: theme.colors.border },
							active && {
								borderColor: theme.colors.primary,
								backgroundColor: theme.colors.primary + "20",
							},
						]}
					>
						<Text style={styles.flag}>{lang.flag}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}
