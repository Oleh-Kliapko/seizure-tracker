// app/(tabs)/settings/personal.tsx

import { PersonalForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, usePersonalForm } from "@/hooks"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function PersonalScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const { fields, birthDate, setBirthDate, displayError, autoSave } =
		usePersonalForm()

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
			<ScreenHeader title={t("settings.personal")} />
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
						onBirthDateChange={v => {
							setBirthDate(v)
							autoSave({ birthDate: v })
						}}
						onBlur={autoSave}
						displayError={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
