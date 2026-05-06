// components/tracking/TrackingVitals.tsx

import { useAppTheme } from "@/hooks"
import { VITAL_BOUNDS } from "@/utils"
import { useTranslation } from "react-i18next"
import { Alert, Text, TextInput, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	temperature: string
	pulse: string
	systolicPressure: string
	diastolicPressure: string
	oxygenSaturation: string
	onTemperatureChange: (v: string) => void
	onPulseChange: (v: string) => void
	onSystolicChange: (v: string) => void
	onDiastolicChange: (v: string) => void
	onOxygenChange: (v: string) => void
	onSave: () => void
}

export function TrackingVitals({
	temperature,
	pulse,
	systolicPressure,
	diastolicPressure,
	oxygenSaturation,
	onTemperatureChange,
	onPulseChange,
	onSystolicChange,
	onDiastolicChange,
	onOxygenChange,
	onSave,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	function makeBlurHandler(
		value: string,
		clear: (v: string) => void,
		field: keyof typeof VITAL_BOUNDS,
		errorKey: string,
		isFloat = false,
	) {
		return () => {
			if (!value) { onSave(); return }
			const n = isFloat ? parseFloat(value) : parseInt(value)
			const { min, max } = VITAL_BOUNDS[field]
			if (isNaN(n) || n < min || n > max) {
				Alert.alert(t("common.error"), t(errorKey))
				clear("")
				return
			}
			onSave()
		}
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("tracking.vitals")}</Text>
			<View style={styles.vitalsGrid}>
				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>{t("tracking.temperature")}</Text>
					<TextInput
						style={styles.vitalInput}
						value={temperature}
						onChangeText={onTemperatureChange}
						onBlur={makeBlurHandler(temperature, onTemperatureChange, "temperature", "tracking.error.temperature", true)}
						keyboardType="decimal-pad"
						placeholder="36.6"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={4}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>{t("tracking.pulse")}</Text>
					<TextInput
						style={styles.vitalInput}
						value={pulse}
						onChangeText={onPulseChange}
						onBlur={makeBlurHandler(pulse, onPulseChange, "pulse", "tracking.error.pulse")}
						keyboardType="number-pad"
						placeholder="72"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>
						{t("tracking.systolicPressure")}
					</Text>
					<TextInput
						style={styles.vitalInput}
						value={systolicPressure}
						onChangeText={onSystolicChange}
						onBlur={makeBlurHandler(systolicPressure, onSystolicChange, "systolicPressure", "tracking.error.systolicPressure")}
						keyboardType="number-pad"
						placeholder="120"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>
						{t("tracking.diastolicPressure")}
					</Text>
					<TextInput
						style={styles.vitalInput}
						value={diastolicPressure}
						onChangeText={onDiastolicChange}
						onBlur={makeBlurHandler(diastolicPressure, onDiastolicChange, "diastolicPressure", "tracking.error.diastolicPressure")}
						keyboardType="number-pad"
						placeholder="80"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>{t("tracking.oxygen")}</Text>
					<TextInput
						style={styles.vitalInput}
						value={oxygenSaturation}
						onChangeText={onOxygenChange}
						onBlur={makeBlurHandler(oxygenSaturation, onOxygenChange, "oxygenSaturation", "tracking.error.oxygenSaturation")}
						keyboardType="number-pad"
						placeholder="98"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>
			</View>
		</View>
	)
}
