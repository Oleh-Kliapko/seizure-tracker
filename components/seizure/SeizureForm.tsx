// components/seizure/SeizureForm.tsx

import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import {
	ExternalTrigger,
	InternalTrigger,
	SeizureSeverity,
	SeizureType,
	TriggerItem,
} from "@/models"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"
import { SeizureDateTime } from "./datetime"
import { SeizureExtra } from "./SeizureExtra"
import { SeizureMood } from "./SeizureMood"
import { SeizureSeverityPicker } from "./SeizureSeverityPicker"
import { SeizureTriggers } from "./SeizureTriggers"
import { SeizureTypePicker } from "./SeizureTypePicker"
type Props = {
	startedAt: number
	endedAt: number | undefined
	type: SeizureType
	customType: string
	severity: SeizureSeverity | undefined
	internalTriggers: TriggerItem<InternalTrigger>[]
	externalTriggers: TriggerItem<ExternalTrigger>[]
	moodBefore: number | undefined
	moodAfter: number | undefined
	isMedicationTaken: boolean
	sleepHoursBefore: number | undefined
	description: string
	isLoading: boolean
	error: string | null
	onStartChange: (v: number) => void
	onEndChange: (v: number | undefined) => void
	onTypeChange: (v: SeizureType) => void
	onCustomTypeChange: (v: string) => void
	onSeverityChange: (v: SeizureSeverity) => void
	onToggleInternal: (v: InternalTrigger) => void
	onToggleExternal: (v: ExternalTrigger) => void
	onMoodBeforeChange: (v: number) => void
	onMoodAfterChange: (v: number) => void
	onMedicationChange: (v: boolean) => void
	onSleepHoursChange: (v: number | undefined) => void
	onDescriptionChange: (v: string) => void
	onSave: () => void
}

export function SeizureForm(props: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View>
			<SeizureDateTime
				startedAt={props.startedAt}
				endedAt={props.endedAt}
				onStartChange={props.onStartChange}
				onEndChange={props.onEndChange}
			/>
			<SeizureTypePicker
				value={props.type}
				customType={props.customType}
				onChange={props.onTypeChange}
				onCustomChange={props.onCustomTypeChange}
			/>
			<SeizureSeverityPicker
				value={props.severity}
				onChange={props.onSeverityChange}
			/>
			<SeizureTriggers
				internalTriggers={props.internalTriggers}
				externalTriggers={props.externalTriggers}
				onToggleInternal={props.onToggleInternal}
				onToggleExternal={props.onToggleExternal}
			/>
			<SeizureMood
				moodBefore={props.moodBefore}
				moodAfter={props.moodAfter}
				onMoodBeforeChange={props.onMoodBeforeChange}
				onMoodAfterChange={props.onMoodAfterChange}
			/>
			<SeizureExtra
				isMedicationTaken={props.isMedicationTaken}
				sleepHoursBefore={props.sleepHoursBefore}
				description={props.description}
				onMedicationChange={props.onMedicationChange}
				onSleepHoursChange={props.onSleepHoursChange}
				onDescriptionChange={props.onDescriptionChange}
			/>

			<View style={styles.errorContainer}>
				{props.error && <Text style={styles.errorText}>{t(props.error)}</Text>}
			</View>

			<Button
				title={props.isLoading ? t('common.saving') : t('common.save')}
				onPress={props.onSave}
				disabled={props.isLoading}
			/>
		</View>
	)
}
