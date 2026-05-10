// components/report/ReportDateRange.tsx

import { useAppTheme } from "@/hooks"
import { useIsDarkTheme } from "@/hooks/useAppTheme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	from: number
	to: number
	minFromDate: Date
	onFromChange: (ts: number) => void
	onToChange: (ts: number) => void
}

const formatDate = (ts: number) =>
	new Date(ts).toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})

export function ReportDateRange({ from, to, minFromDate, onFromChange, onToChange }: Props) {
	const isDark = useIsDarkTheme()
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const [showFromPicker, setShowFromPicker] = useState(false)
	const [showToPicker, setShowToPicker] = useState(false)

	return (
		<>
			<View style={styles.row}>
				<TouchableOpacity
					style={styles.dateBtn}
					onPress={() => setShowFromPicker(v => !v)}
					activeOpacity={0.7}
				>
					<Text style={styles.dateBtnLabel}>{t("report.formFrom")}</Text>
					<Text style={styles.dateBtnValue}>{formatDate(from)}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.dateBtn}
					onPress={() => setShowToPicker(v => !v)}
					activeOpacity={0.7}
				>
					<Text style={styles.dateBtnLabel}>{t("report.formTo")}</Text>
					<Text style={styles.dateBtnValue}>{formatDate(to)}</Text>
				</TouchableOpacity>
			</View>

			{showFromPicker && (
				<View>
					<DateTimePicker
						value={new Date(from)}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						minimumDate={minFromDate}
						maximumDate={new Date(to)}
						onChange={(_, date) => {
							if (date) onFromChange(date.getTime())
						}}
					/>
					<TouchableOpacity style={styles.doneBtn} onPress={() => setShowFromPicker(false)}>
						<Text style={styles.doneBtnText}>{t("common.done")}</Text>
					</TouchableOpacity>
				</View>
			)}

			{showToPicker && (
				<View>
					<DateTimePicker
						value={new Date(to)}
						mode="date"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						minimumDate={new Date(from)}
						maximumDate={new Date()}
						onChange={(_, date) => {
							if (date) onToChange(date.getTime())
						}}
					/>
					<TouchableOpacity style={styles.doneBtn} onPress={() => setShowToPicker(false)}>
						<Text style={styles.doneBtnText}>{t("common.done")}</Text>
					</TouchableOpacity>
				</View>
			)}
		</>
	)
}
