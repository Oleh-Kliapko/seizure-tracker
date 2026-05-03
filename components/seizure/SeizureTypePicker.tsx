// components/seizure/SeizureTypePicker.tsx

import { FormInput } from "@/components/ui"
import { SEIZURE_TYPES } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { SeizureType } from "@/models"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"

type Props = {
	value: SeizureType
	customType: string
	onChange: (v: SeizureType) => void
	onCustomChange: (v: string) => void
}

export function SeizureTypePicker({
	value,
	customType,
	onChange,
	onCustomChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t('seizure.type')}</Text>

			{SEIZURE_TYPES.map(item => (
				<TouchableOpacity
					key={item.value}
					style={styles.typeOption}
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
							styles.typeLabel,
							value === item.value && styles.typeLabelActive,
						]}
					>
						{t(item.labelKey)}
					</Text>
				</TouchableOpacity>
			))}

			{value === "custom" && (
				<FormInput
					label={t('seizure.customType')}
					value={customType}
					onChangeText={onCustomChange}
					placeholder={t('seizure.customTypePlaceholder')}
				/>
			)}
		</View>
	)
}
