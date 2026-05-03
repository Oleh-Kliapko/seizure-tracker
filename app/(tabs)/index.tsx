// app/(tabs)/index.tsx

import {
	DashboardHeatmap,
	DashboardHero,
	DashboardRecentSeizures,
	DashboardStats,
	DashboardToday,
} from "@/components/dashboard"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useDashboard } from "@/hooks/useDashboard"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { router } from "expo-router"
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
		trackingFilledSections,
		medications,
		medicationsTakenToday,
	} = useDashboard()

	const today = format(new Date(), "d MMMM yyyy", { locale: uk })
	const firstName = profile?.firstName ?? ""

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={firstName ? `Привіт, ${firstName}` : "Привіт"}
				subtitle={today}
				showBackButton={false}
			/>

			{isLoading ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
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
						Тут з&apos;явиться статистика після першого запису
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
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.md,
								color: "#fff",
							}}
						>
							+ Додати приступ
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{
						padding: spacing.lg,
						paddingTop: spacing.sm,
					}}
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
						trackingFilledSections={trackingFilledSections}
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
