// app/(tabs)/settings/guardians.tsx

import { GuardiansList } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useGuardiansForm } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function GuardiansScreen() {
	const { spacing } = useAppTheme()
	const {
		guardians,
		isLoading,
		isLoadingProfile,
		displayError,
		addGuardian,
		removeGuardian,
		updateGuardian,
		handleSave,
	} = useGuardiansForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Опікуни" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<GuardiansList
						guardians={guardians}
						onAdd={addGuardian}
						onRemove={removeGuardian}
						onUpdate={updateGuardian}
						onSave={handleSave}
						isLoading={isLoading || isLoadingProfile}
						error={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
