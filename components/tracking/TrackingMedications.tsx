// components/tracking/TrackingMedications.tsx

import { useAppTheme } from "@/hooks"
import { Medication } from "@/models/medication"
import { router } from "expo-router"
import { Switch, Text, TouchableOpacity, View } from "react-native"
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
				<TouchableOpacity
					onPress={() => router.push("/(tabs)/settings/medications" as any)}
					activeOpacity={0.7}
				>
					<Text style={[styles.emptyText, { color: theme.colors.primary }]}>
						+ Додати ліки у профілі
					</Text>
				</TouchableOpacity>
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
