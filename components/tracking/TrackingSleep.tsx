// components/tracking/TrackingSleep.tsx

import { useAppTheme } from "@/hooks"
import { VITAL_BOUNDS } from "@/utils"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
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
	const isDirty = useRef(false)
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleDurationChange = (v: string) => {
		isDirty.current = true
		onDurationChange(v)
	}

	const handleDurationBlur = () => {
		if (isDirty.current) {
			isDirty.current = false
			if (timerRef.current) clearTimeout(timerRef.current)
			setShowCheck(true)
			timerRef.current = setTimeout(() => setShowCheck(false), 2000)
		}
		if (!sleepDuration) { onSave(); return }
		const n = parseFloat(sleepDuration)
		const { min, max } = VITAL_BOUNDS.sleepDuration
		if (isNaN(n) || n < min || n > max) {
			Alert.alert(t("common.error"), t("tracking.error.sleepDuration"))
			onDurationChange("")
			return
		}
		onSave()
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("tracking.sleep")}</Text>

			<Text style={styles.vitalLabel}>{t("tracking.sleepDuration")}</Text>
			<View style={{ position: "relative", marginBottom: theme.spacing.md }}>
				<TextInput
					style={styles.vitalInput}
					value={sleepDuration}
					onChangeText={handleDurationChange}
					onBlur={handleDurationBlur}
					keyboardType="number-pad"
					placeholder="8"
					placeholderTextColor={theme.colors.textSecondary}
					maxLength={2}
				/>
				{showCheck && (
					<View style={{ position: "absolute", right: 8, top: 0, bottom: 0, justifyContent: "center" }}>
						<Check size={13} color="#22C55E" />
					</View>
				)}
			</View>

			<Text style={styles.label}>{t("tracking.sleepQuality")}</Text>
			<View style={styles.scaleRow}>
				{QUALITY.map(q => (
					<TouchableOpacity
						key={q}
						style={[
							styles.scaleBtn,
							sleepQuality === q && styles.scaleBtnActive,
						]}
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
