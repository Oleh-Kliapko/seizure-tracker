// components/history/HistoryPeriodFilter.tsx

import { useAppTheme } from "@/hooks"
import { Text, TouchableOpacity, View } from "react-native"

export type HistoryPeriod = "month" | "3months" | "6months" | "year"

const PERIODS: { label: string; value: HistoryPeriod }[] = [
	{ label: "Місяць", value: "month" },
	{ label: "3 місяці", value: "3months" },
	{ label: "6 місяців", value: "6months" },
	{ label: "Рік", value: "year" },
]

export function getPeriodRange(period: HistoryPeriod): { from: number; to: number } {
	const to = new Date()
	to.setHours(23, 59, 59, 999)
	const from = new Date()
	from.setHours(0, 0, 0, 0)
	switch (period) {
		case "month":
			from.setDate(from.getDate() - 29)
			break
		case "3months":
			from.setMonth(from.getMonth() - 3)
			break
		case "6months":
			from.setMonth(from.getMonth() - 6)
			break
		case "year":
			from.setFullYear(from.getFullYear() - 1)
			break
	}
	return { from: from.getTime(), to: to.getTime() }
}

type Props = {
	active: HistoryPeriod
	onChange: (v: HistoryPeriod) => void
}

export function HistoryPeriodFilter({ active, onChange }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	return (
		<View style={{ flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md }}>
			{PERIODS.map(p => (
				<TouchableOpacity
					key={p.value}
					onPress={() => onChange(p.value)}
					activeOpacity={0.7}
					style={{
						flex: 1,
						paddingVertical: spacing.xs + 2,
						borderRadius: radius.md,
						backgroundColor: active === p.value ? colors.primary : colors.surface,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: 12,
							color: active === p.value ? "#fff" : colors.textSecondary,
						}}
					>
						{p.label}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)
}
