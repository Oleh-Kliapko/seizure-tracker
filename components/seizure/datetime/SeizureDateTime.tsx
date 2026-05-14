// components/seizure/datetime/SeizureDateTime.tsx

import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"
import { getStyles as getDateTimeStyles } from "./getStyles"
import { DateTimeInput } from "./DateTimeInput"
import { DurationPicker } from "./DurationPicker"

type Props = {
	startedAt: number
	durationSeconds: number | undefined
	onStartChange: (v: number) => void
	onDurationChange: (v: number | undefined) => void
}

export function SeizureDateTime({
	startedAt,
	durationSeconds,
	onStartChange,
	onDurationChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const dateTimeStyles = getDateTimeStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("seizure.dateTime")}</Text>

			<DateTimeInput
				label={t("seizure.startTime")}
				value={startedAt}
				onChange={onStartChange}
			/>

			<View style={[dateTimeStyles.switchRow, { marginTop: theme.spacing.sm }]}>
				<Text style={dateTimeStyles.label}>{t("seizure.duration")}</Text>
			</View>
			<DurationPicker value={durationSeconds} onChange={onDurationChange} />
		</View>
	)
}
