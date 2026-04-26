// components/settings/medications/MedicationCard.tsx

import { FormInput, TimePickerModal } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { MedEntry } from "@/hooks/useMedicationsForm"
import { Clock, Plus, Trash2, X } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	entry: MedEntry
	index: number
	onUpdate: (field: keyof MedEntry, value: string) => void
	onAddTime: (time: string) => void
	onRemoveTime: (time: string) => void
	onRemove: () => void
}

export function MedicationCard({
	entry,
	index,
	onUpdate,
	onAddTime,
	onRemoveTime,
	onRemove,
}: Props) {
	const theme = useAppTheme()
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const [showPicker, setShowPicker] = useState(false)

	return (
		<View style={styles.guardianCard}>
			<View style={styles.guardianHeader}>
				<Text style={styles.guardianTitle}>Препарат {index + 1}</Text>
				<TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
					<Trash2 size={20} color={colors.error} />
				</TouchableOpacity>
			</View>

			<FormInput
				label="Назва *"
				value={entry.name}
				onChangeText={v => onUpdate("name", v)}
				placeholder="Наприклад: Карбамазепін"
				autoCapitalize="words"
			/>
			<FormInput
				label="Доза *"
				value={entry.dose}
				onChangeText={v => onUpdate("dose", v)}
				placeholder="Наприклад: 200мг, 1 таблетка"
				autoCapitalize="none"
			/>

			{/* Scheduled times */}
			<View style={{ marginBottom: spacing.md }}>
				<Text style={[styles.label, { marginBottom: spacing.sm }]}>
					Час прийому
				</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
					{entry.scheduledTimes.map(t => (
						<View
							key={t}
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: colors.primary + "18",
								borderRadius: radius.sm,
								paddingHorizontal: spacing.sm,
								paddingVertical: spacing.xs,
								gap: spacing.xs,
							}}
						>
							<Clock size={13} color={colors.primary} />
							<Text
								style={{
									fontFamily: fonts.medium,
									fontSize: fontSize.sm,
									color: colors.primary,
								}}
							>
								{t}
							</Text>
							<TouchableOpacity
								onPress={() => onRemoveTime(t)}
								hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
								activeOpacity={0.7}
							>
								<X size={13} color={colors.primary} />
							</TouchableOpacity>
						</View>
					))}

					<TouchableOpacity
						onPress={() => setShowPicker(true)}
						activeOpacity={0.7}
						style={{
							flexDirection: "row",
							alignItems: "center",
							borderWidth: 1,
							borderColor: colors.primary,
							borderRadius: radius.sm,
							paddingHorizontal: spacing.sm,
							paddingVertical: spacing.xs,
							gap: spacing.xs,
						}}
					>
						<Plus size={13} color={colors.primary} />
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.sm,
								color: colors.primary,
							}}
						>
							Додати час
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FormInput
				label="Нотатки"
				value={entry.notes}
				onChangeText={v => onUpdate("notes", v)}
				placeholder="Додаткова інформація..."
				autoCapitalize="sentences"
				multiline
				numberOfLines={2}
			/>

			<TimePickerModal
				visible={showPicker}
				onClose={() => setShowPicker(false)}
				onAdd={onAddTime}
			/>
		</View>
	)
}
