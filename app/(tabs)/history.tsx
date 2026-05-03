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
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useExport } from "@/hooks"
import { useHistoryData } from "@/hooks/useHistoryData"
import { useFocusEffect } from "expo-router"
import { useCallback, useMemo, useState } from "react"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"

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
	const { colors, fonts, spacing } = useAppTheme()
	const {
		exportPdf,
		exportPdfToEmail,
		isLoading: isExporting,
		error: exportError,
	} = useExport()

	const [period, setPeriod] = useState<HistoryPeriod>("month")
	const [refreshKey, setRefreshKey] = useState(0)
	const { from, to } = useMemo(() => getPeriodRange(period), [period])
	const { seizures, seizuresByDate, timeOfDay, topTriggers, isLoading } =
		useHistoryData(from, to, refreshKey)

	useFocusEffect(
		useCallback(() => {
			setRefreshKey(k => k + 1)
		}, []),
	)

	return (
		<ScreenWrapper>
			<ScreenHeader title="Історія" showBackButton={false} />
			<ScrollView
				contentContainerStyle={{ padding: spacing.lg }}
				showsVerticalScrollIndicator={false}
			>
				<HistoryPeriodFilter active={period} onChange={setPeriod} />

				{isLoading ? (
					<View style={{ paddingVertical: 40, alignItems: "center" }}>
						<ActivityIndicator color={colors.primary} size="large" />
					</View>
				) : (
					<>
						<SectionCard title="Приступів за період">
							<Text
								style={{
									fontFamily: fonts.bold,
									fontSize: 42,
									color: colors.onSurface,
									lineHeight: 48,
								}}
							>
								{seizures.length}
							</Text>
						</SectionCard>

						<SectionCard title="Календар">
							<HistoryCalendar
								seizuresByDate={seizuresByDate}
								from={from}
								to={to}
							/>
						</SectionCard>

						<SectionCard title="Розподіл по часу доби">
							<HistoryDonutChart data={timeOfDay} />
						</SectionCard>

						<SectionCard title="Топ тригери">
							<HistoryTriggerBars data={topTriggers} />
						</SectionCard>
					</>
				)}

				<ExportForm
					onExport={exportPdf}
					onExportEmail={exportPdfToEmail}
					isLoading={isExporting}
					error={exportError}
				/>
			</ScrollView>
		</ScreenWrapper>
	)
}
