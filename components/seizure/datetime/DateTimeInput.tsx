// components/seizure/datetime/DateTimeInput.tsx

import { useAppTheme, useIsDarkTheme } from "@/hooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import i18n from "@/config/i18n"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"

type Props = {
	label: string
	value: number
	onChange: (timestamp: number) => void
}

export function DateTimeInput({ label, value, onChange }: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)

	const formatDate = (ts: number) => {
		const d = new Date(ts)
		const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
		return d.toLocaleString(locale, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity onPress={() => setShowPicker(v => !v)}>
				<Text style={styles.dateTimeValue}>{formatDate(value)}</Text>
			</TouchableOpacity>

			{showPicker && (
				<View>
					<DateTimePicker
						value={new Date(value)}
						mode="datetime"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						onChange={(_, date) => {
							if (date) onChange(date.getTime())
						}}
					/>
					<TouchableOpacity
						onPress={() => setShowPicker(false)}
						style={styles.doneBtn}
						activeOpacity={0.8}
					>
						<Text style={styles.doneBtnText}>{t("common.done")}</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}
