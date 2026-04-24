// components/seizure/SeizureExtra.tsx

import { Divider, FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Switch, Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	isMedicationTaken: boolean
	sleepHoursBefore: number | undefined
	description: string
	onMedicationChange: (v: boolean) => void
	onSleepHoursChange: (v: number | undefined) => void
	onDescriptionChange: (v: string) => void
}

export function SeizureExtra({
	isMedicationTaken,
	sleepHoursBefore,
	description,
	onMedicationChange,
	onSleepHoursChange,
	onDescriptionChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Додатково</Text>

			<View style={styles.switchRow}>
				<View>
					<Text style={styles.label}>Ліки прийняті</Text>
					<Text style={styles.sublabel}>
						Чи приймав пацієнт ліки перед приступом
					</Text>
				</View>
				<Switch
					value={isMedicationTaken}
					onValueChange={onMedicationChange}
					trackColor={{ true: theme.colors.primary }}
				/>
			</View>

			<Divider label="" />

			<FormInput
				label="Години сну до приступу"
				value={sleepHoursBefore !== undefined ? String(sleepHoursBefore) : ""}
				onChangeText={v => onSleepHoursChange(v ? Number(v) : undefined)}
				placeholder="Наприклад: 6"
				keyboardType="number-pad"
				maxLength={2}
			/>

			<FormInput
				label="Опис"
				value={description}
				onChangeText={onDescriptionChange}
				placeholder="Додаткові нотатки..."
				multiline
				numberOfLines={4}
				style={[styles.descriptionInput, { textAlignVertical: "top" }]}
			/>
		</View>
	)
}
