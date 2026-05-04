// components/history/HistoryDonutChart.tsx

import { useAppTheme } from "@/hooks"
import { TimeOfDay } from "@/hooks/useHistoryData"
import { polarToCartesian, slicePath } from "@/utils/historyHelpers"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { G, Path, Svg, Text as SvgText } from "react-native-svg"
import { DonutChartLegend } from "./DonutChartLegend"
import { getStyles } from "./getStyles"

type SegmentDef = {
	key: keyof TimeOfDay
	labelKey: string
	color: string
}

const SEGMENT_DEFS: SegmentDef[] = [
	{ key: "night", labelKey: "history.night", color: "#5C6BC0" },
	{ key: "morning", labelKey: "history.morning", color: "#FFA726" },
	{ key: "afternoon", labelKey: "history.afternoon", color: "#26C6DA" },
	{ key: "evening", labelKey: "history.evening", color: "#AB47BC" },
]

const SIZE = 160
const CX = SIZE / 2
const CY = SIZE / 2
const OUTER_R = 68
const INNER_R = 44

type Props = {
	data: TimeOfDay
}

export function HistoryDonutChart({ data }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const total = Object.values(data).reduce((a, b) => a + b, 0)

	if (total === 0) {
		return (
			<View style={styles.emptyState}>
				<Text style={styles.emptyStateText}>{t("history.noData")}</Text>
			</View>
		)
	}

	let angle = 0
	const slices = SEGMENT_DEFS.map(seg => {
		const count = data[seg.key]
		const span = (count / total) * 360
		const start = angle
		angle += span
		return { ...seg, count, startAngle: start, endAngle: angle }
	}).filter(s => s.count > 0)

	const legendItems = slices.map(s => ({ key: s.key, label: t(s.labelKey), color: s.color }))

	return (
		<View style={styles.donutContainer}>
			<View>
				<Svg width={SIZE} height={SIZE}>
					<G>
						{slices.map(s => (
							<Path
								key={s.key}
								d={slicePath(CX, CY, OUTER_R, INNER_R, s.startAngle, s.endAngle)}
								fill={s.color}
							/>
						))}
						{slices
							.filter(s => s.endAngle - s.startAngle > 20)
							.map(s => {
								const mid = (s.startAngle + s.endAngle) / 2
								const pos = polarToCartesian(CX, CY, (INNER_R + OUTER_R) / 2, mid)
								return (
									<SvgText
										key={`label-${s.key}`}
										x={pos.x}
										y={pos.y}
										textAnchor="middle"
										alignmentBaseline="central"
										fontSize="12"
										fontWeight="bold"
										fill="white"
									>
										{s.count}
									</SvgText>
								)
							})}
					</G>
				</Svg>

				<View style={styles.donutCenterOverlay}>
					<Text style={styles.donutTotal}>{total}</Text>
					<Text style={styles.donutTotalLabel}>{t("history.total")}</Text>
				</View>
			</View>

			<DonutChartLegend items={legendItems} />
		</View>
	)
}
