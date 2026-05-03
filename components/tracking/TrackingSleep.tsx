// components/tracking/TrackingSleep.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"

const QUALITY = [1, 2, 3, 4, 5]
const QUALITY_EMOJI: Record<number, string> = {
	1: "😫",
	2: "😴",
	3: "😐",
	4: "🙂",
	5: "😊",
}

type Props = {
	sleepDuration: string
	sleepQuality: number | undefined
	onDurationChange: (v: string) => void
	onQualityChange: (v: number) => void
	onSave: () => void
}

export function TrackingSleep({
	sleepDuration,
	sleepQuality,
	onDurationChange,
	onQualityChange,
	onSave,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t('tracking.sleep')}</Text>

			<Text style={styles.vitalLabel}>{t('tracking.sleepDuration')}</Text>
			<TextInput
				style={[styles.vitalInput, { marginBottom: theme.spacing.md }]}
				value={sleepDuration}
				onChangeText={onDurationChange}
				onBlur={onSave}
				keyboardType="number-pad"
				placeholder="8"
				placeholderTextColor={theme.colors.textSecondary}
				maxLength={2}
			/>

			<Text style={styles.label}>{t('tracking.sleepQuality')}</Text>
			<View style={styles.scaleRow}>
				{QUALITY.map(q => (
					<TouchableOpacity
						key={q}
						style={[styles.scaleBtn, sleepQuality === q && styles.scaleBtnActive]}
						onPress={() => onQualityChange(q)}
						activeOpacity={0.7}
					>
						<Text style={styles.scaleBtnText}>{QUALITY_EMOJI[q]}</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	)
}
