// components/tracking/TrackingVitals.tsx

import { useAppTheme } from "@/hooks"
import { VITAL_BOUNDS } from "@/utils"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Text, TextInput, TextInputProps, View } from "react-native"
import { getStyles } from "./getStyles"

type VitalInputProps = {
	label: string
	value: string
	onChangeText: (v: string) => void
	onBlur: () => void
	keyboardType: TextInputProps["keyboardType"]
	placeholder: string
	maxLength: number
}

function VitalInput({ label, value, onChangeText, onBlur, ...inputProps }: VitalInputProps) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const isDirty = useRef(false)
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleChange = (text: string) => {
		isDirty.current = true
		onChangeText(text)
	}

	const handleBlur = () => {
		if (isDirty.current) {
			isDirty.current = false
			if (timerRef.current) clearTimeout(timerRef.current)
			setShowCheck(true)
			timerRef.current = setTimeout(() => setShowCheck(false), 2000)
		}
		onBlur()
	}

	return (
		<View style={styles.vitalItem}>
			<Text style={styles.vitalLabel}>{label}</Text>
			<View style={{ position: "relative" }}>
				<TextInput
					style={styles.vitalInput}
					value={value}
					onChangeText={handleChange}
					onBlur={handleBlur}
					placeholderTextColor={theme.colors.textSecondary}
					{...inputProps}
				/>
				{showCheck && (
					<View style={{ position: "absolute", right: 8, top: 0, bottom: 0, justifyContent: "center" }}>
						<Check size={13} color={theme.colors.success} />
					</View>
				)}
			</View>
		</View>
	)
}

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
				<VitalInput
					label={t("tracking.temperature")}
					value={temperature}
					onChangeText={onTemperatureChange}
					onBlur={makeBlurHandler(temperature, onTemperatureChange, "temperature", "tracking.error.temperature", true)}
					keyboardType="decimal-pad"
					placeholder="36.6"
					maxLength={4}
				/>

				<VitalInput
					label={t("tracking.pulse")}
					value={pulse}
					onChangeText={onPulseChange}
					onBlur={makeBlurHandler(pulse, onPulseChange, "pulse", "tracking.error.pulse")}
					keyboardType="number-pad"
					placeholder="72"
					maxLength={3}
				/>

				<VitalInput
					label={t("tracking.systolicPressure")}
					value={systolicPressure}
					onChangeText={onSystolicChange}
					onBlur={makeBlurHandler(systolicPressure, onSystolicChange, "systolicPressure", "tracking.error.systolicPressure")}
					keyboardType="number-pad"
					placeholder="120"
					maxLength={3}
				/>

				<VitalInput
					label={t("tracking.diastolicPressure")}
					value={diastolicPressure}
					onChangeText={onDiastolicChange}
					onBlur={makeBlurHandler(diastolicPressure, onDiastolicChange, "diastolicPressure", "tracking.error.diastolicPressure")}
					keyboardType="number-pad"
					placeholder="80"
					maxLength={3}
				/>

				<VitalInput
					label={t("tracking.oxygen")}
					value={oxygenSaturation}
					onChangeText={onOxygenChange}
					onBlur={makeBlurHandler(oxygenSaturation, onOxygenChange, "oxygenSaturation", "tracking.error.oxygenSaturation")}
					keyboardType="number-pad"
					placeholder="98"
					maxLength={3}
				/>
			</View>
		</View>
	)
}
