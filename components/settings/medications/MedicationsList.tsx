// components/settings/medications/MedicationsList.tsx

import { useAppTheme } from "@/hooks"
import { MedEntry } from "@/hooks/useMedicationsForm"
import { Pill } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { MedicationCard } from "./MedicationCard"

type Props = {
	entries: MedEntry[]
	error: string | null
	onAdd: () => void
	onRemove: (index: number) => void
	onUpdate: (index: number, field: keyof MedEntry, value: string) => void
	onAddTime: (index: number, time: string) => void
	onRemoveTime: (index: number, time: string) => void
	onBlurEntry: (index: number) => void
}

export function MedicationsList({
	entries,
	error,
	onAdd,
	onRemove,
	onUpdate,
	onAddTime,
	onRemoveTime,
	onBlurEntry,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.card}>
			{entries.map((entry, index) => (
				<MedicationCard
					key={index}
					entry={entry}
					index={index}
					onUpdate={(field, value) => onUpdate(index, field, value)}
					onAddTime={time => onAddTime(index, time)}
					onRemoveTime={time => onRemoveTime(index, time)}
					onRemove={() => onRemove(index)}
					onBlur={() => onBlurEntry(index)}
				/>
			))}

			<TouchableOpacity
				style={styles.addBtn}
				onPress={onAdd}
				activeOpacity={0.7}
			>
				<Pill size={20} color={theme.colors.primary} />
				<Text style={styles.addBtnText}>Додати препарат</Text>
			</TouchableOpacity>

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	)
}
