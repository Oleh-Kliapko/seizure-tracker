// app/(tabs)/seizures/add.tsx

import { SeizureForm } from "@/components/seizure"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useSeizureForm } from "@/hooks"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function AddSeizureScreen() {
	const { spacing } = useAppTheme()
	const {
		startedAt,
		setStartedAt,
		endedAt,
		setEndedAt,
		type,
		setType,
		customType,
		setCustomType,
		severity,
		setSeverity,
		internalTriggers,
		externalTriggers,
		moodBefore,
		setMoodBefore,
		moodAfter,
		setMoodAfter,
		isMedicationTaken,
		setIsMedicationTaken,
		sleepHoursBefore,
		setSleepHoursBefore,
		description,
		setDescription,
		isLoading,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		handleSave,
	} = useSeizureForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Додати приступ" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<SeizureForm
						startedAt={startedAt}
						endedAt={endedAt}
						type={type}
						customType={customType}
						severity={severity}
						internalTriggers={internalTriggers}
						externalTriggers={externalTriggers}
						moodBefore={moodBefore}
						moodAfter={moodAfter}
						isMedicationTaken={isMedicationTaken}
						sleepHoursBefore={sleepHoursBefore}
						description={description}
						isLoading={isLoading}
						error={error}
						onStartChange={setStartedAt}
						onEndChange={setEndedAt}
						onTypeChange={setType}
						onCustomTypeChange={setCustomType}
						onSeverityChange={setSeverity}
						onToggleInternal={toggleInternalTrigger}
						onToggleExternal={toggleExternalTrigger}
						onMoodBeforeChange={setMoodBefore}
						onMoodAfterChange={setMoodAfter}
						onMedicationChange={setIsMedicationTaken}
						onSleepHoursChange={setSleepHoursBefore}
						onDescriptionChange={setDescription}
						onSave={handleSave}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
