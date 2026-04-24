// components/seizure/list/cards/SeizureCard.tsx

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	MOOD_EMOJI,
	SEIZURE_TYPES,
} from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { router } from "expo-router"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { getSeizureColor } from "../getSeizureColor"
import { getStyles } from "../getStyles"
import { CardHeader } from "./CardHeader"
import { CardVideoUpload } from "./CardVideoUpload"

type Props = {
	seizure: Seizure
	onPress: (s: Seizure) => void
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
	const [updateTrigger, setUpdateTrigger] = useState(0)

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

	const handleVideoUpdated = () => {
		setUpdateTrigger(prev => prev + 1)
	}

	return (
		<TouchableOpacity
			style={[styles.card, { backgroundColor: bgColor }]}
			onPress={() => handleSeizurePress(seizure)}
			activeOpacity={0.8}
		>
			<CardHeader seizure={seizure} />

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

			<View style={{ marginTop: theme.spacing.md }}>
				<CardVideoUpload
					key={`video-${updateTrigger}`}
					seizure={seizure}
					onVideoUpdated={handleVideoUpdated}
				/>
			</View>
		</TouchableOpacity>
	)
}
