// components/seizure/datetime/SeizureDateTime.tsx

import { useAppTheme } from "@/hooks"
import { useState } from "react"
import { Switch, Text, View } from "react-native"
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
	const [hasEndTime, setHasEndTime] = useState(!!endedAt)

	const toggleEndTime = (value: boolean) => {
		setHasEndTime(value)
		if (!value) onEndChange(undefined)
		else onEndChange(Date.now())
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Час приступу</Text>

			<DateTimeInput
				label="Початок"
				value={startedAt}
				onChange={onStartChange}
			/>

			<Divider label="" />

			<View style={dateTimeStyles.switchRow}>
				<Text style={dateTimeStyles.label}>Вказати час закінчення</Text>
				<Switch
					value={hasEndTime}
					onValueChange={toggleEndTime}
					trackColor={{ true: theme.colors.primary }}
				/>
			</View>

			{hasEndTime && (
				<DateTimeInput
					label="Закінчення"
					value={endedAt ?? Date.now()}
					onChange={onEndChange}
				/>
			)}
		</View>
	)
}
