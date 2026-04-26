// components/settings/medications/MedicationsList.tsx

import { Button } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { MedEntry } from "@/hooks/useMedicationsForm"
import { Pill } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { MedicationCard } from "./MedicationCard"

type Props = {
	entries: MedEntry[]
	isSaving: boolean
	isSaved: boolean
	error: string | null
	onAdd: () => void
	onRemove: (index: number) => void
	onUpdate: (index: number, field: keyof MedEntry, value: string) => void
	onAddTime: (index: number, time: string) => void
	onRemoveTime: (index: number, time: string) => void
	onSave: () => void
}

export function MedicationsList({
	entries,
	isSaving,
	isSaved,
	error,
	onAdd,
	onRemove,
	onUpdate,
	onAddTime,
	onRemoveTime,
	onSave,
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

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</View>

			<Button
				title={isSaved ? "Збережено ✓" : isSaving ? "Збереження..." : "Зберегти"}
				onPress={onSave}
				disabled={isSaving}
			/>
		</View>
	)
}
