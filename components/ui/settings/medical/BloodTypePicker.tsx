// components/settings/medical/BloodTypePicker.tsx
import { BLOOD_TYPES, RH_FACTORS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	bloodType: string
	rhFactor: string
	onBloodTypeChange: (v: string) => void
	onRhFactorChange: (v: string) => void
}

export function BloodTypePicker({
	bloodType,
	rhFactor,
	onBloodTypeChange,
	onRhFactorChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View>
			<Text style={styles.label}>Група та резус-фактор крові</Text>

			<View style={styles.row}>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={bloodType}
						onValueChange={onBloodTypeChange}
						style={{ color: theme.colors.onSurface }}
					>
						{BLOOD_TYPES.map(b => (
							<Picker.Item key={b.value} label={b.label} value={b.value} />
						))}
					</Picker>
				</View>

				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={rhFactor}
						onValueChange={onRhFactorChange}
						style={{ color: theme.colors.onSurface }}
					>
						{RH_FACTORS.map(r => (
							<Picker.Item key={r.value} label={r.label} value={r.value} />
						))}
					</Picker>
				</View>
			</View>
		</View>
	)
}
