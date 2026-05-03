// components/dashboard/DashboardHero.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"

type Props = {
	lastSeizure: Seizure | null
	daysSinceLastSeizure: number | null
}

export function DashboardHero({ lastSeizure, daysSinceLastSeizure }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const { t } = useTranslation()

	const isToday = daysSinceLastSeizure === 0

	const lastSeizureLabel = lastSeizure
		? format(new Date(lastSeizure.startedAt), "d MMM, HH:mm", { locale: uk })
		: null

	function daysWord(n: number): string {
		if (n === 1) return t('dashboard.day')
		if (n >= 2 && n <= 4) return t('dashboard.days_2_4')
		return t('dashboard.days_other')
	}

	return (
		<View
			style={{
				backgroundColor: colors.primary,
				borderRadius: radius.lg,
				paddingHorizontal: spacing.lg,
				paddingVertical: spacing.md,
				alignItems: "center",
				marginBottom: spacing.md,
			}}
		>
			{lastSeizure === null ? (
				<Text
					style={{
						fontFamily: fonts.medium,
						fontSize: fontSize.lg,
						color: "#fff",
						opacity: 0.9,
						textAlign: "center",
						paddingVertical: spacing.sm,
					}}
				>
					{t('dashboard.noSeizures')}
				</Text>
			) : (
				<>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: fontSize.sm,
							color: "#fff",
							opacity: 0.8,
							marginBottom: spacing.xs,
							textTransform: "uppercase",
							letterSpacing: 1,
						}}
					>
						{isToday ? t('dashboard.lastSeizure') : t('dashboard.noSeizuresLabel')}
					</Text>

					{isToday ? (
						<Text
							style={{
								fontFamily: fonts.bold,
								fontSize: 42,
								color: "#fff",
								lineHeight: 50,
							}}
						>
							{t('dashboard.today')}
						</Text>
					) : (
						<View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 6 }}>
							<Text
								style={{
									fontFamily: fonts.bold,
									fontSize: 64,
									color: "#fff",
									lineHeight: 72,
								}}
							>
								{daysSinceLastSeizure}
							</Text>
							<Text
								style={{
									fontFamily: fonts.medium,
									fontSize: fontSize.lg,
									color: "#fff",
									opacity: 0.85,
									marginBottom: 7,
								}}
							>
								{daysWord(daysSinceLastSeizure!)}
							</Text>
						</View>
					)}

					<View
						style={{
							marginTop: spacing.sm,
							paddingHorizontal: spacing.md,
							paddingVertical: spacing.xs,
							backgroundColor: "rgba(255,255,255,0.2)",
							borderRadius: radius.lg,
						}}
					>
						<Text
							style={{
								fontFamily: fonts.regular,
								fontSize: fontSize.sm,
								color: "#fff",
							}}
						>
							{t('dashboard.lastSeizure')} — {lastSeizureLabel}
						</Text>
					</View>
				</>
			)}
		</View>
	)
}
