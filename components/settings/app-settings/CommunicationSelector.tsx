// components/settings/app-settings/CommunicationSelector.tsx

import { CHANNELS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { CommunicationChannel } from "@/models/user"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	value: CommunicationChannel
	onChange: (v: CommunicationChannel) => void
}

export function CommunicationSelector({ value, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>
				{t("settings.communicationChannel")}
			</Text>
			{CHANNELS.map(c => (
				<TouchableOpacity
					key={c.value}
					style={styles.themeOption}
					onPress={() => onChange(c.value)}
					activeOpacity={0.7}
				>
					<View
						style={[
							styles.radioCircle,
							value === c.value && styles.radioCircleActive,
						]}
					>
						{value === c.value && <View style={styles.radioDot} />}
					</View>
					<Text
						style={[
							styles.themeOptionLabel,
							value === c.value && styles.themeOptionLabelActive,
						]}
					>
						{t(c.labelKey)}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
