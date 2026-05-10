// app/(tabs)/tracking/index.tsx

import { ReportForm } from "@/components/report"
import { TrackingCalendar } from "@/components/tracking"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useTrackingExport } from "@/hooks"
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"

export default function TrackingScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const { exportPdf, isLoading, error } = useTrackingExport()

	return (
		<ScreenWrapper>
			<ScreenHeader title={t("tracking.title")} showBackButton={false} />
			<ScrollView
				contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
				showsVerticalScrollIndicator={false}
			>
				<TrackingCalendar />
				<ReportForm
					title={t("tracking.reportTitle")}
					rules={[t("tracking.reportRule1")]}
					onExport={exportPdf}
					isLoading={isLoading}
					error={error}
					showEmail={false}
				/>
			</ScrollView>
		</ScreenWrapper>
	)
}
