// components/seizure/SeizureTypePicker.tsx

import { FormInput } from "@/components/ui"
import { SEIZURE_TYPES } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { SeizureType } from "@/models"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	values: SeizureType[]
	customType: string
	onToggle: (v: SeizureType) => void
	onCustomChange: (v: string) => void
}

export function SeizureTypePicker({ values, customType, onToggle, onCustomChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("seizure.type")}</Text>

			{SEIZURE_TYPES.map(item => {
				const active = values.includes(item.value)
				return (
					<TouchableOpacity
						key={item.value}
						style={styles.typeOption}
						onPress={() => onToggle(item.value)}
						activeOpacity={0.7}
					>
						<View style={[styles.checkboxSquare, active && styles.checkboxSquareActive]}>
							{active && <View style={styles.checkboxMark} />}
						</View>
						<Text style={[styles.typeLabel, active && styles.typeLabelActive]}>
							{t(item.labelKey)}
						</Text>
					</TouchableOpacity>
				)
			})}

			{values.includes("custom") && (
				<FormInput
					label={t("seizure.customType")}
					value={customType}
					onChangeText={onCustomChange}
					placeholder={t("seizure.customTypePlaceholder")}
				/>
			)}
		</View>
	)
}
