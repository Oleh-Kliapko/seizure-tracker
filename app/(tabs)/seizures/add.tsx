// app/(tabs)/seizures/add.tsx

import { SeizureForm } from "@/components/seizure"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useSeizureForm } from "@/hooks"
import { useTranslation } from "react-i18next"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"

export default function AddSeizureScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		startedAt,
		setStartedAt,
		durationSeconds,
		setDurationSeconds,
		types,
		toggleType,
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
			<ScreenHeader title={t("seizure.addTitle")} />
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
						durationSeconds={durationSeconds}
						types={types}
						customType={customType}
						severity={severity}
						internalTriggers={internalTriggers}
						externalTriggers={externalTriggers}
						moodBefore={moodBefore}
						moodAfter={moodAfter}
						sleepHoursBefore={sleepHoursBefore}
						description={description}
						isLoading={isLoading}
						error={error}
						onStartChange={setStartedAt}
						onDurationChange={setDurationSeconds}
						onToggleType={toggleType}
						onCustomTypeChange={setCustomType}
						onSeverityChange={setSeverity}
						onToggleInternal={toggleInternalTrigger}
						onToggleExternal={toggleExternalTrigger}
						onMoodBeforeChange={setMoodBefore}
						onMoodAfterChange={setMoodAfter}
						onSleepHoursChange={setSleepHoursBefore}
						onDescriptionChange={setDescription}
						onSave={handleSave}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
