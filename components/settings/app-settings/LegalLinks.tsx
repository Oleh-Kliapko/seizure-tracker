// components/settings/app-settings/LegalLinks.tsx

import { LINKS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { ChevronRight } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Linking, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

export function LegalLinks() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const handlePress = (url: string) => {
		Linking.openURL(url)
	}

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>
				{t("settings.information")}
			</Text>
			{LINKS.map((link, index) => (
				<View key={link.key}>
					<TouchableOpacity
						style={styles.legalLink}
						onPress={() => handlePress(link.url)}
						activeOpacity={0.7}
					>
						<Text style={styles.legalLinkText}>{t(link.labelKey)}</Text>
						<ChevronRight size={20} color={theme.colors.textSecondary} />
					</TouchableOpacity>
					{index < LINKS.length - 1 && <View style={styles.settingsDivider} />}
				</View>
			))}
		</View>
	)
}
