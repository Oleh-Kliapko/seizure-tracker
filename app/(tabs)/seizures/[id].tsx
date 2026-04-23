// app/(tabs)/seizures/[id].tsx

import { SeizureForm } from "@/components/seizure"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { useAppTheme, useSeizureEditForm } from "@/hooks"
import { Trash2 } from "lucide-react-native"
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from "react-native"

export default function EditSeizureScreen() {
	const { spacing, colors } = useAppTheme()
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
		videoUrl,
		setVideoUrl,
		isLoading,
		isFetching,
		error,
		toggleInternalTrigger,
		toggleExternalTrigger,
		handleSave,
		handleDelete,
		isUploading,
		uploadProgress,
		cancelUpload,
	} = useSeizureEditForm()

	return (
		<ScreenWrapper>
			<ScreenHeader
				title="Редагувати приступ"
				right={
					<Button
						title=""
						icon={<Trash2 size={spacing.lg} color={colors.error} />}
						onPress={handleDelete}
						variant="secondary"
						style={{
							backgroundColor: "transparent",
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
							videoUrl={videoUrl}
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
							onVideoChange={setVideoUrl}
							onSave={handleSave}
							isUploading={isUploading}
							uploadProgress={uploadProgress}
							onCancelUpload={cancelUpload}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</ScreenWrapper>
	)
}
