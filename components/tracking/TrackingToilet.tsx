// components/tracking/TrackingToilet.tsx

import { useAppTheme } from "@/hooks"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	urinationCount: number
	bowelMovements: number
	onUrinationChange: (v: number) => void
	onBowelChange: (v: number) => void
}

function Stepper({
	label,
	value,
	onChange,
	styles,
}: {
	label: string
	value: number
	onChange: (v: number) => void
	styles: ReturnType<typeof getStyles>
}) {
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.stepperRow}>
				<TouchableOpacity
					style={styles.stepperBtn}
					onPress={() => onChange(Math.max(0, value - 1))}
					activeOpacity={0.7}
				>
					<Text style={styles.stepperBtnText}>−</Text>
				</TouchableOpacity>
				<Text style={styles.stepperValue}>{value}</Text>
				<TouchableOpacity
					style={styles.stepperBtn}
					onPress={() => onChange(value + 1)}
					activeOpacity={0.7}
				>
					<Text style={styles.stepperBtnText}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export function TrackingToilet({
	urinationCount,
	bowelMovements,
	onUrinationChange,
	onBowelChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Фізіологія</Text>
			<Stepper
				label="Сечовипускань"
				value={urinationCount}
				onChange={onUrinationChange}
				styles={styles}
			/>
			<View style={styles.divider} />
			<Stepper
				label="Випорожнень"
				value={bowelMovements}
				onChange={onBowelChange}
				styles={styles}
			/>
		</View>
	)
}
