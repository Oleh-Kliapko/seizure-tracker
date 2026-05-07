// components/settings/medical/FirstSeizureDatePicker.tsx
import { MONTHS, YEARS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

type Props = {
	month: number
	year: number
	onMonthChange: (v: number) => void
	onYearChange: (v: number) => void
}

export function FirstSeizureDatePicker({
	month,
	year,
	onMonthChange,
	onYearChange,
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
				<Text style={[styles.label, { marginBottom: 0 }]}>{t('medical.firstSeizure')}</Text>
				{showCheck && <Check size={13} color="#22C55E" />}
			</View>

			<View style={styles.row}>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={month}
						itemStyle={{ color: theme.colors.onSurface }}
						onValueChange={v => { onMonthChange(v); flashCheck() }}
						style={{ color: theme.colors.onSurface }}
					>
						{MONTHS.map(m => (
							<Picker.Item key={m.value} label={t(m.labelKey)} value={m.value} />
						))}
					</Picker>
				</View>

				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={year}
						itemStyle={{ color: theme.colors.onSurface }}
						onValueChange={v => { onYearChange(v); flashCheck() }}
						style={{ color: theme.colors.onSurface }}
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
