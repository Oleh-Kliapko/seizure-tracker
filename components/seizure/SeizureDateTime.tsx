// components/seizure/SeizureDateTime.tsx

import { useAppTheme, useIsDarkTheme } from "@/hooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Platform, Switch, Text, TouchableOpacity, View } from "react-native"
import { Divider } from "../ui"
import { getStyles } from "./getStyles"

type Props = {
	startedAt: number
	endedAt: number | undefined
	onStartChange: (v: number) => void
	onEndChange: (v: number | undefined) => void
}

export function SeizureDateTime({
	startedAt,
	endedAt,
	onStartChange,
	onEndChange,
}: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const [showStartPicker, setShowStartPicker] = useState(false)
	const [showEndPicker, setShowEndPicker] = useState(false)
	const [hasEndTime, setHasEndTime] = useState(!!endedAt)

	const formatDate = (ts: number) => {
		const d = new Date(ts)
		return d.toLocaleString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
	}

	const toggleEndTime = (value: boolean) => {
		setHasEndTime(value)
		if (!value) onEndChange(undefined)
		else onEndChange(Date.now())
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Час приступу</Text>

			<Text style={styles.label}>Початок</Text>
			<TouchableOpacity onPress={() => setShowStartPicker(v => !v)}>
				<Text
					style={[
						styles.sublabel,
						{ color: theme.colors.primary, marginTop: 4 },
					]}
				>
					{formatDate(startedAt)}
				</Text>
			</TouchableOpacity>

			{showStartPicker && (
				<View>
					<DateTimePicker
						value={new Date(startedAt)}
						mode="datetime"
						display={Platform.OS === "ios" ? "spinner" : "default"}
						themeVariant={isDark ? "dark" : "light"}
						onChange={(_, date) => {
							if (date) onStartChange(date.getTime())
						}}
					/>
					<TouchableOpacity
						onPress={() => setShowStartPicker(false)}
						style={[styles.doneBtn, { backgroundColor: theme.colors.primary }]}
						activeOpacity={0.8}
					>
						<Text style={[styles.doneBtnText]}>Готово</Text>
					</TouchableOpacity>
				</View>
			)}

			<Divider label="" />

			<View style={styles.switchRow}>
				<Text style={styles.label}>Вказати час закінчення</Text>
				<Switch
					value={hasEndTime}
					onValueChange={toggleEndTime}
					trackColor={{ true: theme.colors.primary }}
				/>
			</View>

			{hasEndTime && (
				<>
					<TouchableOpacity onPress={() => setShowEndPicker(v => !v)}>
						<Text
							style={[
								styles.sublabel,
								{ color: theme.colors.primary, marginTop: 4 },
							]}
						>
							{endedAt ? formatDate(endedAt) : "Оберіть час"}
						</Text>
					</TouchableOpacity>

					{showEndPicker && (
						<View>
							<DateTimePicker
								value={new Date(endedAt ?? Date.now())}
								mode="datetime"
								display={Platform.OS === "ios" ? "spinner" : "default"}
								themeVariant={isDark ? "dark" : "light"}
								onChange={(_, date) => {
									if (date) onEndChange(date.getTime())
								}}
							/>
							<TouchableOpacity
								onPress={() => setShowEndPicker(false)}
								style={[
									styles.doneBtn,
									{ backgroundColor: theme.colors.primary },
								]}
								activeOpacity={0.8}
							>
								<Text style={styles.doneBtnText}>Готово</Text>
							</TouchableOpacity>
						</View>
					)}
				</>
			)}
		</View>
	)
}
