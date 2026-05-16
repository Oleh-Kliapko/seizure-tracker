// components/settings/medications/MedicationScheduleTimes.tsx

import { TimePickerModal } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Clock, Plus, X } from "lucide-react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	scheduledTimes: string[]
	onAddTime: (time: string) => void
	onRemoveTime: (time: string) => void
}

export function MedicationScheduleTimes({ scheduledTimes, onAddTime, onRemoveTime }: Props) {
	const theme = useAppTheme()
	const { colors, fonts, fontSize, spacing, radius } = theme
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [showPicker, setShowPicker] = useState(false)

	return (
		<View style={{ marginBottom: spacing.md }}>
			<Text style={[styles.label, { marginBottom: spacing.sm }]}>
				{t("medications.scheduledTime")}
			</Text>
			<View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
				{scheduledTimes.map(time => (
					<View
						key={time}
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
							{time}
						</Text>
						<TouchableOpacity
							onPress={() => onRemoveTime(time)}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
							activeOpacity={0.7}
							accessibilityLabel={`Видалити час ${time}`}
							accessibilityRole="button"
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
						{t("medications.addTime")}
					</Text>
				</TouchableOpacity>
			</View>

			<TimePickerModal
				visible={showPicker}
				onClose={() => setShowPicker(false)}
				onAdd={time => {
					onAddTime(time)
					setShowPicker(false)
				}}
			/>
		</View>
	)
}
