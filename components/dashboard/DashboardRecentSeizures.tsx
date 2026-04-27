// components/dashboard/DashboardRecentSeizures.tsx

import { SEVERITY_LABELS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { router } from "expo-router"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { ChevronRight } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
	seizures: Seizure[]
}

const SEVERITY_COLORS: Record<number, string> = {
	1: "#43a047",
	2: "#FB8C00",
	3: "#e53935",
}

export function DashboardRecentSeizures({ seizures }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	return (
		<View
			style={{
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				paddingHorizontal: 16,
				marginBottom: 12,
			}}
		>
			<Text
				style={{
					fontFamily: fonts.medium,
					fontSize: fontSize.sm,
					color: colors.textSecondary,
					paddingTop: spacing.md,
					paddingBottom: spacing.sm,
				}}
			>
				Останні приступи
			</Text>

			{seizures.map((s, i) => {
				const date = format(new Date(s.startedAt), "d MMM", { locale: uk })
				const time = format(new Date(s.startedAt), "HH:mm")
				const severity = s.severity ? SEVERITY_LABELS[s.severity] : "—"
				const severityColor = s.severity ? SEVERITY_COLORS[s.severity] : colors.textSecondary

				return (
					<View key={s.id}>
						{i > 0 && <View style={{ height: 1, backgroundColor: colors.border }} />}
						<TouchableOpacity
							onPress={() => router.push(`/(tabs)/seizures/${s.id}` as any)}
							activeOpacity={0.7}
							style={{
								flexDirection: "row",
								alignItems: "center",
								paddingVertical: spacing.sm,
								gap: spacing.sm,
							}}
						>
							<Text
								style={{
									fontFamily: fonts.medium,
									fontSize: fontSize.sm,
									color: colors.onSurface,
									width: 60,
								}}
							>
								{date}
							</Text>
							<Text
								style={{
									fontFamily: fonts.regular,
									fontSize: fontSize.sm,
									color: colors.textSecondary,
									width: 42,
								}}
							>
								{time}
							</Text>
							<Text
								style={{
									fontFamily: fonts.medium,
									fontSize: fontSize.sm,
									color: severityColor,
									flex: 1,
								}}
							>
								{severity}
							</Text>
							<ChevronRight size={16} color={colors.textSecondary} />
						</TouchableOpacity>
					</View>
				)
			})}

			<View style={{ height: 1, backgroundColor: colors.border }} />

			<TouchableOpacity
				onPress={() => router.push("/(tabs)/seizures")}
				activeOpacity={0.7}
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "flex-end",
					paddingVertical: spacing.sm,
					gap: spacing.xs,
				}}
			>
				<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.sm, color: colors.primary }}>
					Всі приступи
				</Text>
				<ChevronRight size={16} color={colors.primary} />
			</TouchableOpacity>
		</View>
	)
}
