// components/settings/app-settings/SetPasswordForm.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	newPassword: string
	confirmPassword: string
	onNewPasswordChange: (v: string) => void
	onConfirmPasswordChange: (v: string) => void
	onSave: () => void
	isLoading: boolean
	error: string | null
	isSuccess: boolean
}

export function SetPasswordForm({
	newPassword,
	confirmPassword,
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
				label="Новий пароль"
				value={newPassword}
				onChangeText={onNewPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label="Підтвердити пароль"
				value={confirmPassword}
				onChangeText={onConfirmPasswordChange}
				placeholder="••••••••"
				isPassword
			/>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{error}</Text>}
				{isSuccess && (
					<Text style={[styles.errorText, { color: theme.colors.success }]}>
						Пароль успішно встановлено ✓
					</Text>
				)}
			</View>

			<Button
				title={isLoading ? "Збереження..." : "Встановити пароль"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
