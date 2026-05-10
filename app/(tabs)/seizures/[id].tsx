// app/(tabs)/seizures/[id].tsx

import { SeizureForm } from "@/components/seizure"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme, useSeizureEditForm } from "@/hooks"
import { Trash2 } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from "react-native"

export default function EditSeizureScreen() {
	const { spacing, colors } = useAppTheme()
	const { t } = useTranslation()
	const {
		startedAt,
		setStartedAt,
		endedAt,
		setEndedAt,
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
		isMedicationTaken,
		setIsMedicationTaken,
		sleepHoursBefore,
		setSleepHoursBefore,
		description,
		setDescription,
		isLoading,
		isFetching,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		handleSave,
		handleDelete,
	} = useSeizureEditForm()

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={t("seizure.editTitle")}
				right={
					<Button
						title=""
						icon={<Trash2 size={spacing.lg} color={colors.error} />}
						onPress={handleDelete}
						variant="secondary"
						style={{
							backgroundColor: "transparent",
							borderColor: "transparent",
							paddingHorizontal: spacing.sm,
						}}
					/>
				}
			/>

			{isFetching ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator color={colors.primary} size="large" />
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
						<SeizureForm
							startedAt={startedAt}
							endedAt={endedAt}
							types={types}
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
							onToggleType={toggleType}
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
			)}
		</ScreenWrapper>
	)
}
