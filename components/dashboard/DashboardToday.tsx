// components/dashboard/DashboardToday.tsx

import { useAppTheme } from "@/hooks"
import { Medication } from "@/models/medication"
import { router } from "expo-router"
import { CheckCircle, ChevronRight, Circle, Pill } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

const TRACKING_SECTIONS = 6

type Props = {
	trackingFilledSections: number
	medications: Medication[]
	medicationsTakenToday: number
}

function StatusRow({
	icon,
	label,
	statusText,
	statusOk,
	onPress,
}: {
	icon: React.ReactNode
	label: string
	statusText: string
	statusOk: boolean
	onPress: () => void
}) {
	const { colors, fonts, fontSize, spacing } = useAppTheme()

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={{
				flexDirection: "row",
				alignItems: "center",
				paddingVertical: spacing.sm,
				gap: spacing.sm,
			}}
		>
			{icon}
			<Text
				style={{
					fontFamily: fonts.medium,
					fontSize: fontSize.md,
					color: colors.onSurface,
					flex: 1,
				}}
			>
				{label}
			</Text>
			<Text
				style={{
					fontFamily: fonts.regular,
					fontSize: fontSize.sm,
					color: statusOk ? colors.success : colors.textSecondary,
					marginRight: spacing.xs,
				}}
			>
				{statusText}
			</Text>
			<ChevronRight size={16} color={colors.textSecondary} />
		</TouchableOpacity>
	)
}

export function DashboardToday({ trackingFilledSections, medications, medicationsTakenToday }: Props) {
	const { colors, spacing, radius } = useAppTheme()

	const trackingDone = trackingFilledSections === TRACKING_SECTIONS
	const trackingLabel =
		trackingFilledSections === 0
			? "Не заповнено"
			: trackingDone
				? "Заповнено"
				: `${trackingFilledSections} / ${TRACKING_SECTIONS}`

	const medLabel =
		medications.length === 0
			? "Не налаштовані"
			: `${medicationsTakenToday} з ${medications.length}`
	const medOk = medications.length > 0 && medicationsTakenToday === medications.length
	const medRoute =
		medications.length === 0
			? "/(tabs)/settings/medications"
			: "/(tabs)/tracking"

	return (
		<View
			style={{
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				paddingHorizontal: 16,
				marginBottom: 12,
			}}
		>
			<StatusRow
				icon={
					trackingDone
						? <CheckCircle size={20} color={colors.success} />
						: <Circle size={20} color={colors.textSecondary} />
				}
				label="Трекінг"
				statusText={trackingLabel}
				statusOk={trackingDone}
				onPress={() => router.push("/(tabs)/tracking")}
			/>

			<View style={{ height: 1, backgroundColor: colors.border }} />

			<StatusRow
				icon={<Pill size={20} color={medications.length > 0 ? colors.primary : colors.textSecondary} />}
				label="Ліки"
				statusText={medLabel}
				statusOk={medOk}
				onPress={() => router.push(medRoute as any)}
			/>
		</View>
	)
}
