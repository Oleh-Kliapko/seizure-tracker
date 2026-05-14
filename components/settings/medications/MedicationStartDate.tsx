// components/settings/medications/MedicationStartDate.tsx

import { MONTHS, YEARS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Picker } from "@react-native-picker/picker"
import { Check, ChevronRight } from "lucide-react-native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	startMonth: number
	startYear: number
	onUpdateStarted: (month: number, year: number) => void
}

export function MedicationStartDate({ startMonth, startYear, onUpdateStarted }: Props) {
	const theme = useAppTheme()
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const flashCheck = () => {
		if (timerRef.current) clearTimeout(timerRef.current)
		setShowCheck(true)
		timerRef.current = setTimeout(() => setShowCheck(false), 2000)
	}

	const monthLabel = startMonth > 0 ? t(`month.${startMonth}`) : "—"
	const displayValue = startMonth > 0 ? `${monthLabel} ${startYear}` : "—"

	return (
		<View style={{ marginBottom: spacing.md }}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.xs }}>
				<Text style={[styles.label, { marginBottom: 0 }]}>{t("medications.startedAt")}</Text>
				{showCheck && <Check size={13} color={colors.success} />}
			</View>

			<TouchableOpacity
				onPress={() => setOpen(v => !v)}
				activeOpacity={0.7}
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderWidth: 1,
					borderColor: open ? colors.primary : colors.border,
					borderRadius: radius.md,
					paddingHorizontal: spacing.md,
					paddingVertical: spacing.sm + 2,
					backgroundColor: colors.background,
				}}
			>
				<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.md, color: startMonth > 0 ? colors.onSurface : colors.textSecondary }}>
					{displayValue}
				</Text>
				<ChevronRight
					size={16}
					color={colors.textSecondary}
					style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}
				/>
			</TouchableOpacity>

			{open && (
				<View style={{ marginTop: spacing.xs }}>
					<View style={styles.row}>
						<View style={styles.pickerWrapper}>
							<Picker
								selectedValue={startMonth}
								onValueChange={v => { onUpdateStarted(v, startYear); flashCheck() }}
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
								selectedValue={startYear}
								onValueChange={v => { onUpdateStarted(startMonth, v); flashCheck() }}
								style={{ color: colors.onSurface }}
								itemStyle={{ color: colors.onSurface }}
							>
								{YEARS.map(y => (
									<Picker.Item key={y.value} label={y.label} value={y.value} />
								))}
							</Picker>
						</View>
					</View>

					<TouchableOpacity
						onPress={() => setOpen(false)}
						activeOpacity={0.8}
						style={{
							marginTop: spacing.xs,
							borderRadius: radius.md,
							paddingVertical: spacing.sm,
							alignItems: "center",
							backgroundColor: colors.primary,
						}}
					>
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: colors.onPrimary }}>
							{t("common.done")}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}
