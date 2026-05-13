// components/settings/medical/BloodTypePicker.tsx
import { BLOOD_TYPES, RH_FACTORS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

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
	const { t } = useTranslation()
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const flashCheck = () => {
		if (timerRef.current) clearTimeout(timerRef.current)
		setShowCheck(true)
		timerRef.current = setTimeout(() => setShowCheck(false), 2000)
	}

	return (
		<View>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: styles.label.marginBottom ?? 6 }}>
				<Text style={[styles.label, { marginBottom: 0 }]}>{t('medical.bloodType')}</Text>
				{showCheck && <Check size={13} color={theme.colors.success} />}
			</View>

			<View style={styles.row}>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={bloodType}
						itemStyle={{ color: theme.colors.onSurface }}
						onValueChange={v => { onBloodTypeChange(v); flashCheck() }}
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
						itemStyle={{ color: theme.colors.onSurface }}
						onValueChange={v => { onRhFactorChange(v); flashCheck() }}
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
