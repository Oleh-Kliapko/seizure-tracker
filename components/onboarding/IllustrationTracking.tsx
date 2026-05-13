// components/onboarding/IllustrationTracking.tsx

import Svg, { Circle, Path, Rect } from "react-native-svg"

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

export function IllustrationTracking({ c }: { c: Colors }) {
	const cardW = 112
	const cardH = 82
	const cardGap = 14
	// 2 cols: total = 2*112+14 = 238, centerX = 150, left = 150-119 = 31
	const col1X = 31
	const col2X = col1X + cardW + cardGap

	// 2 rows starting after header
	const row1Y = 76
	const row2Y = row1Y + cardH + cardGap

	// Icon centers (top-center of each card, shifted up a bit)
	const icon = (x: number, y: number) => ({ cx: x + cardW / 2, cy: y + 30 })
	const labelY = (y: number) => y + cardH - 18

	const i1 = icon(col1X, row1Y) // Sleep
	const i2 = icon(col2X, row1Y) // Mood
	const i3 = icon(col1X, row2Y) // Vitals
	const i4 = icon(col2X, row2Y) // Meds

	return (
		<Svg width="100%" viewBox="0 0 300 260" fill="none">
			{/* Card */}
			<Rect x="15" y="12" width="270" height="236" rx="24" fill={c.surface} />

			{/* Header */}
			<Rect x="15" y="12" width="270" height="52" rx="24" fill={c.primary} />
			<Rect x="15" y="40" width="270" height="24" fill={c.primary} />
			<Rect x="36" y="25" width="90" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />

			{/* Card 1 — Sleep */}
			<Rect x={col1X} y={row1Y} width={cardW} height={cardH} rx="14" fill={c.background} />
			{/* Moon crescent */}
			<Circle cx={i1.cx} cy={i1.cy} r="16" fill={c.primary} fillOpacity="0.2" />
			<Circle cx={i1.cx + 7} cy={i1.cy - 5} r="13" fill={c.background} />
			<Circle cx={i1.cx - 1} cy={i1.cy} r="14" fill={c.primary} fillOpacity="0.7" />
			<Circle cx={i1.cx + 6} cy={i1.cy - 4} r="11" fill={c.background} />
			{/* Label */}
			<Rect x={col1X + 14} y={labelY(row1Y)} width={cardW - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />

			{/* Card 2 — Mood */}
			<Rect x={col2X} y={row1Y} width={cardW} height={cardH} rx="14" fill={c.background} />
			{/* Smiley face */}
			<Circle cx={i2.cx} cy={i2.cy} r="16" fill={c.warning} fillOpacity="0.25" />
			<Circle cx={i2.cx} cy={i2.cy} r="14" stroke={c.warning} strokeWidth="2" />
			<Circle cx={i2.cx - 5} cy={i2.cy - 4} r="2.5" fill={c.warning} />
			<Circle cx={i2.cx + 5} cy={i2.cy - 4} r="2.5" fill={c.warning} />
			<Path
				d={`M ${i2.cx - 6} ${i2.cy + 4} Q ${i2.cx} ${i2.cy + 10} ${i2.cx + 6} ${i2.cy + 4}`}
				stroke={c.warning}
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
			{/* Label */}
			<Rect x={col2X + 14} y={labelY(row1Y)} width={cardW - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />

			{/* Card 3 — Vitals / ECG */}
			<Rect x={col1X} y={row2Y} width={cardW} height={cardH} rx="14" fill={c.background} />
			{/* ECG pulse line */}
			<Path
				d={`M ${col1X + 14} ${i3.cy} L ${i3.cx - 22} ${i3.cy} L ${i3.cx - 14} ${i3.cy - 14} L ${i3.cx - 6} ${i3.cy + 14} L ${i3.cx + 2} ${i3.cy - 8} L ${i3.cx + 10} ${i3.cy} L ${col1X + cardW - 14} ${i3.cy}`}
				stroke={c.error}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			{/* Label */}
			<Rect x={col1X + 14} y={labelY(row2Y)} width={cardW - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />

			{/* Card 4 — Medications */}
			<Rect x={col2X} y={row2Y} width={cardW} height={cardH} rx="14" fill={c.background} />
			{/* Pill shape */}
			<Rect x={i4.cx - 20} y={i4.cy - 10} width="40" height="20" rx="10" fill={c.success} fillOpacity="0.25" />
			<Rect x={i4.cx - 20} y={i4.cy - 10} width="40" height="20" rx="10" stroke={c.success} strokeWidth="2" />
			<Rect x={i4.cx - 1} y={i4.cy - 10} width="2" height="20" fill={c.success} fillOpacity="0.6" />
			<Rect x={i4.cx - 20} y={i4.cy - 10} width="21" height="20" rx="10" fill={c.success} fillOpacity="0.4" />
			{/* Label */}
			<Rect x={col2X + 14} y={labelY(row2Y)} width={cardW - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />
		</Svg>
	)
}
