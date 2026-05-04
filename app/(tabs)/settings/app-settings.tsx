// app/(tabs)/settings/app-settings.tsx

import { AppSettingsForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppSettingsForm, useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function AppSettingsScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		themeMode,
		communicationChannel,
		isLoading,
		isLoadingProfile,
		handleThemeChange,
		handleCommunicationChange,
	} = useAppSettingsForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title={t("settings.appSettings")} />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
				>
					<AppSettingsForm
						themeMode={themeMode}
						communicationChannel={communicationChannel}
						onThemeChange={handleThemeChange}
						onCommunicationChange={handleCommunicationChange}
						isLoading={isLoading || isLoadingProfile}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
