// app/(tabs)/tracking/index.tsx

import { TrackingCalendar } from "@/components/tracking"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { ScrollView } from "react-native"

export default function TrackingScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()

	return (
		<ScreenWrapper>
			<ScreenHeader title={t("tracking.title")} showBackButton={false} />
			<ScrollView
				contentContainerStyle={{ padding: spacing.lg }}
				showsVerticalScrollIndicator={false}
			>
				<TrackingCalendar />
			</ScrollView>
		</ScreenWrapper>
	)
}
