// components/tracking/TrackingMedications.tsx

import { useAppTheme } from "@/hooks"
import { MedIntake } from "@/hooks/useTrackingForm"
import {
	DOSE_UNIT_LABEL_KEYS,
	Medication,
	normalizeDoseUnit,
} from "@/models/medication"
import { formatTime } from "@/utils/seizureFormatters"
import { CheckCircle, Plus, X } from "lucide-react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"
import { MedicationIntakeModal } from "./MedicationIntakeModal"

type Props = {
	medications: Medication[]
	medIntakes: MedIntake[]
	onAddIntake: (medicationId: string, amount: number) => void
	onRemoveIntake: (index: number) => void
}

export function TrackingMedications({
	medications,
	medIntakes,
	onAddIntake,
	onRemoveIntake,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showModal, setShowModal] = useState(false)

	if (medications.length === 0) {
		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t("tracking.medications")}</Text>
				<Text style={styles.emptyText}>
					{t("tracking.medicationsNotConfigured")}
				</Text>
			</View>
		)
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("tracking.medications")}</Text>

			{medications.map((med, index) => {
				const taken = medIntakes
					.filter(i => i.medicationId === med.id)
					.reduce((sum, i) => sum + i.amount, 0)
				const required = med.doseAmount
				const done = taken >= required
				const partial = taken > 0 && !done
				const statusColor = done
					? theme.colors.success
					: partial
						? "#F59E0B"
						: theme.colors.textSecondary

				return (
					<View key={med.id}>
						{index > 0 && <View style={styles.divider} />}
						<View style={styles.medSummaryRow}>
							<View style={{ flex: 1 }}>
								<Text style={styles.medName}>{med.name}</Text>
								<Text style={styles.medDose}>
									{t("tracking.dailyDose")} {required}{" "}
									{t(DOSE_UNIT_LABEL_KEYS[normalizeDoseUnit(med.doseUnit)])}
									{med.scheduledTimes && med.scheduledTimes.length > 0
										? ` (${med.scheduledTimes.join(", ")})`
										: ""}
								</Text>
							</View>
							<View style={styles.medStatusColumn}>
								<View style={styles.medStatusRow}>
									{done && (
										<CheckCircle size={14} color={theme.colors.success} />
									)}
									<Text style={[styles.medStatusText, { color: statusColor }]}>
										{taken} / {required}{" "}
										{t(DOSE_UNIT_LABEL_KEYS[normalizeDoseUnit(med.doseUnit)])}
									</Text>
								</View>
								{!done && taken === 0 && (
									<Text style={styles.medStatusNote}>
										{t("tracking.notTaken")}
									</Text>
								)}
								{partial && (
									<Text style={[styles.medStatusNote, { color: "#F59E0B" }]}>
										{t("tracking.incompleteDose")}
									</Text>
								)}
							</View>
						</View>
					</View>
				)
			})}

			{medIntakes.length > 0 && (
				<>
					<View style={[styles.divider, { marginTop: theme.spacing.md }]} />
					<Text
						style={[styles.sectionTitle, { marginBottom: theme.spacing.sm }]}
					>
						{t("tracking.intakesToday")}
					</Text>
					{medIntakes.map((intake, index) => {
						const med = medications.find(m => m.id === intake.medicationId)
						return (
							<View key={index} style={styles.intakeRow}>
								<Text style={styles.intakeTime}>
									{formatTime(intake.takenAt)}
								</Text>
								<Text style={styles.intakeMedName}>{med?.name ?? "—"}</Text>
								<Text style={styles.medDose}>
									{intake.amount}{" "}
									{med
										? t(DOSE_UNIT_LABEL_KEYS[normalizeDoseUnit(med.doseUnit)])
										: ""}
								</Text>
								<TouchableOpacity
									onPress={() => onRemoveIntake(index)}
									hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									activeOpacity={0.7}
								>
									<X size={16} color={theme.colors.error} />
								</TouchableOpacity>
							</View>
						)
					})}
				</>
			)}

			<TouchableOpacity
				onPress={() => setShowModal(true)}
				activeOpacity={0.7}
				style={styles.addIntakeBtn}
			>
				<Plus size={16} color={theme.colors.primary} />
				<Text style={styles.addIntakeBtnText}>
					{t("tracking.recordIntake")}
				</Text>
			</TouchableOpacity>

			<MedicationIntakeModal
				visible={showModal}
				medications={medications}
				onClose={() => setShowModal(false)}
				onAdd={(id, amount) => {
					onAddIntake(id, amount)
					setShowModal(false)
				}}
			/>
		</View>
	)
}
