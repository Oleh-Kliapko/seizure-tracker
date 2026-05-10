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
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { CardHeader } from "./CardHeader"
import { CardVideoUpload } from "./CardVideoUpload"

type Props = {
	seizure: Seizure
	onPress: (s: Seizure) => void
	onVideoUpdated?: (s: Seizure) => void
}

export function SeizureCard({
	seizure: initialSeizure,
	onVideoUpdated,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [seizure, setSeizure] = useState(initialSeizure)
	const bgColor = theme.seizureColors.unknown

	const getTypeLabel = (s: Seizure): string => {
		// backward-compat: old docs have single `type`, new ones have `types[]`
		const types: string[] = s.types?.length ? s.types : [(s as any).type ?? "tonic-clonic"]
		return types
			.map(type => {
				if (type === "custom") return s.customType ?? t("seizureType.custom")
				const found = SEIZURE_TYPES.find(item => item.value === type)
				return found ? t(found.labelKey) : type
			})
			.join(" + ")
	}

	const getTriggerLabel = (
		type: string,
		list: { labelKey: string; value: string }[],
	): string => {
		const found = list.find(item => item.value === type)
		return found ? t(found.labelKey) : type
	}

	const allTriggers = [
		...(seizure.internalTriggers ?? []).map(item =>
			getTriggerLabel(item.type, INTERNAL_TRIGGERS),
		),
		...(seizure.externalTriggers ?? []).map(item =>
			getTriggerLabel(item.type, EXTERNAL_TRIGGERS),
		),
	]

	const handleSeizurePress = (s: Seizure) => {
		router.push({
			pathname: "/(tabs)/seizures/[id]" as any,
			params: { id: s.id },
		})
	}

	const handleVideoUpdated = (updatedSeizure: Seizure) => {
		setSeizure(updatedSeizure)
		onVideoUpdated?.(updatedSeizure)
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
							{MOOD_EMOJI[seizure.moodBefore]} {t("seizure.before")}
						</Text>
					)}
					{seizure.moodAfter && (
						<Text style={styles.cardMoodText}>
							{MOOD_EMOJI[seizure.moodAfter]} {t("seizure.after")}
						</Text>
					)}
				</View>
			)}

			{allTriggers.length > 0 && (
				<View style={styles.cardTriggersRow}>
					{allTriggers.map((trig, i) => (
						<View key={i} style={styles.cardTriggerChip}>
							<Text style={styles.cardTriggerText}>{trig}</Text>
						</View>
					))}
				</View>
			)}

			<View style={{ marginTop: theme.spacing.md }}>
				<CardVideoUpload
					seizure={seizure}
					onVideoUpdated={handleVideoUpdated}
				/>
			</View>
		</TouchableOpacity>
	)
}
