// components/tracking/TrackingVitals.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
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
}

function makeIntHandler(setter: (v: string) => void, max: number) {
	return (v: string) => {
		if (!v) return setter("")
		const num = parseInt(v)
		if (!isNaN(num) && num <= max) setter(v)
	}
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
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Фізичні показники</Text>
			<View style={styles.vitalsGrid}>
				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>Температура (°C)</Text>
					<TextInput
						style={styles.vitalInput}
						value={temperature}
						onChangeText={onTemperatureChange}
						keyboardType="decimal-pad"
						placeholder="36.6"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={4}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>Пульс (уд/хв)</Text>
					<TextInput
						style={styles.vitalInput}
						value={pulse}
						onChangeText={makeIntHandler(onPulseChange, 250)}
						keyboardType="number-pad"
						placeholder="72"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>Тиск (систол.)</Text>
					<TextInput
						style={styles.vitalInput}
						value={systolicPressure}
						onChangeText={makeIntHandler(onSystolicChange, 250)}
						keyboardType="number-pad"
						placeholder="120"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>Тиск (діастол.)</Text>
					<TextInput
						style={styles.vitalInput}
						value={diastolicPressure}
						onChangeText={makeIntHandler(onDiastolicChange, 150)}
						keyboardType="number-pad"
						placeholder="80"
						placeholderTextColor={theme.colors.textSecondary}
						maxLength={3}
					/>
				</View>

				<View style={styles.vitalItem}>
					<Text style={styles.vitalLabel}>Сатурація (%)</Text>
					<TextInput
						style={styles.vitalInput}
						value={oxygenSaturation}
						onChangeText={makeIntHandler(onOxygenChange, 100)}
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
