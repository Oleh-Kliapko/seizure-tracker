// components/seizure/SeizureMood.tsx

import { MOOD_EMOJI, MOODS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	moodBefore: number | undefined
	moodAfter: number | undefined
	onMoodBeforeChange: (v: number) => void
	onMoodAfterChange: (v: number) => void
}

export function SeizureMood({
	moodBefore,
	moodAfter,
	onMoodBeforeChange,
	onMoodAfterChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("seizure.mood")}</Text>

			<Text style={styles.label}>{t("seizure.moodBefore")}</Text>
			<View style={styles.moodRow}>
				{MOODS.map(m => (
					<TouchableOpacity
						key={m}
						style={[styles.moodBtn, moodBefore === m && styles.moodBtnActive]}
						onPress={() => onMoodBeforeChange(m)}
						activeOpacity={0.7}
					>
						<Text style={styles.moodBtnText}>{MOOD_EMOJI[m]}</Text>
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.divider} />

			<Text style={styles.label}>{t("seizure.moodAfter")}</Text>
			<View style={styles.moodRow}>
				{MOODS.map(m => (
					<TouchableOpacity
						key={m}
						style={[styles.moodBtn, moodAfter === m && styles.moodBtnActive]}
						onPress={() => onMoodAfterChange(m)}
						activeOpacity={0.7}
					>
						<Text style={styles.moodBtnText}>{MOOD_EMOJI[m]}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}
