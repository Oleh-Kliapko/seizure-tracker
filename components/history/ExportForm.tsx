// components/history/ExportForm.tsx

import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { useIsDarkTheme } from "@/hooks/useAppTheme"
import { useAuth, useUser } from "@/hooks"
import DateTimePicker from "@react-native-community/datetimepicker"
import { FileDown, Mail } from "lucide-react-native"
import { useState } from "react"
import { Modal, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	onExport: (from: number, to: number) => void
	onExportEmail: (from: number, to: number, email: string) => void
	isLoading: boolean
	error: string | null
}

export function ExportForm({ onExport, onExportEmail, isLoading, error }: Props) {
	const isDark = useIsDarkTheme()
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { user } = useAuth()
	const { profile } = useUser()

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
	const [showEmailModal, setShowEmailModal] = useState(false)
	const [email, setEmail] = useState(user?.email || "")

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

			<View style={{ gap: 12 }}>
				<Button
					title={isLoading ? "Генерація..." : "Експортувати PDF"}
					icon={<FileDown size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => onExport(from, to)}
					disabled={isLoading}
				/>
				<Button
					title={isLoading ? "Відправлення..." : "Відправити на імейл"}
					icon={<Mail size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => setShowEmailModal(true)}
					disabled={isLoading}
				/>
			</View>

			<Modal
				visible={showEmailModal}
				transparent
				animationType="fade"
				onRequestClose={() => setShowEmailModal(false)}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.5)",
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
					}}
				>
					<View
						style={{
							backgroundColor: theme.colors.background,
							borderRadius: 12,
							padding: 20,
							width: "100%",
							maxWidth: 400,
							gap: 16,
						}}
					>
						<Text style={{ fontSize: 18, fontWeight: "bold", color: theme.colors.text }}>
							Відправити звіт на імейл
						</Text>

						<TextInput
							style={{
								borderWidth: 1,
								borderColor: theme.colors.border,
								borderRadius: 8,
								padding: 12,
								fontSize: 16,
								color: theme.colors.text,
								backgroundColor: theme.colors.surface,
							}}
							placeholder="Імейл адреса"
							placeholderTextColor={theme.colors.textSecondary}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							editable={!isLoading}
						/>

						<View style={{ flexDirection: "row", gap: 12 }}>
							<Button
								title="Скасувати"
								onPress={() => setShowEmailModal(false)}
								disabled={isLoading}
								style={{ flex: 1 }}
							/>
							<Button
								title={isLoading ? "Відправлення..." : "Відправити"}
								onPress={() => {
									if (email.trim()) {
										onExportEmail(from, to, email)
										setShowEmailModal(false)
									}
								}}
								disabled={isLoading || !email.trim()}
								style={{ flex: 1 }}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	)
}
