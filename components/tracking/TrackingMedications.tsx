// components/tracking/TrackingMedications.tsx

import { useAppTheme } from "@/hooks"
import { MedIntake } from "@/hooks/useTrackingForm"
import { Medication } from "@/models/medication"
import { router } from "expo-router"
import { CheckCircle, Plus, X } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"
import { MedicationIntakeModal } from "./MedicationIntakeModal"

type Props = {
	medications: Medication[]
	medIntakes: MedIntake[]
	onAddIntake: (medicationId: string, amount: number) => void
	onRemoveIntake: (index: number) => void
}

function formatTime(ts: number) {
	return new Date(ts).toLocaleTimeString("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
	})
}

export function TrackingMedications({
	medications,
	medIntakes,
	onAddIntake,
	onRemoveIntake,
}: Props) {
	const theme = useAppTheme()
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const [showModal, setShowModal] = useState(false)

	if (medications.length === 0) {
		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Ліки</Text>
				<TouchableOpacity
					onPress={() => router.push("/(tabs)/settings/medications" as any)}
					activeOpacity={0.7}
				>
					<Text style={[styles.emptyText, { color: colors.primary }]}>
						+ Додати ліки у профілі
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Ліки</Text>

			{/* Per-medication summary */}
			{medications.map((med, index) => {
				const taken = medIntakes
					.filter(i => i.medicationId === med.id)
					.reduce((sum, i) => sum + i.amount, 0)
				const required = med.doseAmount * Math.max(med.scheduledTimes?.length ?? 1, 1)
				const done = taken >= required
				const partial = taken > 0 && !done

				return (
					<View key={med.id}>
						{index > 0 && <View style={styles.divider} />}
						<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
							<View style={{ flex: 1 }}>
								<Text style={styles.medName}>{med.name}</Text>
								<Text style={styles.medDose}>
									Потрібно: {required} {med.doseUnit}
									{med.scheduledTimes && med.scheduledTimes.length > 0
										? ` (${med.scheduledTimes.join(", ")})`
										: ""}
								</Text>
							</View>
							<View style={{ alignItems: "flex-end", gap: 2 }}>
								<View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
									{done && <CheckCircle size={14} color={colors.success} />}
									<Text
										style={{
											fontFamily: fonts.medium,
											fontSize: fontSize.sm,
											color: done ? colors.success : partial ? "#F59E0B" : colors.textSecondary,
										}}
									>
										{taken} / {required} {med.doseUnit}
									</Text>
								</View>
								{!done && taken === 0 && (
									<Text style={{ fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary }}>
										не прийнято
									</Text>
								)}
								{partial && (
									<Text style={{ fontFamily: fonts.regular, fontSize: 11, color: "#F59E0B" }}>
										⚠ неповна доза
									</Text>
								)}
							</View>
						</View>
					</View>
				)
			})}

			{/* Intake log */}
			{medIntakes.length > 0 && (
				<>
					<View style={[styles.divider, { marginTop: spacing.md }]} />
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.sm,
							color: colors.textSecondary,
							marginBottom: spacing.sm,
							textTransform: "uppercase",
							letterSpacing: 0.4,
						}}
					>
						Прийоми сьогодні
					</Text>
					{medIntakes.map((intake, index) => {
						const med = medications.find(m => m.id === intake.medicationId)
						return (
							<View
								key={index}
								style={{
									flexDirection: "row",
									alignItems: "center",
									paddingVertical: spacing.xs,
									gap: spacing.sm,
								}}
							>
								<Text
									style={{
										fontFamily: fonts.regular,
										fontSize: fontSize.sm,
										color: colors.textSecondary,
										width: 40,
									}}
								>
									{formatTime(intake.takenAt)}
								</Text>
								<Text
									style={{
										fontFamily: fonts.medium,
										fontSize: fontSize.sm,
										color: colors.onSurface,
										flex: 1,
									}}
								>
									{med?.name ?? "—"}
								</Text>
								<Text
									style={{
										fontFamily: fonts.regular,
										fontSize: fontSize.sm,
										color: colors.textSecondary,
									}}
								>
									{intake.amount} {med?.doseUnit ?? ""}
								</Text>
								<TouchableOpacity
									onPress={() => onRemoveIntake(index)}
									hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
									activeOpacity={0.7}
								>
									<X size={16} color={colors.error} />
								</TouchableOpacity>
							</View>
						)
					})}
				</>
			)}

			{/* Add intake button */}
			<TouchableOpacity
				onPress={() => setShowModal(true)}
				activeOpacity={0.7}
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginTop: spacing.md,
					paddingVertical: spacing.sm,
					borderRadius: radius.sm,
					borderWidth: 1,
					borderColor: colors.primary,
					gap: spacing.xs,
				}}
			>
				<Plus size={16} color={colors.primary} />
				<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.sm, color: colors.primary }}>
					Записати прийом
				</Text>
			</TouchableOpacity>

			<MedicationIntakeModal
				visible={showModal}
				medications={medications}
				onClose={() => setShowModal(false)}
				onAdd={(id, amount) => { onAddIntake(id, amount); setShowModal(false) }}
			/>
		</View>
	)
}
