// components/seizure/list/cards/CardHeader.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { formatDate, formatDurationSeconds, formatTime } from "@/utils/seizureFormatters"
import { Zap } from "lucide-react-native"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
}

export function CardHeader({ seizure }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const duration = formatDurationSeconds(seizure.durationSeconds)
	const timeStr = formatTime(seizure.startedAt)

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
						size={32}
						color="#FFCA28"
						fill={
							seizure.severity && seizure.severity >= level
								? "#FFCA28"
								: "transparent"
						}
					/>
				))}
			</View>
		</View>
	)
}
