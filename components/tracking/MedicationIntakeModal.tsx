// components/tracking/MedicationIntakeModal.tsx

import { useAppTheme } from "@/hooks"
import {
	DOSE_UNIT_LABEL_KEYS,
	Medication,
	normalizeDoseUnit,
} from "@/models/medication"
import { formatDoseAmount } from "@/utils/seizureFormatters"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getStyles } from "./getStyles"

type Props = {
	visible: boolean
	medications: Medication[]
	onClose: () => void
	onAdd: (medicationId: string, amount: number) => void
}

export function MedicationIntakeModal({
	visible,
	medications,
	onClose,
	onAdd,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const insets = useSafeAreaInsets()
	const { t } = useTranslation()
	const [selectedId, setSelectedId] = useState(medications[0]?.id ?? "")
	const [amount, setAmount] = useState(1)

	const selected = medications.find(m => m.id === selectedId)

	const handleAdd = () => {
		if (!selectedId) return
		onAdd(selectedId, amount)
		setAmount(1)
		onClose()
	}

	const decrement = () => setAmount(prev => Math.max(0.5, prev - 0.5))
	const increment = () => setAmount(prev => prev + 0.5)

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.modalOverlay}
				activeOpacity={1}
				onPress={onClose}
			/>
			<View style={[styles.modalSheet, { paddingBottom: theme.spacing.lg + insets.bottom }]}>
				<Text style={styles.sectionTitle}>{t("tracking.drug")}</Text>

				<ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
					{medications.map(med => {
						const active = med.id === selectedId
						return (
							<TouchableOpacity
								key={med.id}
								onPress={() => {
									setSelectedId(med.id)
									const timesCount = med.scheduledTimes?.length ?? 0
									const perIntake =
										timesCount > 0
											? med.doseAmount / timesCount
											: med.doseAmount
									setAmount(Math.max(0.5, Math.round(perIntake * 2) / 2))
								}}
								activeOpacity={0.7}
								style={[
									styles.medListItem,
									{ backgroundColor: active ? theme.colors.primary + "15" : "transparent" },
								]}
							>
								<View
									style={[
										styles.medRadioOuter,
										{ borderColor: active ? theme.colors.primary : theme.colors.border },
									]}
								>
									{active && <View style={styles.medRadioInner} />}
								</View>
								<View style={{ flex: 1 }}>
									<Text
										style={[
											styles.medItemName,
											active && { fontFamily: theme.fonts.medium, color: theme.colors.primary },
										]}
									>
										{med.name}
									</Text>
									<Text style={styles.medDose}>
										{t("tracking.dailyDoseLabel")}: {med.doseAmount}{" "}
										{t(DOSE_UNIT_LABEL_KEYS[normalizeDoseUnit(med.doseUnit)])}
									</Text>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>

				<View style={styles.amountRow}>
					<Text style={[styles.sectionTitle, { marginBottom: 0 }]}>
						{t("tracking.quantity")}
					</Text>
					<View style={[styles.stepperRow, { marginTop: 0 }]}>
						<TouchableOpacity onPress={decrement} activeOpacity={0.7} style={styles.stepperBtn}>
							<Text style={styles.stepperBtnText}>−</Text>
						</TouchableOpacity>
						<Text style={styles.amountDisplay}>
							{formatDoseAmount(amount)}{" "}
							{selected ? t(DOSE_UNIT_LABEL_KEYS[selected.doseUnit]) : ""}
						</Text>
						<TouchableOpacity onPress={increment} activeOpacity={0.7} style={styles.stepperBtn}>
							<Text style={styles.stepperBtnText}>+</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.modalBtnRow}>
					<TouchableOpacity onPress={onClose} activeOpacity={0.7} style={styles.modalCancelBtn}>
						<Text style={styles.modalCancelBtnText}>{t("common.cancel")}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleAdd} activeOpacity={0.8} style={styles.modalConfirmBtn}>
						<Text style={styles.modalConfirmBtnText}>{t("tracking.record")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
