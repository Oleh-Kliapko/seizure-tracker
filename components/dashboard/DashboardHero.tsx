// components/dashboard/DashboardHero.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models/seizure"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { Text, View } from "react-native"

type Props = {
	lastSeizure: Seizure | null
	daysSinceLastSeizure: number | null
}

function daysWord(n: number): string {
	if (n === 1) return "день"
	if (n >= 2 && n <= 4) return "дні"
	return "днів"
}

export function DashboardHero({ lastSeizure, daysSinceLastSeizure }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	const isToday = daysSinceLastSeizure === 0

	const lastSeizureLabel = lastSeizure
		? format(new Date(lastSeizure.startedAt), "d MMM, HH:mm", { locale: uk })
		: null

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
					Приступів ще немає
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
						{isToday ? "Останній приступ" : "Без приступів"}
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
							Сьогодні
						</Text>
					) : (
						<View style={{ alignItems: "center" }}>
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
							Останній — {lastSeizureLabel}
						</Text>
					</View>
				</>
			)}
		</View>
	)
}
