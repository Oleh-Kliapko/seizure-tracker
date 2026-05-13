// app/(tabs)/tracking/[date].tsx

import {
	TrackingMedications,
	TrackingNotes,
	TrackingSleep,
	TrackingToilet,
	TrackingVitals,
	TrackingWellbeing,
} from "@/components/tracking"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useTrackingForm } from "@/hooks"
import { useLocalSearchParams } from "expo-router"
import { useTranslation } from "react-i18next"
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native"

function parseDateParam(dateStr: string): number {
	const [year, month, day] = dateStr.split("-").map(Number)
	return new Date(year, month - 1, day).getTime()
}

function formatDateLabel(dateStr: string): string {
	const [year, month, day] = dateStr.split("-").map(Number)
	return new Date(year, month - 1, day).toLocaleDateString("uk-UA", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})
}

export default function TrackingDayScreen() {
	const { colors, fonts, fontSize, spacing } = useAppTheme()
	const { t } = useTranslation()
	const { date } = useLocalSearchParams<{ date: string }>()

	const dateTimestamp = parseDateParam(date)
	const {
		temperature, setTemperature,
		pulse, setPulse,
		systolicPressure, setSystolicPressure,
		diastolicPressure, setDiastolicPressure,
		oxygenSaturation, setOxygenSaturation,
		sleepDuration, setSleepDuration,
		sleepQuality, setSleepQuality,
		mood, setMood,
		activityLevel, setActivityLevel,
		urinationCount, setUrinationCount,
		bowelMovements, setBowelMovements,
		medications, medIntakes, addIntake, removeIntake,
		patientNotes, setPatientNotes,
		doctorNotes, setDoctorNotes,
		isLoading, error, autoSave,
	} = useTrackingForm(dateTimestamp)

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={t("tracking.title")}
				subtitle={formatDateLabel(date)}
				showBackButton
			/>

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
						contentContainerStyle={{ padding: spacing.lg }}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<TrackingWellbeing
							mood={mood}
							activityLevel={activityLevel}
							onMoodChange={v => { setMood(v); autoSave({ mood: v }) }}
							onActivityChange={v => { setActivityLevel(v); autoSave({ activityLevel: v }) }}
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
							onSave={autoSave}
						/>
						<TrackingSleep
							sleepDuration={sleepDuration}
							sleepQuality={sleepQuality}
							onDurationChange={setSleepDuration}
							onQualityChange={v => { setSleepQuality(v); autoSave({ sleepQuality: v }) }}
							onSave={autoSave}
						/>
						<TrackingMedications
							medications={medications}
							medIntakes={medIntakes}
							onAddIntake={addIntake}
							onRemoveIntake={removeIntake}
						/>
						<TrackingToilet
							urinationCount={urinationCount}
							bowelMovements={bowelMovements}
							onUrinationChange={v => { setUrinationCount(v); autoSave({ urinationCount: v }) }}
							onBowelChange={v => { setBowelMovements(v); autoSave({ bowelMovements: v }) }}
						/>
						<TrackingNotes
							patientNotes={patientNotes}
							doctorNotes={doctorNotes}
							onPatientNotesChange={setPatientNotes}
							onDoctorNotesChange={setDoctorNotes}
							onSave={autoSave}
						/>
						{error && (
							<Text style={{
								fontFamily: fonts.regular,
								fontSize: fontSize.sm,
								color: colors.error,
								textAlign: "center",
								marginTop: spacing.md,
								marginBottom: spacing.lg,
							}}>
								{t(error)}
							</Text>
						)}
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</ScreenWrapper>
	)
}
