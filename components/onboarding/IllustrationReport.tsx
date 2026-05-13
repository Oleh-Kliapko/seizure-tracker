// components/onboarding/IllustrationReport.tsx

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

export function IllustrationReport({ c }: { c: Colors }) {
	const docX = 30
	const docY = 18
	const docW = 220
	const docH = 210

	// Bar chart (small, inside document)
	const miniBarW = 18
	const miniBarGap = 8
	const miniBarBase = docY + docH - 36
	const miniBarHeights = [22, 36, 18, 42, 28]
	const miniBarsLeft = docX + 20

	return (
		<Svg width="100%" viewBox="0 0 300 260" fill="none">
			{/* Document shadow */}
			<Rect x={docX + 6} y={docY + 6} width={docW} height={docH} rx="22" fill={c.textSecondary} fillOpacity="0.12" />

			{/* Document body */}
			<Rect x={docX} y={docY} width={docW} height={docH} rx="22" fill={c.surface} />

			{/* Document header */}
			<Rect x={docX} y={docY} width={docW} height="56" rx="22" fill={c.primary} />
			<Rect x={docX} y={docY + 36} width={docW} height="20" fill={c.primary} />
			{/* Title */}
			<Rect x={docX + 20} y={docY + 16} width="90" height="11" rx="5" fill={c.onPrimary} fillOpacity="0.75" />
			{/* Date */}
			<Rect x={docX + 20} y={docY + 32} width="60" height="8" rx="4" fill={c.onPrimary} fillOpacity="0.4" />

			{/* Data rows */}
			{[0, 1, 2, 3, 4].map(i => (
				<>
					<Rect
						key={`label-${i}`}
						x={docX + 20}
						y={docY + 76 + i * 20}
						width="48"
						height="8"
						rx="4"
						fill={c.textSecondary}
						fillOpacity="0.38"
					/>
					<Rect
						key={`value-${i}`}
						x={docX + 80}
						y={docY + 76 + i * 20}
						width="120"
						height="8"
						rx="4"
						fill={c.textSecondary}
						fillOpacity="0.18"
					/>
				</>
			))}

			{/* Mini bar chart */}
			{miniBarHeights.map((h, i) => (
				<Rect
					key={`bar-${i}`}
					x={miniBarsLeft + i * (miniBarW + miniBarGap)}
					y={miniBarBase - h}
					width={miniBarW}
					height={h}
					rx="5"
					fill={c.primary}
					fillOpacity={0.3 + i * 0.12}
				/>
			))}
			<Rect x={miniBarsLeft} y={miniBarBase} width={5 * miniBarW + 4 * miniBarGap} height="1.5" rx="1" fill={c.border} />

			{/* Share button */}
			<Circle cx="238" cy="218" r="28" fill={c.primary} />
			{/* Arrow up + box (share icon) */}
			<Path
				d="M 238 210 L 238 224"
				stroke={c.onPrimary}
				strokeWidth="2.5"
				strokeLinecap="round"
			/>
			<Path
				d="M 232 216 L 238 209 L 244 216"
				stroke={c.onPrimary}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M 231 222 L 231 228 L 245 228 L 245 222"
				stroke={c.onPrimary}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}
