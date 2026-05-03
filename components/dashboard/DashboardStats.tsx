// components/dashboard/DashboardStats.tsx

import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"

type Props = {
	thisMonthCount: number
	lastMonthCount: number
}

export function DashboardStats({ thisMonthCount, lastMonthCount }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const { t } = useTranslation()

	function trendLabel(current: number, previous: number): { text: string; color: string } | null {
		if (previous === 0 && current === 0) return null
		if (previous === 0) return null
		const diff = current - previous
		const pct = Math.round(Math.abs(diff / previous) * 100)
		if (diff === 0) return { text: t('dashboard.noChange'), color: "#888" }
		if (diff > 0) return { text: `↑ +${pct}%`, color: "#e53935" }
		return { text: `↓ −${pct}%`, color: "#43a047" }
	}

	function seizureWord(n: number): string {
		if (n === 1) return t('dashboard.seizure_1')
		if (n >= 2 && n <= 4) return t('dashboard.seizure_2_4')
		return t('dashboard.seizure_other')
	}

	const trend = trendLabel(thisMonthCount, lastMonthCount)

	const cardStyle = {
		flex: 1,
		backgroundColor: colors.surface,
		borderRadius: radius.lg,
		padding: spacing.md,
	}

	return (
		<View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.md }}>
			<View style={cardStyle}>
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
						marginBottom: spacing.xs,
					}}
				>
					{t('dashboard.thisMonth')}
				</Text>
				<Text
					style={{
						fontFamily: fonts.bold,
						fontSize: 28,
						color: colors.onSurface,
						lineHeight: 34,
					}}
				>
					{thisMonthCount}
				</Text>
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
					}}
				>
					{seizureWord(thisMonthCount)}
				</Text>
				{trend && (
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.sm,
							color: trend.color,
							marginTop: spacing.xs,
						}}
					>
						{trend.text}
					</Text>
				)}
			</View>

			<View style={cardStyle}>
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
						marginBottom: spacing.xs,
					}}
				>
					{t('dashboard.lastMonth')}
				</Text>
				<Text
					style={{
						fontFamily: fonts.bold,
						fontSize: 28,
						color: colors.onSurface,
						lineHeight: 34,
					}}
				>
					{lastMonthCount}
				</Text>
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
					}}
				>
					{seizureWord(lastMonthCount)}
				</Text>
			</View>
		</View>
	)
}
