// components/dashboard/DashboardToday.tsx

import { useAppTheme } from "@/hooks"
import { Medication } from "@/models/medication"
import { router } from "expo-router"
import { CheckCircle, ChevronRight, Circle, Pill } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

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
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={styles.statusRow}
		>
			{icon}
			<Text style={styles.statusRowLabel}>{label}</Text>
			<Text
				style={[
					styles.statusRowText,
					{
						color: statusOk ? theme.colors.success : theme.colors.textSecondary,
					},
				]}
			>
				{statusText}
			</Text>
			<ChevronRight size={16} color={theme.colors.textSecondary} />
		</TouchableOpacity>
	)
}

export function DashboardToday({
	trackingFilledSections,
	medications,
	medicationsTakenToday,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const trackingDone = trackingFilledSections === TRACKING_SECTIONS
	const trackingLabel =
		trackingFilledSections === 0
			? t("dashboard.trackingNotFilled")
			: trackingDone
				? t("dashboard.trackingFilled")
				: `${trackingFilledSections} / ${TRACKING_SECTIONS}`

	const medLabel =
		medications.length === 0
			? t("dashboard.medicationsNotConfigured")
			: `${medicationsTakenToday} ${t("tracking.of")} ${medications.length}`
	const medOk =
		medications.length > 0 && medicationsTakenToday === medications.length
	const medRoute =
		medications.length === 0
			? "/(tabs)/settings/medications"
			: "/(tabs)/tracking"

	return (
		<View style={styles.sectionCard}>
			<StatusRow
				icon={
					trackingDone ? (
						<CheckCircle size={20} color={theme.colors.success} />
					) : (
						<Circle size={20} color={theme.colors.textSecondary} />
					)
				}
				label={t("dashboard.tracking")}
				statusText={trackingLabel}
				statusOk={trackingDone}
				onPress={() => router.push("/(tabs)/tracking")}
			/>

			<View style={styles.divider} />

			<StatusRow
				icon={
					<Pill
						size={20}
						color={
							medications.length > 0
								? theme.colors.primary
								: theme.colors.textSecondary
						}
					/>
				}
				label={t("dashboard.medications")}
				statusText={medLabel}
				statusOk={medOk}
				onPress={() => router.push(medRoute as any)}
			/>
		</View>
	)
}
