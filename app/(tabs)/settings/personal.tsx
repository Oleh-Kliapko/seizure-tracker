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
		displayError,
		autoSave,
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
						onBirthDateChange={v => { setBirthDate(v); autoSave({ birthDate: v }) }}
						onBlur={autoSave}
						displayError={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
