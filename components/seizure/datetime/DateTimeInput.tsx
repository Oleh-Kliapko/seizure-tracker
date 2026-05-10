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

const MAX_YEAR = new Date().getFullYear()

export function DateTimeInput({ label, value, onChange }: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)

	const date = new Date(value)
	const year = date.getFullYear()

	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"

	const formatDateTime = (ts: number) => {
		const d = new Date(ts)
		return d.toLocaleString(locale, {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	const changeYear = (delta: number) => {
		const newYear = year + delta
		if (newYear > MAX_YEAR) return
		const next = new Date(value)
		next.setFullYear(newYear)
		const now = new Date()
		onChange(next > now ? now.getTime() : next.getTime())
	}

	const handlePickerChange = (_: unknown, d?: Date) => {
		if (!d) return
		// Preserve the user-selected year since datetime spinner doesn't show it
		d.setFullYear(year)
		onChange(d.getTime())
	}

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity onPress={() => setShowPicker(v => !v)}>
				<Text style={styles.dateTimeValue}>{formatDateTime(value)}</Text>
			</TouchableOpacity>

			{showPicker && (
				<View>
					<View style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: 24,
						paddingVertical: 8,
					}}>
						<TouchableOpacity onPress={() => changeYear(-1)} hitSlop={12}>
							<Text style={{ color: theme.colors.primary, fontSize: 28, fontFamily: theme.fonts.medium }}>‹</Text>
						</TouchableOpacity>
						<Text style={{ color: theme.colors.onSurface, fontSize: theme.fontSize.md, fontFamily: theme.fonts.medium }}>
							{year}
						</Text>
						<TouchableOpacity onPress={() => changeYear(+1)} disabled={year >= MAX_YEAR} hitSlop={12}>
							<Text style={{ color: year >= MAX_YEAR ? theme.colors.border : theme.colors.primary, fontSize: 28, fontFamily: theme.fonts.medium }}>›</Text>
						</TouchableOpacity>
					</View>

					<DateTimePicker
						value={date}
						mode="datetime"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						maximumDate={new Date()}
						onChange={handlePickerChange}
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
