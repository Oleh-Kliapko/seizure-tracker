// app/(tabs)/settings/app-settings.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { AppSettingsForm } from "@/components/ui/settings"
import { useAppSettingsForm, useAppTheme } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function AppSettingsScreen() {
	const { spacing } = useAppTheme()
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
			<ScreenHeader title="Налаштування" />
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
