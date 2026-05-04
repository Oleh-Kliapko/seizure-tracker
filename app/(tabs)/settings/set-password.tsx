// app/(tabs)/settings/set-password.tsx

import { SetPasswordForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useSetPasswordForm } from "@/hooks"
import { useTranslation } from "react-i18next"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function SetPasswordScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		newPassword,
		setNewPassword,
		confirmPassword,
		setConfirmPassword,
		isLoading,
		error,
		isSuccess,
		handleSave,
	} = useSetPasswordForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title={t("settings.setPassword")} />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<SetPasswordForm
						newPassword={newPassword}
						confirmPassword={confirmPassword}
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
