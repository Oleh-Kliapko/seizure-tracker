// app/(tabs)/settings/personal.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { PersonalForm } from "@/components/ui/settings"
import { useAppTheme, usePersonalForm } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function PersonalScreen() {
	const { spacing } = useAppTheme()
	const { fields, isLoading, isLoadingProfile, displayError, handleSave } =
		usePersonalForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Особисті дані" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{
						padding: spacing.lg,
					}}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<PersonalForm
						fields={fields}
						onSave={handleSave}
						isLoading={isLoading || isLoadingProfile}
						displayError={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
