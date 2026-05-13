// components/settings/medications/MedicationDoseUnit.tsx

import { useAppTheme } from "@/hooks"
import { DOSE_UNIT_LABEL_KEYS, DOSE_UNITS } from "@/models/medication"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	doseUnit: string
	onUpdate: (unit: string) => void
}

export function MedicationDoseUnit({ doseUnit, onUpdate }: Props) {
	const theme = useAppTheme()
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={{ marginBottom: spacing.md }}>
			<Text style={[styles.label, { marginBottom: spacing.sm }]}>
				{t("medications.doseUnit")}
			</Text>
			<View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
				{DOSE_UNITS.map(unit => {
					const active = doseUnit === unit
					return (
						<TouchableOpacity
							key={unit}
							onPress={() => onUpdate(unit)}
							activeOpacity={0.7}
							style={{
								paddingHorizontal: spacing.md,
								paddingVertical: spacing.xs,
								borderRadius: radius.lg,
								borderWidth: 1,
								borderColor: active ? colors.primary : colors.border,
								backgroundColor: active ? colors.primary + "15" : colors.background,
							}}
						>
							<Text
								style={{
									fontFamily: active ? fonts.medium : fonts.regular,
									fontSize: fontSize.sm,
									color: active ? colors.primary : colors.textSecondary,
								}}
							>
								{t(DOSE_UNIT_LABEL_KEYS[unit])}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}
