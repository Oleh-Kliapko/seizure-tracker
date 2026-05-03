// components/history/HistoryTriggerBars.tsx

import { useAppTheme } from "@/hooks"
import { TriggerStat } from "@/hooks/useHistoryData"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"

type Props = {
	data: TriggerStat[]
}

export function HistoryTriggerBars({ data }: Props) {
	const { colors, fonts, spacing, radius } = useAppTheme()
	const { t } = useTranslation()

	if (data.length === 0) {
		return (
			<View style={{ paddingVertical: spacing.md, alignItems: "center" }}>
				<Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary }}>
					{t("history.noTriggers")}
				</Text>
			</View>
		)
	}

	const max = data[0].count

	return (
		<View style={{ gap: spacing.sm }}>
			{data.map((item, i) => (
				<View key={`${item.label}-${i}`}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 4,
						}}
					>
						<Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.onSurface }}>
							{item.label}
						</Text>
						<Text style={{ fontFamily: fonts.medium, fontSize: 14, color: colors.primary }}>
							{item.count}
						</Text>
					</View>
					<View
						style={{
							height: 6,
							backgroundColor: colors.border,
							borderRadius: radius.sm,
							overflow: "hidden",
						}}
					>
						<View
							style={{
								height: 6,
								width: `${(item.count / max) * 100}%`,
								backgroundColor: colors.primary,
								borderRadius: radius.sm,
							}}
						/>
					</View>
				</View>
			))}
		</View>
	)
}
