// components/history/ExportForm.tsx

import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { useIsDarkTheme } from "@/hooks/useAppTheme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { FileDown } from "lucide-react-native"
import { useState } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	onExport: (from: number, to: number) => void
	isLoading: boolean
	error: string | null
}

export function ExportForm({ onExport, isLoading, error }: Props) {
	const isDark = useIsDarkTheme()
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const [from, setFrom] = useState(() => {
		const d = new Date()
		d.setMonth(d.getMonth() - 1)
		d.setHours(0, 0, 0, 0)
		return d.getTime()
	})

	const [to, setTo] = useState(() => {
		const d = new Date()
		d.setHours(23, 59, 59, 999)
		return d.getTime()
	})

	const [showFromPicker, setShowFromPicker] = useState(false)
	const [showToPicker, setShowToPicker] = useState(false)

	const formatDate = (ts: number) =>
		new Date(ts).toLocaleDateString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})

	return (
		<View style={styles.card}>
			<Text style={styles.title}>Експорт PDF звіту</Text>

			<View style={styles.row}>
				<TouchableOpacity
					style={styles.dateBtn}
					onPress={() => setShowFromPicker(v => !v)}
					activeOpacity={0.7}
				>
					<Text style={styles.dateBtnLabel}>Від</Text>
					<Text style={styles.dateBtnValue}>{formatDate(from)}</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.dateBtn}
					onPress={() => setShowToPicker(v => !v)}
					activeOpacity={0.7}
				>
					<Text style={styles.dateBtnLabel}>До</Text>
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
						onChange={(_, date) => {
							if (date) setFrom(date.getTime())
						}}
					/>
					<TouchableOpacity
						style={styles.doneBtn}
						onPress={() => setShowFromPicker(false)}
					>
						<Text style={styles.doneBtnText}>Готово</Text>
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
						onChange={(_, date) => {
							if (date) setTo(date.getTime())
						}}
					/>
					<TouchableOpacity
						style={styles.doneBtn}
						onPress={() => setShowToPicker(false)}
					>
						<Text style={styles.doneBtnText}>Готово</Text>
					</TouchableOpacity>
				</View>
			)}

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</View>

			<Button
				title={isLoading ? "Генерація..." : "Експортувати PDF"}
				icon={<FileDown size={20} color="#fff" />}
				iconPosition="left"
				onPress={() => onExport(from, to)}
				disabled={isLoading}
			/>
		</View>
	)
}
