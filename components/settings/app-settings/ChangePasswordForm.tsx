// components/settings/app-settings/ChangePasswordForm.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	currentPassword: string
	newPassword: string
	confirmPassword: string
	onCurrentPasswordChange: (v: string) => void
	onNewPasswordChange: (v: string) => void
	onConfirmPasswordChange: (v: string) => void
	onSave: () => void
	isLoading: boolean
	error: string | null
	isSuccess: boolean
}

export function ChangePasswordForm({
	currentPassword,
	newPassword,
	confirmPassword,
	onCurrentPasswordChange,
	onNewPasswordChange,
	onConfirmPasswordChange,
	onSave,
	isLoading,
	error,
	isSuccess,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.settingsSection}>
			<FormInput
				label="Поточний пароль"
				value={currentPassword}
				onChangeText={onCurrentPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label="Новий пароль"
				value={newPassword}
				onChangeText={onNewPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label="Підтвердити новий пароль"
				value={confirmPassword}
				onChangeText={onConfirmPasswordChange}
				placeholder="••••••••"
				isPassword
			/>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{isSuccess && (
					<Text style={[styles.errorText, { color: theme.colors.success }]}>
						Пароль успішно змінено ✓
					</Text>
				)}
			</View>

			<Button
				title={isLoading ? "Збереження..." : "Змінити пароль"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
