// app/(tabs)/index.tsx

import {
	DashboardEmpty,
	DashboardHeatmap,
	DashboardHero,
	DashboardRecentSeizures,
	DashboardStats,
	DashboardToday,
} from "@/components/dashboard"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useDashboard } from "@/hooks"
import { format } from "date-fns"
import { uk } from "date-fns/locale"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	View,
} from "react-native"

export default function Dashboard() {
	const { colors, spacing } = useAppTheme()
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
		reload,
	} = useDashboard()

	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await reload()
		setRefreshing(false)
	}, [reload])

	const today = format(new Date(), "d MMMM yyyy", { locale: uk })
	const firstName = profile?.firstName ?? ""

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={
					firstName
						? t("dashboard.greeting", { name: firstName })
						: t("dashboard.greetingDefault")
				}
				subtitle={today}
				showBackButton={false}
			/>

			{isLoading && !refreshing ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator color={colors.primary} />
				</View>
			) : !hasSeizures ? (
				<DashboardEmpty />
			) : (
				<ScrollView
					contentContainerStyle={{
						padding: spacing.lg,
						paddingTop: spacing.sm,
					}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							tintColor={colors.primary}
						/>
					}
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
