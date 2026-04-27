// components/dashboard/DashboardHeatmap.tsx

import { useAppTheme } from "@/hooks"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { Text, View } from "react-native"
import { HeatmapDay } from "@/hooks/useDashboard"

function dotColor(count: number, colors: ReturnType<typeof useAppTheme>["colors"]): string {
	if (count === 0) return colors.border
	if (count === 1) return "#FFA726"
	if (count === 2) return "#FB8C00"
	return colors.error
}

type Props = {
	days: HeatmapDay[]
}

export function DashboardHeatmap({ days }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	const firstDay = days[0] ? format(new Date(days[0].dateStr), "d MMM", { locale: uk }) : ""
	const lastDay = days[29] ? format(new Date(days[29].dateStr), "d MMM", { locale: uk }) : ""

	return (
		<View
			style={{
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				padding: spacing.md,
				marginBottom: spacing.md,
			}}
		>
			<Text
				style={{
					fontFamily: fonts.medium,
					fontSize: fontSize.sm,
					color: colors.onSurface,
					marginBottom: spacing.sm,
				}}
			>
				Активність за 30 днів
			</Text>

			<View style={{ flexDirection: "row", gap: 4, flexWrap: "nowrap" }}>
				{days.map(day => (
					<View
						key={day.dateStr}
						style={{
							flex: 1,
							aspectRatio: 1,
							borderRadius: 3,
							backgroundColor: dotColor(day.count, colors),
						}}
					/>
				))}
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: spacing.xs,
				}}
			>
				<Text style={{ fontFamily: fonts.regular, fontSize: 10, color: colors.textSecondary }}>
					{firstDay}
				</Text>
				<Text style={{ fontFamily: fonts.regular, fontSize: 10, color: colors.textSecondary }}>
					{lastDay}
				</Text>
			</View>
		</View>
	)
}
