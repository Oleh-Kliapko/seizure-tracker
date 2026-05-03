// components/seizure/datetime/SeizureDateTime.tsx

import { useAppTheme } from "@/hooks"
import { useState } from "react"
import { Switch, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { Divider } from "../../ui"
import { getStyles } from "../getStyles"
import { DateTimeInput } from "./DateTimeInput"
import { getStyles as getDateTimeStyles } from "./getStyles"

type Props = {
	startedAt: number
	endedAt: number | undefined
	onStartChange: (v: number) => void
	onEndChange: (v: number | undefined) => void
}

export function SeizureDateTime({
	startedAt,
	endedAt,
	onStartChange,
	onEndChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const dateTimeStyles = getDateTimeStyles(theme)
	const { t } = useTranslation()
	const [hasEndTime, setHasEndTime] = useState(!!endedAt)

	const toggleEndTime = (value: boolean) => {
		setHasEndTime(value)
		if (!value) onEndChange(undefined)
		else onEndChange(Date.now())
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t('seizure.dateTime')}</Text>

			<DateTimeInput
				label={t('seizure.startTime')}
				value={startedAt}
				onChange={onStartChange}
			/>

			<Divider label="" />

			<View style={dateTimeStyles.switchRow}>
				<Text style={dateTimeStyles.label}>{t('seizure.specifyEndTime')}</Text>
				<Switch
					value={hasEndTime}
					onValueChange={toggleEndTime}
					trackColor={{ true: theme.colors.primary }}
				/>
			</View>

			{hasEndTime && (
				<DateTimeInput
					label={t('seizure.endTime')}
					value={endedAt ?? Date.now()}
					onChange={onEndChange}
				/>
			)}
		</View>
	)
}
