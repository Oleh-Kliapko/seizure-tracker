// components/seizure/list/SeizureCard.tsx

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	MOOD_EMOJI,
	SEIZURE_TYPES,
} from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { router } from "expo-router"
import { Zap } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getSeizureColor } from "./getSeizureColor"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
	onPress: (s: Seizure) => void
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

function getTypeLabel(seizure: Seizure): string {
	if (seizure.type === "custom") return seizure.customType ?? "Інший"
	return (
		SEIZURE_TYPES.find(t => t.value === seizure.type)?.label ?? seizure.type
	)
}

function getTriggerLabel(
	type: string,
	list: { label: string; value: string }[],
): string {
	return list.find(t => t.value === type)?.label ?? type
}

export function SeizureCard({ seizure, onPress }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const bgColor = getSeizureColor(theme, seizure.severity)

	const duration = formatDuration(seizure.startedAt, seizure.endedAt)
	const timeStr = seizure.endedAt
		? `${formatTime(seizure.startedAt)} — ${formatTime(seizure.endedAt)}`
		: formatTime(seizure.startedAt)

	const allTriggers = [
		...(seizure.internalTriggers ?? []).map(t =>
			getTriggerLabel(t.type, INTERNAL_TRIGGERS),
		),
		...(seizure.externalTriggers ?? []).map(t =>
			getTriggerLabel(t.type, EXTERNAL_TRIGGERS),
		),
	]

	const handleSeizurePress = (s: Seizure) => {
		router.push({
			pathname: "/(tabs)/seizures/[id]" as any,
			params: { id: s.id },
		})
	}

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: bgColor }]}
			onPress={() => handleSeizurePress(seizure)}
			activeOpacity={0.8}
		>
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

			<Text style={styles.cardType}>{getTypeLabel(seizure)}</Text>

			{(seizure.moodBefore || seizure.moodAfter) && (
				<View style={styles.cardMoodRow}>
					{seizure.moodBefore && (
						<Text style={styles.cardMoodText}>
							{MOOD_EMOJI[seizure.moodBefore]} до
						</Text>
					)}
					{seizure.moodAfter && (
						<Text style={styles.cardMoodText}>
							{MOOD_EMOJI[seizure.moodAfter]} після
						</Text>
					)}
				</View>
			)}

			{allTriggers.length > 0 && (
				<View style={styles.cardTriggersRow}>
					{allTriggers.map((t, i) => (
						<View key={i} style={styles.cardTriggerChip}>
							<Text style={styles.cardTriggerText}>{t}</Text>
						</View>
					))}
				</View>
			)}
		</TouchableOpacity>
	)
}
