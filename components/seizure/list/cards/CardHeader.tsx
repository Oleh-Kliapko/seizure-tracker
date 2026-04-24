// components/seizure/list/cards/CardHeader.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { Zap } from "lucide-react-native"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
}

function formatDate(ts: number): string {
	return new Date(ts).toLocaleDateString("uk-UA", {
		weekday: "short",
		day: "2-digit",
		month: "long",
		year: "numeric",
	})
}

function formatTime(ts: number): string {
	return new Date(ts).toLocaleTimeString("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
	})
}

function formatDuration(start: number, end?: number): string {
	if (!end) return ""
	const mins = Math.round((end - start) / 60000)
	if (mins < 60) return `${mins} хв`
	const h = Math.floor(mins / 60)
	const m = mins % 60
	return m > 0 ? `${h} год ${m} хв` : `${h} год`
}

export function CardHeader({ seizure }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const duration = formatDuration(seizure.startedAt, seizure.endedAt)
	const timeStr = seizure.endedAt
		? `${formatTime(seizure.startedAt)} — ${formatTime(seizure.endedAt)}`
		: formatTime(seizure.startedAt)

	return (
		<View style={styles.cardHeader}>
			<View>
				<Text style={styles.cardDate}>{formatDate(seizure.startedAt)}</Text>
				<Text style={styles.cardTime}>
					{timeStr}
					{duration ? `  •  ${duration}` : ""}
				</Text>
			</View>
			<View style={styles.severityRow}>
				{[1, 2, 3].map(level => (
					<Zap
						key={level}
						size={16}
						color={theme.colors.primary}
						fill={
							seizure.severity && seizure.severity >= level
								? theme.colors.primary
								: "transparent"
						}
					/>
				))}
			</View>
		</View>
	)
}
