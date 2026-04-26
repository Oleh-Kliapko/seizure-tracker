// app/(tabs)/tracking.tsx

import {
	TrackingMedications,
	TrackingNotes,
	TrackingSleep,
	TrackingToilet,
	TrackingTriggers,
	TrackingVitals,
	TrackingWellbeing,
} from "@/components/tracking"
import { ScreenWrapper } from "@/components/ui"
import { useAppTheme, useTrackingForm } from "@/hooks"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function TrackingScreen() {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const {
		temperature,
		setTemperature,
		pulse,
		setPulse,
		systolicPressure,
		setSystolicPressure,
		diastolicPressure,
		setDiastolicPressure,
		oxygenSaturation,
		setOxygenSaturation,
		sleepDuration,
		setSleepDuration,
		sleepQuality,
		setSleepQuality,
		mood,
		setMood,
		activityLevel,
		setActivityLevel,
		urinationCount,
		setUrinationCount,
		bowelMovements,
		setBowelMovements,
		internalTriggers,
		externalTriggers,
		toggleInternalTrigger,
		toggleExternalTrigger,
		medications,
		takenMeds,
		toggleMedication,
		patientNotes,
		setPatientNotes,
		isLoading,
		isSaving,
		isSaved,
		error,
		handleSave,
	} = useTrackingForm()

	const today = format(new Date(), "d MMMM yyyy", { locale: uk })

	return (
		<ScreenWrapper>
			<View
				style={{
					paddingHorizontal: spacing.lg,
					paddingTop: spacing.lg,
					paddingBottom: spacing.sm,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View>
					<Text
						style={{
							fontFamily: fonts.bold,
							fontSize: fontSize.xl,
							color: colors.onSurface,
						}}
					>
						Трекінг
					</Text>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: fontSize.sm,
							color: colors.textSecondary,
							marginTop: 2,
						}}
					>
						{today}
					</Text>
				</View>

				<TouchableOpacity
					onPress={handleSave}
					disabled={isSaving}
					style={{
						backgroundColor: isSaved ? colors.success ?? "#4CAF50" : colors.primary,
						paddingHorizontal: spacing.lg,
						paddingVertical: spacing.sm,
						borderRadius: radius.md,
						opacity: isSaving ? 0.7 : 1,
					}}
					activeOpacity={0.8}
				>
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.md,
							color: "#fff",
						}}
					>
						{isSaved ? "Збережено ✓" : "Зберегти"}
					</Text>
				</TouchableOpacity>
			</View>

			{error && (
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.error,
						textAlign: "center",
						paddingHorizontal: spacing.lg,
						paddingBottom: spacing.sm,
					}}
				>
					{error}
				</Text>
			)}

			{isLoading ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={colors.primary} />
				</View>
			) : (
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<ScrollView
						contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<TrackingWellbeing
							mood={mood}
							activityLevel={activityLevel}
							onMoodChange={setMood}
							onActivityChange={setActivityLevel}
						/>

						<TrackingVitals
							temperature={temperature}
							pulse={pulse}
							systolicPressure={systolicPressure}
							diastolicPressure={diastolicPressure}
							oxygenSaturation={oxygenSaturation}
							onTemperatureChange={setTemperature}
							onPulseChange={setPulse}
							onSystolicChange={setSystolicPressure}
							onDiastolicChange={setDiastolicPressure}
							onOxygenChange={setOxygenSaturation}
						/>

						<TrackingSleep
							sleepDuration={sleepDuration}
							sleepQuality={sleepQuality}
							onDurationChange={setSleepDuration}
							onQualityChange={setSleepQuality}
						/>

						<TrackingMedications
							medications={medications}
							takenMeds={takenMeds}
							onToggle={toggleMedication}
						/>

						<TrackingToilet
							urinationCount={urinationCount}
							bowelMovements={bowelMovements}
							onUrinationChange={setUrinationCount}
							onBowelChange={setBowelMovements}
						/>

						<TrackingTriggers
							internalTriggers={internalTriggers}
							externalTriggers={externalTriggers}
							onToggleInternal={toggleInternalTrigger}
							onToggleExternal={toggleExternalTrigger}
						/>

						<TrackingNotes value={patientNotes} onChange={setPatientNotes} />
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</ScreenWrapper>
	)
}
