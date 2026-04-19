// app/(tabs)/history.tsx

import { ExportForm } from "@/components/history"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useExport } from "@/hooks"
import { ScrollView } from "react-native"

export default function History() {
	const { spacing } = useAppTheme()
	const { exportPdf, isLoading, error } = useExport()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Історія" showBackButton={false} />
			<ScrollView contentContainerStyle={{ padding: spacing.lg }}>
				<ExportForm onExport={exportPdf} isLoading={isLoading} error={error} />
			</ScrollView>
		</ScreenWrapper>
	)
}
