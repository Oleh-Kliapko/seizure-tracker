// components/seizure/SeizureSeverityPicker.tsx

import { SEVERITY_LABELS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { SeizureSeverity } from "@/models"
import { Zap } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	value: SeizureSeverity | undefined
	onChange: (v: SeizureSeverity) => void
}

export function SeizureSeverityPicker({ value, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Сила приступу</Text>

			<View style={styles.severityRow}>
				{([1, 2, 3] as SeizureSeverity[]).map(level => {
					const isActive = value !== undefined && value >= level
					return (
						<TouchableOpacity
							key={level}
							onPress={() => onChange(level)}
							activeOpacity={0.7}
						>
							<Zap
								size={36}
								color={isActive ? theme.colors.primary : theme.colors.border}
								fill={isActive ? theme.colors.primary : "transparent"}
							/>
						</TouchableOpacity>
					)
				})}
			</View>

			{value && (
				<Text style={[styles.sublabel, { marginTop: theme.spacing.sm }]}>
					{SEVERITY_LABELS[value]}
				</Text>
			)}
		</View>
	)
}
