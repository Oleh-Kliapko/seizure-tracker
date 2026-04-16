// app/(tabs)/settings/medical.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { MedicalForm } from "@/components/ui/settings"
import { useAppTheme, useMedicalForm } from "@/hooks"
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
		isLoading,
		isLoadingProfile,
		displayError,
		handleSave,
	} = useMedicalForm()

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
						onMonthChange={setMonth}
						onYearChange={setYear}
						onBloodTypeChange={setBloodType}
						onRhFactorChange={setRhFactor}
						onHeightChange={setHeight}
						onWeightChange={setWeight}
						onAnamnesisChange={setAnamnesis}
						onSave={handleSave}
						isLoading={isLoading || isLoadingProfile}
						error={displayError}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
