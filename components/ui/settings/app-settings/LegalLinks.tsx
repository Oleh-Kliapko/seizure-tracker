// components/settings/app-settings/LegalLinks.tsx

import { LINKS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { ChevronRight } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

export function LegalLinks() {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const handlePress = (key: string) => {
		// TODO: відкрити відповідну сторінку або WebView
	}

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>Інформація</Text>
			{LINKS.map((link, index) => (
				<View key={link.key}>
					<TouchableOpacity
						style={styles.legalLink}
						onPress={() => handlePress(link.key)}
						activeOpacity={0.7}
					>
						<Text style={styles.legalLinkText}>{link.label}</Text>
						<ChevronRight size={20} color={theme.colors.textSecondary} />
					</TouchableOpacity>
					{index < LINKS.length - 1 && <View style={styles.settingsDivider} />}
				</View>
			))}
		</View>
	)
}
