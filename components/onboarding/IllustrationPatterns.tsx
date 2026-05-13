// components/onboarding/IllustrationPatterns.tsx

import Svg, { Rect } from "react-native-svg"

type Colors = {
	primary: string
	surface: string
	border: string
	error: string
	warning: string
	success: string
	textSecondary: string
	onPrimary: string
	background: string
}

// 0 = empty, 1 = low (primary), 2 = medium (warning), 3 = high (error)
const GRID = [
	[0, 1, 0, 0, 2, 0, 1],
	[0, 0, 1, 0, 0, 3, 0],
	[1, 0, 0, 2, 0, 0, 0],
	[0, 0, 1, 0, 0, 1, 0],
]

export function IllustrationPatterns({ c }: { c: Colors }) {
	const dotColor = (v: number) => {
		if (v === 1) return c.primary
		if (v === 2) return c.warning
		if (v === 3) return c.error
		return c.border
	}
	const dotOpacity = (v: number) => (v === 0 ? "1" : "0.75")

	const dotSize = 16
	const dotGap = 6
	const cols = 7
	const gridWidth = cols * dotSize + (cols - 1) * dotGap
	const gridLeft = (300 - gridWidth) / 2

	// Bar chart — 6 bars, base y=152
	const bars = [
		{ h: 28, op: "0.35" },
		{ h: 54, op: "0.5" },
		{ h: 16, op: "0.28" },
		{ h: 74, op: "0.82" },
		{ h: 38, op: "0.62" },
		{ h: 58, op: "0.7" },
	]
	const barW = 28
	const barGap = 18
	const barsCount = bars.length
	const barsWidth = barsCount * barW + (barsCount - 1) * barGap
	const barLeft = (300 - barsWidth) / 2
	const baseY = 152

	return (
		<Svg width="100%" viewBox="0 0 300 260" fill="none">
			{/* Card */}
			<Rect x="15" y="12" width="270" height="236" rx="24" fill={c.surface} />

			{/* Header */}
			<Rect x="15" y="12" width="270" height="52" rx="24" fill={c.primary} />
			<Rect x="15" y="40" width="270" height="24" fill={c.primary} />
			<Rect x="36" y="25" width="90" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />
			<Rect x="186" y="25" width="70" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.3" />

			{/* Bar chart section label */}
			<Rect x="36" y="74" width="60" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.32" />

			{/* Bars */}
			{bars.map((bar, i) => (
				<Rect
					key={i}
					x={barLeft + i * (barW + barGap)}
					y={baseY - bar.h}
					width={barW}
					height={bar.h}
					rx="7"
					fill={c.primary}
					fillOpacity={bar.op}
				/>
			))}

			{/* Baseline */}
			<Rect x="36" y={baseY} width="228" height="1.5" rx="1" fill={c.border} />

			{/* Heatmap section label */}
			<Rect x={gridLeft} y="162" width="55" height="7" rx="3" fill={c.textSecondary} fillOpacity="0.3" />

			{/* Heatmap grid */}
			{GRID.map((row, ri) =>
				row.map((val, ci) => (
					<Rect
						key={`${ri}-${ci}`}
						x={gridLeft + ci * (dotSize + dotGap)}
						y={172 + ri * (dotSize + dotGap)}
						width={dotSize}
						height={dotSize}
						rx="4"
						fill={dotColor(val)}
						fillOpacity={dotOpacity(val)}
					/>
				))
			)}
		</Svg>
	)
}
