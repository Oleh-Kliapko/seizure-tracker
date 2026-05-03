// components/settings/app-settings/ThemeSelector.tsx

import { THEMES } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { AppThemeMode } from "@/models/user"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

type Props = {
	value: AppThemeMode
	onChange: (v: AppThemeMode) => void
}

export function ThemeSelector({ value, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>{t('settings.theme')}</Text>
			{THEMES.map(item => (
				<TouchableOpacity
					key={item.value}
					style={styles.themeOption}
					onPress={() => onChange(item.value)}
					activeOpacity={0.7}
				>
					<View
						style={[
							styles.radioCircle,
							value === item.value && styles.radioCircleActive,
						]}
					>
						{value === item.value && <View style={styles.radioDot} />}
					</View>
					<Text
						style={[
							styles.themeOptionLabel,
							value === item.value && styles.themeOptionLabelActive,
						]}
					>
						{t(item.labelKey)}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
