// components/settings/medications/MedicationStartDate.tsx

import { MONTHS, YEARS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	startMonth: number
	startYear: number
	onUpdateStarted: (month: number, year: number) => void
}

export function MedicationStartDate({ startMonth, startYear, onUpdateStarted }: Props) {
	const theme = useAppTheme()
	const { colors, spacing } = theme
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
		<View style={{ marginBottom: spacing.md }}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm }}>
				<Text style={[styles.label, { marginBottom: 0 }]}>{t("medications.startedAt")}</Text>
				{showCheck && <Check size={13} color="#22C55E" />}
			</View>
			<View style={styles.row}>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={startMonth}
						onValueChange={v => { onUpdateStarted(v, startYear); flashCheck() }}
						style={{ color: colors.onSurface }}
						itemStyle={{ color: colors.onSurface }}
					>
						{MONTHS.map(m => (
							<Picker.Item key={m.value} label={t(m.labelKey)} value={m.value} />
						))}
					</Picker>
				</View>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={startYear}
						onValueChange={v => { onUpdateStarted(startMonth, v); flashCheck() }}
						style={{ color: colors.onSurface }}
						itemStyle={{ color: colors.onSurface }}
					>
						{YEARS.map(y => (
							<Picker.Item key={y.value} label={y.label} value={y.value} />
						))}
					</Picker>
				</View>
			</View>
		</View>
	)
}
