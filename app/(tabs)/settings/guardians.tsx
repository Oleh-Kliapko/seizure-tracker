// app/(tabs)/settings/guardians.tsx

import { GuardiansList } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useGuardiansForm } from "@/hooks"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { useTranslation } from "react-i18next"

export default function GuardiansScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		guardians,
		displayError,
		addGuardian,
		removeGuardian,
		updateGuardian,
		autoSave,
	} = useGuardiansForm()

	useFocusEffect(
		useCallback(
			() => () => {
				autoSave()
			},
			[autoSave],
		),
	)

	return (
		<ScreenWrapper>
			<ScreenHeader title={t('settings.guardians')} />
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
						onBlur={autoSave}
						error={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
