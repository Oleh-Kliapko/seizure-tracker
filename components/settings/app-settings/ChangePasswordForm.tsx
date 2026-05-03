// components/settings/app-settings/ChangePasswordForm.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
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
	const { t } = useTranslation()

	return (
		<View style={styles.settingsSection}>
			<FormInput
				label={t('form.currentPassword')}
				value={currentPassword}
				onChangeText={onCurrentPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label={t('form.newPassword')}
				value={newPassword}
				onChangeText={onNewPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label={t('form.confirmNewPassword')}
				value={confirmPassword}
				onChangeText={onConfirmPasswordChange}
				placeholder="••••••••"
				isPassword
			/>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{t(error)}</Text>}
				{isSuccess && (
					<Text style={[styles.errorText, { color: theme.colors.success }]}>
						{t('form.passwordChanged')}
					</Text>
				)}
			</View>

			<Button
				title={isLoading ? t('common.saving') : t('settings.changePassword')}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
