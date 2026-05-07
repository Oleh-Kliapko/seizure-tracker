// components/settings/profile/PersonalForm.tsx

import { FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useIsDarkTheme } from "@/hooks/useAppTheme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
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
	onBlur: () => void
	displayError: string | null
}

export function PersonalForm({
	fields,
	birthDate,
	onBirthDateChange,
	onBlur,
	displayError,
}: Props) {
	const theme = useAppTheme()
	const isDark = useIsDarkTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)
	const [showDateCheck, setShowDateCheck] = useState(false)
	const dateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
						onBlur={onBlur}
						placeholder={placeholder}
						autoCapitalize={autoCapitalize ?? "sentences"}
						keyboardType={keyboardType ?? "default"}
					/>
				)
			})}

			<View style={{ marginBottom: theme.spacing.md }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
					<Text style={[styles.label, { marginBottom: 0 }]}>{t('personal.birthDate')}</Text>
					{showDateCheck && <Check size={13} color="#22C55E" />}
				</View>
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
						{birthDate ? formatBirthDate(birthDate) : t('personal.selectDate')}
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
							onPress={() => {
								setShowPicker(false)
								if (dateTimerRef.current) clearTimeout(dateTimerRef.current)
								setShowDateCheck(true)
								dateTimerRef.current = setTimeout(() => setShowDateCheck(false), 2000)
								onBlur()
							}}
						>
							<Text
								style={{
									fontFamily: theme.fonts.medium,
									fontSize: theme.fontSize.md,
									color: "#fff",
								}}
							>
								{t('common.done')}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>

			{displayError && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{displayError}</Text>
				</View>
			)}
		</View>
	)
}
