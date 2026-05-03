// app/(tabs)/settings/change-password.tsx

import { ChangePasswordForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useChangePasswordForm } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useTranslation } from "react-i18next"

export default function ChangePasswordScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		currentPassword,
		setCurrentPassword,
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		isLoading,
		error,
		isSuccess,
		handleSave,
	} = useChangePasswordForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title={t('settings.changePassword')} />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<ChangePasswordForm
						currentPassword={currentPassword}
						newPassword={newPassword}
						confirmPassword={confirmPassword}
						onCurrentPasswordChange={setCurrentPassword}
						onNewPasswordChange={setNewPassword}
						onConfirmPasswordChange={setConfirmPassword}
						onSave={handleSave}
						isLoading={isLoading}
						error={error}
						isSuccess={isSuccess}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
