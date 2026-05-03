// components/settings/app-settings/SetPasswordForm.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
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
	const { t } = useTranslation()

	return (
		<View style={styles.settingsSection}>
			<FormInput
				label={t('form.newPassword')}
				value={newPassword}
				onChangeText={onNewPasswordChange}
				placeholder="••••••••"
				isPassword
			/>
			<FormInput
				label={t('form.confirmPassword')}
				value={confirmPassword}
				onChangeText={onConfirmPasswordChange}
				placeholder="••••••••"
				isPassword
			/>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{t(error)}</Text>}
				{isSuccess && (
					<Text style={[styles.errorText, { color: theme.colors.success }]}>
						{t('form.passwordSet')}
					</Text>
				)}
			</View>

			<Button
				title={isLoading ? t('common.saving') : t('settings.setPassword')}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
