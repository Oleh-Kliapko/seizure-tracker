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

const NAV_ARROW_SIZE = 30
const NAV_LABEL_SIZE = 17

export function DateTimeInput({ label, value, onChange }: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)

	const date = new Date(value)
	const year = date.getFullYear()
	const month = date.getMonth() // 0–11

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

	const monthName = date.toLocaleString(locale, { month: "long" })

	const now = new Date()
	const atMaxMonth = year >= now.getFullYear() && month >= now.getMonth()

	const changeYear = (delta: number) => {
		const newYear = year + delta
		if (newYear > MAX_YEAR) return
		const next = new Date(value)
		next.setFullYear(newYear)
		onChange(next > now ? now.getTime() : next.getTime())
	}

	const changeMonth = (delta: number) => {
		const next = new Date(value)
		next.setMonth(next.getMonth() + delta)
		onChange(next > now ? now.getTime() : next.getTime())
	}

	const handlePickerChange = (_: unknown, d?: Date) => {
		if (!d) return
		// Preserve year+month since datetime spinner doesn't show year
		d.setFullYear(year, month, d.getDate())
		onChange(d.getTime())
	}

	const navGroup = (
		onPrev: () => void,
		label: string,
		onNext: () => void,
		nextDisabled: boolean,
	) => (
		<View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
			<TouchableOpacity onPress={onPrev} hitSlop={10}>
				<Text style={{ color: theme.colors.primary, fontSize: NAV_ARROW_SIZE, lineHeight: NAV_ARROW_SIZE, includeFontPadding: false, transform: [{ translateY: 0 }] }}>‹</Text>
			</TouchableOpacity>
			<Text style={{ color: theme.colors.onSurface, fontSize: NAV_LABEL_SIZE, fontFamily: theme.fonts.medium, minWidth: 80, textAlign: "center" }}>
				{label}
			</Text>
			<TouchableOpacity onPress={onNext} disabled={nextDisabled} hitSlop={10}>
				<Text style={{ color: nextDisabled ? theme.colors.border : theme.colors.primary, fontSize: NAV_ARROW_SIZE, lineHeight: NAV_ARROW_SIZE, includeFontPadding: false, transform: [{ translateY: 0 }] }}>›</Text>
			</TouchableOpacity>
		</View>
	)

	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<TouchableOpacity onPress={() => setShowPicker(v => !v)}>
				<Text style={styles.dateTimeValue}>{formatDateTime(value)}</Text>
			</TouchableOpacity>

			{showPicker && (
				<View>
					<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 24, paddingTop: 6, paddingBottom: 0 }}>
						{navGroup(() => changeYear(-1), String(year), () => changeYear(+1), year >= MAX_YEAR)}
						{navGroup(() => changeMonth(-1), monthName, () => changeMonth(+1), atMaxMonth)}
					</View>

					<DateTimePicker
						value={date}
						mode="datetime"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						maximumDate={new Date()}
						onChange={handlePickerChange}
						style={{ marginTop: -8 }}
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
