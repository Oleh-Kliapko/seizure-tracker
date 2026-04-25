// app/(tabs)/settings/personal.tsx

import { PersonalForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, usePersonalForm } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function PersonalScreen() {
	const { spacing } = useAppTheme()
	const {
		fields,
		birthDate,
		setBirthDate,
		isLoading,
		isLoadingProfile,
		displayError,
		handleSave,
	} = usePersonalForm()

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
						birthDate={birthDate}
						onBirthDateChange={setBirthDate}
						onSave={handleSave}
						isLoading={isLoading || isLoadingProfile}
						displayError={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
