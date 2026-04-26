// components/tracking/TrackingMedications.tsx

import { useAppTheme } from "@/hooks"
import { Medication } from "@/models/medication"
import { Switch, Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	medications: Medication[]
	takenMeds: Record<string, boolean>
	onToggle: (id: string) => void
}

export function TrackingMedications({ medications, takenMeds, onToggle }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Ліки</Text>

			{medications.length === 0 ? (
				<Text style={styles.emptyText}>Ліки не додані</Text>
			) : (
				medications.map((med, index) => (
					<View key={med.id}>
						{index > 0 && <View style={styles.divider} />}
						<View style={styles.medRow}>
							<View style={{ flex: 1 }}>
								<Text style={styles.medName}>{med.name}</Text>
								<Text style={styles.medDose}>
									{med.dose}
									{med.scheduledTimes && med.scheduledTimes.length > 0
										? ` · ${med.scheduledTimes.join(", ")}`
										: ""}
								</Text>
							</View>
							<Switch
								value={takenMeds[med.id] ?? false}
								onValueChange={() => onToggle(med.id)}
								trackColor={{
									false: theme.colors.border,
									true: theme.colors.primary,
								}}
								thumbColor="#fff"
							/>
						</View>
					</View>
				))
			)}
		</View>
	)
}
