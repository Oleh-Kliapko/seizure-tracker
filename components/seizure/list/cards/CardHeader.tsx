// components/seizure/list/cards/CardHeader.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { Zap } from "lucide-react-native"
import { Text, View } from "react-native"
import i18n from "@/config/i18n"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
}

function formatDate(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleDateString(locale, {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

function formatTime(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleTimeString(locale, {
		hour: "2-digit",
		minute: "2-digit",
	})
}

function formatDuration(start: number, end?: number): string {
	if (!end) return ""
	const mins = Math.round((end - start) / 60000)
	const min = i18n.t("common.minutesShort")
	const hr = i18n.t("common.hoursShort")
	if (mins < 60) return `${mins} ${min}`
	const h = Math.floor(mins / 60)
	const m = mins % 60
	return m > 0 ? `${h} ${hr} ${m} ${min}` : `${h} ${hr}`
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
