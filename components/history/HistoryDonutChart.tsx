// components/history/HistoryDonutChart.tsx

import { useAppTheme } from "@/hooks"
import { TimeOfDay } from "@/hooks/useHistoryData"
import { Text, View } from "react-native"
import { G, Path, Svg, Text as SvgText } from "react-native-svg"
import { useTranslation } from "react-i18next"

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
	const rad = ((deg - 90) * Math.PI) / 180
	return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function slicePath(
	cx: number,
	cy: number,
	outerR: number,
	innerR: number,
	startDeg: number,
	endDeg: number,
): string {
	const gap = 2
	const s = startDeg + gap / 2
	const e = endDeg - gap / 2
	if (e - s < 1) return ""
	const large = e - s > 180 ? 1 : 0
	const o1 = polarToCartesian(cx, cy, outerR, s)
	const o2 = polarToCartesian(cx, cy, outerR, e)
	const i1 = polarToCartesian(cx, cy, innerR, s)
	const i2 = polarToCartesian(cx, cy, innerR, e)
	return [
		`M ${o1.x} ${o1.y}`,
		`A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
		`L ${i2.x} ${i2.y}`,
		`A ${innerR} ${innerR} 0 ${large} 0 ${i1.x} ${i1.y}`,
		"Z",
	].join(" ")
}

type SegmentDef = {
	key: keyof TimeOfDay
	labelKey: string
	color: string
	emoji: string
}

const SEGMENT_DEFS: SegmentDef[] = [
	{ key: "night", labelKey: "history.night", color: "#5C6BC0", emoji: "🌙" },
	{ key: "morning", labelKey: "history.morning", color: "#FFA726", emoji: "🌅" },
	{ key: "afternoon", labelKey: "history.afternoon", color: "#26C6DA", emoji: "☀️" },
	{ key: "evening", labelKey: "history.evening", color: "#AB47BC", emoji: "🌆" },
]

type Props = {
	data: TimeOfDay
}

export function HistoryDonutChart({ data }: Props) {
	const { colors, fonts, spacing } = useAppTheme()
	const { t } = useTranslation()
	const SEGMENTS = SEGMENT_DEFS.map(s => ({ ...s, label: t(s.labelKey) }))
	const total = Object.values(data).reduce((a, b) => a + b, 0)

	const SIZE = 160
	const cx = SIZE / 2
	const cy = SIZE / 2
	const outerR = 68
	const innerR = 44

	if (total === 0) {
		return (
			<View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
				<Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary }}>
					{t("history.noData")}
				</Text>
			</View>
		)
	}

	let angle = 0
	const slices = SEGMENTS.map(seg => {
		const count = data[seg.key]
		const span = (count / total) * 360
		const start = angle
		angle += span
		return { ...seg, count, startAngle: start, endAngle: angle }
	}).filter(s => s.count > 0)

	return (
		<View style={{ alignItems: "center" }}>
			<View>
				<Svg width={SIZE} height={SIZE}>
					<G>
						{slices.map(s => (
							<Path
								key={s.key}
								d={slicePath(cx, cy, outerR, innerR, s.startAngle, s.endAngle)}
								fill={s.color}
							/>
						))}
						{slices
							.filter(s => s.endAngle - s.startAngle > 20)
							.map(s => {
								const mid = (s.startAngle + s.endAngle) / 2
								const pos = polarToCartesian(cx, cy, (innerR + outerR) / 2, mid)
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
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={{ fontFamily: fonts.bold, fontSize: 26, color: colors.onSurface }}>
						{total}
					</Text>
					<Text style={{ fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary }}>
						{t("history.total")}
					</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 10,
					marginTop: spacing.md,
				}}
			>
				{slices.map(s => (
					<View key={s.key} style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
						<View
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: s.color,
							}}
						/>
						<Text style={{ fontFamily: fonts.regular, fontSize: 13, color: colors.onSurface }}>
							{s.label}
						</Text>
					</View>
				))}
			</View>
		</View>
	)
}
