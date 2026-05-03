// components/dashboard/DashboardHeatmap.tsx

import { HeatmapDay } from "@/hooks/useDashboard"
import { useAppTheme } from "@/hooks"
import { format } from "date-fns"
import { uk, enUS } from "date-fns/locale"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"

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
	const { t, i18n } = useTranslation()
	const dateFnsLocale = i18n.language === "uk" ? uk : enUS

	const firstRow = days.slice(0, 15)
	const secondRow = days.slice(15)

	const firstDay = days[0] ? format(new Date(days[0].dateStr), "d MMM", { locale: dateFnsLocale }) : ""
	const lastDay = days[29] ? format(new Date(days[29].dateStr), "d MMM", { locale: dateFnsLocale }) : ""

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
				{t("dashboard.heatmapTitle")}
			</Text>

			<View style={{ gap: 4 }}>
				{[firstRow, secondRow].map((row, rowIdx) => (
					<View key={rowIdx} style={{ flexDirection: "row", gap: 4 }}>
						{row.map(day => (
							<View
								key={day.dateStr}
								style={{
									flex: 1,
									height: 20,
									borderRadius: 4,
									backgroundColor: dotColor(day.count, colors),
								}}
							/>
						))}
					</View>
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
