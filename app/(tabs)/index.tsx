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
import { useTranslation } from "react-i18next"

export default function Dashboard() {
	const { colors, fonts, fontSize, spacing } = useAppTheme()
	const { t } = useTranslation()
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
				title={firstName ? t('dashboard.greeting', { name: firstName }) : t('dashboard.greetingDefault')}
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
						{t('dashboard.emptyTitle')}
					</Text>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: fontSize.md,
							color: colors.textSecondary,
							textAlign: "center",
						}}
					>
						{t('dashboard.emptySubtitle')}
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
							{t('dashboard.addSeizure')}
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
