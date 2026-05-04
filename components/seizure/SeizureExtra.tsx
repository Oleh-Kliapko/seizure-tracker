// components/seizure/SeizureExtra.tsx

import { Divider, FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
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
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("seizure.additional")}</Text>

			<View style={styles.switchRow}>
				<View style={styles.switchLabel}>
					<Text style={styles.label}>{t("seizure.medicationTaken")}</Text>
					<Text style={styles.sublabel}>
						{t("seizure.medicationTakenDescription")}
					</Text>
				</View>
				<Switch
					value={isMedicationTaken}
					onValueChange={onMedicationChange}
					trackColor={{ true: theme.colors.primary }}
					style={{ transform: [{ scale: 0.85 }] }}
				/>
			</View>

			<Divider label="" />

			<FormInput
				label={t("seizure.sleepHours")}
				value={sleepHoursBefore !== undefined ? String(sleepHoursBefore) : ""}
				onChangeText={v => onSleepHoursChange(v ? Number(v) : undefined)}
				placeholder="6"
				keyboardType="number-pad"
				maxLength={2}
			/>

			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={styles.label}>{t("seizure.description")}</Text>
					<Text style={[styles.sublabel, { fontSize: 10 }]}>
						{description.length}/150
					</Text>
				</View>
				<FormInput
					value={description}
					onChangeText={onDescriptionChange}
					placeholder={t("seizure.descriptionPlaceholder")}
					multiline
					numberOfLines={4}
					maxLength={150}
					style={[styles.descriptionInput, { textAlignVertical: "top" }]}
				/>
			</View>
		</View>
	)
}
