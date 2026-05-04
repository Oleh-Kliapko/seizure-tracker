// components/settings/medications/MedicationCard.tsx

import { FormInput, TimePickerModal } from "@/components/ui"
import { MONTHS, YEARS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { MedEntry } from "@/hooks/useMedicationsForm"
import { DOSE_UNIT_LABEL_KEYS, DOSE_UNITS } from "@/models/medication"
import { Picker } from "@react-native-picker/picker"
import { Clock, Plus, Trash2, X } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

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
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)

	return (
		<View style={styles.guardianCard}>
			<View style={styles.guardianHeader}>
				<Text style={styles.guardianTitle}>{t('medications.title', { index: index + 1 })}</Text>
				<TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
					<Trash2 size={20} color={colors.error} />
				</TouchableOpacity>
			</View>

			<FormInput
				label={t('medications.name')}
				value={entry.name}
				onChangeText={v => onUpdate("name", v)}
				onBlur={onBlur}
				placeholder={t('medications.namePlaceholder')}
				autoCapitalize="words"
			/>

			<FormInput
				label={t('medications.dailyDose')}
				value={entry.doseAmount}
				onChangeText={v => {
					if (!v || /^\d*\.?\d*$/.test(v)) onUpdate("doseAmount", v)
				}}
				onBlur={onBlur}
				placeholder="1"
				keyboardType="decimal-pad"
			/>

			<View style={{ marginBottom: spacing.md }}>
				<Text style={[styles.label, { marginBottom: spacing.sm }]}>
					{t('medications.doseUnit')}
				</Text>
				<View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
					{DOSE_UNITS.map(unit => {
						const active = entry.doseUnit === unit
						return (
							<TouchableOpacity
								key={unit}
								onPress={() => onUpdate("doseUnit", unit)}
								activeOpacity={0.7}
								style={{
									paddingHorizontal: spacing.md,
									paddingVertical: spacing.xs,
									borderRadius: radius.lg,
									borderWidth: 1,
									borderColor: active ? colors.primary : colors.border,
									backgroundColor: active ? colors.primary + "15" : colors.background,
								}}
							>
								<Text
									style={{
										fontFamily: active ? fonts.medium : fonts.regular,
										fontSize: fontSize.sm,
										color: active ? colors.primary : colors.textSecondary,
									}}
								>
									{t(DOSE_UNIT_LABEL_KEYS[unit])}
								</Text>
							</TouchableOpacity>
						)
					})}
				</View>
			</View>

			<View style={{ marginBottom: spacing.md }}>
				<Text style={[styles.label, { marginBottom: spacing.sm }]}>
					{t('medications.scheduledTime')}
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
							<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.sm, color: colors.primary }}>
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
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.sm, color: colors.primary }}>
							{t('medications.addTime')}
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<FormInput
				label={t('medications.notes')}
				value={entry.notes}
				onChangeText={v => onUpdate("notes", v)}
				onBlur={onBlur}
				placeholder={t('medications.notesPlaceholder')}
				autoCapitalize="sentences"
				multiline
				numberOfLines={2}
			/>

			<View style={{ marginBottom: spacing.md }}>
				<Text style={[styles.label, { marginBottom: spacing.sm }]}>
					{t('medications.startedAt')}
				</Text>
				<View style={styles.row}>
					<View style={styles.pickerWrapper}>
						<Picker
							selectedValue={entry.startMonth}
							onValueChange={v => onUpdateStarted(v, entry.startYear)}
							style={{ color: colors.onSurface }}
							itemStyle={{ color: colors.onSurface }}
						>
							{MONTHS.map(m => (
								<Picker.Item key={m.value} label={t(m.labelKey)} value={m.value} />
							))}
						</Picker>
					</View>
					<View style={styles.pickerWrapper}>
						<Picker
							selectedValue={entry.startYear}
							onValueChange={v => onUpdateStarted(entry.startMonth, v)}
							style={{ color: colors.onSurface }}
							itemStyle={{ color: colors.onSurface }}
						>
							{YEARS.map(y => (
								<Picker.Item key={y.value} label={y.label} value={y.value} />
							))}
						</Picker>
					</View>
				</View>
			</View>

			<TimePickerModal
				visible={showPicker}
				onClose={() => setShowPicker(false)}
				onAdd={onAddTime}
			/>
		</View>
	)
}
