// components/settings/medications/MedicationCard.tsx

import { FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { MedEntry } from "@/hooks/settings/useMedicationsForm"
import { Trash2 } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { MedicationDoseUnit } from "./MedicationDoseUnit"
import { MedicationScheduleTimes } from "./MedicationScheduleTimes"
import { MedicationStartDate } from "./MedicationStartDate"

type Props = {
	entry: MedEntry
	index: number
	onUpdate: (field: keyof MedEntry, value: string) => void
	onUpdateStarted: (month: number, year: number) => void
	onAddTime: (time: string) => void
	onRemoveTime: (time: string) => void
	onRemove: () => void
	onBlur: () => void
}

export function MedicationCard({
	entry,
	index,
	onUpdate,
	onUpdateStarted,
	onAddTime,
	onRemoveTime,
	onRemove,
	onBlur,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.guardianCard}>
			<View style={styles.guardianHeader}>
				<Text style={styles.guardianTitle}>
					{t("medications.title", { index: index + 1 })}
				</Text>
				<TouchableOpacity
					onPress={() =>
						Alert.alert(
							t("medications.confirmDeleteTitle"),
							t("medications.confirmDeleteMessage"),
							[
								{ text: t("common.cancel"), style: "cancel" },
								{
									text: t("medications.confirmDeleteBtn"),
									style: "destructive",
									onPress: onRemove,
								},
							],
						)
					}
					activeOpacity={0.7}
				>
					<Trash2 size={20} color={theme.colors.error} />
				</TouchableOpacity>
			</View>

			<FormInput
				label={t("medications.name")}
				value={entry.name}
				onChangeText={v => onUpdate("name", v)}
				onBlur={onBlur}
				placeholder={t("medications.namePlaceholder")}
				autoCapitalize="words"
			/>

			<FormInput
				label={t("medications.dailyDose")}
				value={entry.doseAmount}
				onChangeText={v => {
					if (!v || /^\d*\.?\d*$/.test(v)) onUpdate("doseAmount", v)
				}}
				onBlur={onBlur}
				placeholder="1"
				keyboardType="decimal-pad"
			/>

			<MedicationDoseUnit
				doseUnit={entry.doseUnit}
				onUpdate={unit => onUpdate("doseUnit", unit)}
			/>

			<MedicationScheduleTimes
				scheduledTimes={entry.scheduledTimes}
				onAddTime={onAddTime}
				onRemoveTime={onRemoveTime}
			/>

			<FormInput
				label={t("medications.notes")}
				value={entry.notes}
				onChangeText={v => onUpdate("notes", v)}
				onBlur={onBlur}
				placeholder={t("medications.notesPlaceholder")}
				autoCapitalize="sentences"
				multiline
				numberOfLines={2}
			/>

			<MedicationStartDate
				startMonth={entry.startMonth}
				startYear={entry.startYear}
				onUpdateStarted={onUpdateStarted}
			/>
		</View>
	)
}
