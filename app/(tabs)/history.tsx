// app/(tabs)/history.tsx

import type { HistoryPeriod } from "@/components/history"
import {
	ExportForm,
	HistoryCalendar,
	HistoryDonutChart,
	HistoryPeriodFilter,
	HistoryTriggerBars,
	getPeriodRange,
} from "@/components/history"
import { SeizureStatsHeader } from "@/components/seizure/list"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useExport, useUser, useHistoryData } from "@/hooks"
import { useFocusEffect } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	View,
} from "react-native"

function SectionCard({
	title,
	children,
}: {
	title: string
	children: React.ReactNode
}) {
	const { colors, fonts, spacing, radius } = useAppTheme()
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
					fontSize: 12,
					color: colors.textSecondary,
					textTransform: "uppercase",
					letterSpacing: 0.5,
					marginBottom: spacing.md,
				}}
			>
				{title}
			</Text>
			{children}
		</View>
	)
}

export default function History() {
	const { colors, spacing } = useAppTheme()
	const { t } = useTranslation()
	const {
		exportPdf,
		exportPdfToEmail,
		isLoading: isExporting,
		error: exportError,
	} = useExport()
	const { profile } = useUser()

	const [period, setPeriod] = useState<HistoryPeriod>("month")
	const [refreshKey, setRefreshKey] = useState(0)
	const [refreshing, setRefreshing] = useState(false)
	const { from, to } = useMemo(() => getPeriodRange(period), [period])
	const { seizures, seizuresByDate, timeOfDay, topTriggers, isLoading } =
		useHistoryData(from, to, refreshKey)

	useFocusEffect(
		useCallback(() => {
			setRefreshKey(k => k + 1)
		}, []),
	)

	useEffect(() => {
		if (!isLoading) setRefreshing(false)
	}, [isLoading])

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		setRefreshKey(k => k + 1)
	}, [])

	return (
		<ScreenWrapper>
			<ScreenHeader title={t("history.title")} showBackButton={false} />
			<ScrollView
				contentContainerStyle={{ padding: spacing.lg }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={colors.primary}
					/>
				}
			>
				<HistoryPeriodFilter active={period} onChange={setPeriod} />

				{isLoading && !refreshing ? (
					<View style={{ paddingVertical: 40, alignItems: "center" }}>
						<ActivityIndicator color={colors.primary} size="large" />
					</View>
				) : (
					<>
						<SeizureStatsHeader seizures={seizures} />

						{period !== "all" && (
							<SectionCard title={t("history.calendar")}>
								<HistoryCalendar
									seizuresByDate={seizuresByDate}
									from={from}
									to={to}
								/>
							</SectionCard>
						)}

						<SectionCard title={t("history.timeDistribution")}>
							<HistoryDonutChart data={timeOfDay} />
						</SectionCard>

						<SectionCard title={t("history.topTriggers")}>
							<HistoryTriggerBars data={topTriggers} />
						</SectionCard>
					</>
				)}

				<ExportForm
					onExport={exportPdf}
					onExportEmail={exportPdfToEmail}
					isLoading={isExporting}
					error={exportError}
					lastReportSentAt={profile?.lastReportSentAt}
				/>
			</ScrollView>
		</ScreenWrapper>
	)
}
