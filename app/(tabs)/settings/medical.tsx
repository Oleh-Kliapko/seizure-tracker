// app/(tabs)/settings/medical.tsx

import { MedicalForm } from "@/components/settings"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useMedicalForm } from "@/hooks"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function MedicalScreen() {
	const { spacing } = useAppTheme()
	const {
		month,
		setMonth,
		year,
		setYear,
		bloodType,
		setBloodType,
		rhFactor,
		setRhFactor,
		height,
		setHeight,
		weight,
		setWeight,
		anamnesis,
		setAnamnesis,
		displayError,
		autoSave,
	} = useMedicalForm()

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
			<ScreenHeader title="Медичні дані" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<MedicalForm
						month={month}
						year={year}
						bloodType={bloodType}
						rhFactor={rhFactor}
						height={height}
						weight={weight}
						anamnesis={anamnesis}
						onMonthChange={v => {
							setMonth(v)
							autoSave({ month: v })
						}}
						onYearChange={v => {
							setYear(v)
							autoSave({ year: v })
						}}
						onBloodTypeChange={v => {
							setBloodType(v)
							autoSave({ bloodType: v })
						}}
						onRhFactorChange={v => {
							setRhFactor(v)
							autoSave({ rhFactor: v })
						}}
						onHeightChange={setHeight}
						onWeightChange={setWeight}
						onAnamnesisChange={setAnamnesis}
						onBlur={autoSave}
						error={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
