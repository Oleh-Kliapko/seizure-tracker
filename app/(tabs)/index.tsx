// app/(tabs)/index.tsx

import {
	DashboardHeatmap,
	DashboardHero,
	DashboardRecentSeizures,
	DashboardStats,
	DashboardToday,
} from "@/components/dashboard"
import { ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useDashboard } from "@/hooks/useDashboard"
import { router } from "expo-router"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function Dashboard() {
	const { colors, fonts, fontSize, spacing } = useAppTheme()
	const {
		isLoading,
		profile,
		hasSeizures,
		lastSeizure,
		daysSinceLastSeizure,
		thisMonthCount,
		lastMonthCount,
		heatmapDays,
		recentSeizures,
		isTrackingDone,
		medications,
		medicationsTakenToday,
	} = useDashboard()

	const today = format(new Date(), "d MMMM yyyy", { locale: uk })
	const firstName = profile?.firstName ?? ""

	return (
		<ScreenWrapper>
			<View
				style={{
					paddingHorizontal: spacing.lg,
					paddingTop: spacing.md,
					paddingBottom: spacing.sm,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<View>
					<Text style={{ fontFamily: fonts.bold, fontSize: fontSize.xl, color: colors.onSurface }}>
						{firstName ? `Привіт, ${firstName}` : "Привіт"}
					</Text>
					<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.sm, color: colors.textSecondary }}>
						{today}
					</Text>
				</View>
			</View>

			{isLoading ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={colors.primary} />
				</View>
			) : !hasSeizures ? (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						paddingHorizontal: spacing.xl,
						gap: spacing.lg,
					}}
				>
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.lg,
							color: colors.onSurface,
							textAlign: "center",
						}}
					>
						Тут з'явиться статистика після першого запису
					</Text>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: fontSize.md,
							color: colors.textSecondary,
							textAlign: "center",
						}}
					>
						Додайте перший приступ, і дашборд оживе
					</Text>
					<TouchableOpacity
						onPress={() => router.push("/(tabs)/seizures/add")}
						activeOpacity={0.8}
						style={{
							backgroundColor: colors.primary,
							paddingHorizontal: spacing.xl,
							paddingVertical: spacing.md,
							borderRadius: 999,
						}}
					>
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: "#fff" }}>
							+ Додати приступ
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}
					showsVerticalScrollIndicator={false}
				>
					<DashboardHero
						lastSeizure={lastSeizure}
						daysSinceLastSeizure={daysSinceLastSeizure}
					/>

					<DashboardStats
						thisMonthCount={thisMonthCount}
						lastMonthCount={lastMonthCount}
					/>

					<DashboardHeatmap days={heatmapDays} />

					<DashboardToday
						isTrackingDone={isTrackingDone}
						medications={medications}
						medicationsTakenToday={medicationsTakenToday}
					/>

					{recentSeizures.length > 0 && (
						<DashboardRecentSeizures seizures={recentSeizures} />
					)}
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}
