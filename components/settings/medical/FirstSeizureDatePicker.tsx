// components/settings/medical/FirstSeizureDatePicker.tsx
import { MONTHS, YEARS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles" // ← беремо з загального файлу

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

	return (
		<View>
			<Text style={styles.label}>{t('medical.firstSeizure')}</Text>

			<View style={styles.row}>
				<View style={styles.pickerWrapper}>
					<Picker
						selectedValue={month}
						itemStyle={{ color: theme.colors.onSurface }}
						onValueChange={onMonthChange}
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
						onValueChange={onYearChange}
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
