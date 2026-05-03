// components/ui/AuthLanguageSwitcher.tsx

import { setAppLanguage } from "@/config/i18n"
import { useAppTheme } from "@/hooks"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"

const LANGUAGES = [
	{ value: "uk" as const, flag: "🇺🇦" },
	{ value: "en" as const, flag: "🇬🇧" },
]

export function AuthLanguageSwitcher() {
	const theme = useAppTheme()
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
							active && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + "20" },
						]}
					>
						<Text style={styles.flag}>{lang.flag}</Text>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignSelf: "flex-end",
		gap: 8,
		marginBottom: 16,
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	flag: {
		fontSize: 20,
	},
})
