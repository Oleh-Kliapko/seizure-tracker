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
				padding: spacing.xl,
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
						<View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6 }}>
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
									marginBottom: 12,
								}}
							>
								{daysSinceLastSeizure === 1 ? "день" : daysSinceLastSeizure! < 5 ? "дні" : "днів"}
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
