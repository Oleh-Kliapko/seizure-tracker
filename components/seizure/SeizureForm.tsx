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
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { SeizureDateTime } from "./datetime"
import { getStyles } from "./getStyles"
import { SeizureExtra } from "./SeizureExtra"
import { SeizureMood } from "./SeizureMood"
import { SeizureSeverityPicker } from "./SeizureSeverityPicker"
import { SeizureTriggers } from "./SeizureTriggers"
import { SeizureTypePicker } from "./SeizureTypePicker"
type Props = {
	startedAt: number
	durationSeconds: number | undefined
	types: SeizureType[]
	customType: string
	severity: SeizureSeverity | undefined
	internalTriggers: TriggerItem<InternalTrigger>[]
	externalTriggers: TriggerItem<ExternalTrigger>[]
	moodBefore: number | undefined
	moodAfter: number | undefined
	sleepHoursBefore: number | undefined
	description: string
	isLoading: boolean
	error: string | null
	onStartChange: (v: number) => void
	onDurationChange: (v: number | undefined) => void
	onToggleType: (v: SeizureType) => void
	onCustomTypeChange: (v: string) => void
	onSeverityChange: (v: SeizureSeverity) => void
	onToggleInternal: (v: InternalTrigger) => void
	onToggleExternal: (v: ExternalTrigger) => void
	onMoodBeforeChange: (v: number) => void
	onMoodAfterChange: (v: number) => void
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
				durationSeconds={props.durationSeconds}
				onStartChange={props.onStartChange}
				onDurationChange={props.onDurationChange}
			/>
			<SeizureTypePicker
				values={props.types}
				customType={props.customType}
				onToggle={props.onToggleType}
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
				sleepHoursBefore={props.sleepHoursBefore}
				description={props.description}
				onSleepHoursChange={props.onSleepHoursChange}
				onDescriptionChange={props.onDescriptionChange}
			/>

			<View style={styles.errorContainer}>
				{props.error && <Text style={styles.errorText}>{t(props.error)}</Text>}
			</View>

			<Button
				title={props.isLoading ? t("common.saving") : t("common.save")}
				onPress={props.onSave}
				disabled={props.isLoading}
			/>
		</View>
	)
}
