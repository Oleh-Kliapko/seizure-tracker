// components/settings/app-settings/ThemeSelector.tsx

import { THEMES } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { AppThemeMode } from "@/models/user"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	value: AppThemeMode
	onChange: (v: AppThemeMode) => void
}

export function ThemeSelector({ value, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>Тема</Text>
			{THEMES.map(t => (
				<TouchableOpacity
					key={t.value}
					style={styles.themeOption}
					onPress={() => onChange(t.value)}
					activeOpacity={0.7}
				>
					<View
						style={[
							styles.radioCircle,
							value === t.value && styles.radioCircleActive,
						]}
					>
						{value === t.value && <View style={styles.radioDot} />}
					</View>
					<Text
						style={[
							styles.themeOptionLabel,
							value === t.value && styles.themeOptionLabelActive,
						]}
					>
						{t.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
