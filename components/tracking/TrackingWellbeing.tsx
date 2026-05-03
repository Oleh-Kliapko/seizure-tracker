// components/tracking/TrackingWellbeing.tsx

import { MOOD_EMOJI, MOODS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"

const ACTIVITY_EMOJI: Record<number, string> = {
	1: "🛋️",
	2: "🚶",
	3: "🏃",
	4: "💪",
	5: "🔥",
}

type Props = {
	mood: number | undefined
	activityLevel: number | undefined
	onMoodChange: (v: number) => void
	onActivityChange: (v: number) => void
}

export function TrackingWellbeing({
	mood,
	activityLevel,
	onMoodChange,
	onActivityChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t('tracking.wellbeing')}</Text>

			<Text style={styles.label}>{t('tracking.mood')}</Text>
			<View style={styles.scaleRow}>
				{MOODS.map(m => (
					<TouchableOpacity
						key={m}
						style={[styles.scaleBtn, mood === m && styles.scaleBtnActive]}
						onPress={() => onMoodChange(m)}
						activeOpacity={0.7}
					>
						<Text style={styles.scaleBtnText}>{MOOD_EMOJI[m]}</Text>
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.divider} />

			<Text style={styles.label}>{t('tracking.activity')}</Text>
			<View style={styles.scaleRow}>
				{MOODS.map(a => (
					<TouchableOpacity
						key={a}
						style={[
							styles.scaleBtn,
							activityLevel === a && styles.scaleBtnActive,
						]}
						onPress={() => onActivityChange(a)}
						activeOpacity={0.7}
					>
						<Text style={styles.scaleBtnText}>{ACTIVITY_EMOJI[a]}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}
