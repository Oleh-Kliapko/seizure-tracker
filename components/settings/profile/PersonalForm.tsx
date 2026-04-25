// components/settings/profile/PersonalForm.tsx

import { Button, FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useIsDarkTheme } from "@/hooks/useAppTheme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type FormField = {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder: string
	autoCapitalize?: "none" | "words" | "sentences" | "characters"
	keyboardType?: "default" | "phone-pad" | "email-address"
}

type Props = {
	fields: FormField[]
	birthDate: number | null
	onBirthDateChange: (v: number | null) => void
	onSave: () => void
	isLoading: boolean
	displayError: string | null
}

export function PersonalForm({
	fields,
	birthDate,
	onBirthDateChange,
	onSave,
	isLoading,
	displayError,
}: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const [showPicker, setShowPicker] = useState(false)

	const formatBirthDate = (ts: number) =>
		new Date(ts).toLocaleDateString("uk-UA", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})

	return (
		<View style={styles.card}>
			{fields.map(field => {
				const {
					label,
					value,
					onChange,
					placeholder,
					autoCapitalize,
					keyboardType,
				} = field

				return (
					<FormInput
						key={label}
						label={label}
						value={value}
						onChangeText={onChange}
						placeholder={placeholder}
						autoCapitalize={autoCapitalize ?? "sentences"}
						keyboardType={keyboardType ?? "default"}
					/>
				)
			})}

			<View style={{ marginBottom: theme.spacing.md }}>
				<Text style={styles.label}>Дата народження</Text>
				<TouchableOpacity
					onPress={() => setShowPicker(v => !v)}
					activeOpacity={0.7}
					style={{
						backgroundColor: theme.colors.background,
						borderWidth: 1,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.md,
						paddingHorizontal: theme.spacing.md,
						paddingVertical: theme.spacing.sm + 4,
					}}
				>
					<Text
						style={{
							fontFamily: theme.fonts.regular,
							fontSize: theme.fontSize.md,
							color: birthDate ? theme.colors.onSurface : theme.colors.textSecondary,
						}}
					>
						{birthDate ? formatBirthDate(birthDate) : "Оберіть дату"}
					</Text>
				</TouchableOpacity>

				{showPicker && (
					<View>
						<DateTimePicker
							value={birthDate ? new Date(birthDate) : new Date(2000, 0, 1)}
							mode="date"
							display={Platform.OS === "ios" ? "spinner" : "default"}
							themeVariant={isDark ? "dark" : "light"}
							maximumDate={new Date()}
							onChange={(_, date) => {
								if (date) onBirthDateChange(date.getTime())
							}}
						/>
						<TouchableOpacity
							style={{
								marginTop: theme.spacing.sm,
								borderRadius: theme.radius.md,
								paddingVertical: theme.spacing.sm,
								alignItems: "center",
								backgroundColor: theme.colors.primary,
							}}
							onPress={() => setShowPicker(false)}
						>
							<Text
								style={{
									fontFamily: theme.fonts.medium,
									fontSize: theme.fontSize.md,
									color: "#fff",
								}}
							>
								Готово
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>

			<View style={styles.errorContainer}>
				{displayError && <Text style={styles.errorText}>{displayError}</Text>}
			</View>

			<Button
				title={isLoading ? "Оновлення..." : "Оновити"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
