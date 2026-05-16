// components/ui/IllustrationDashboardEmpty.tsx

import { useAppTheme } from "@/hooks"
import { Circle, Line, Polyline, Rect, Svg } from "react-native-svg"

export function IllustrationDashboardEmpty() {
	const { colors } = useAppTheme()

	return (
		<Svg width={200} height={168} viewBox="0 0 200 168">
			{/* Soft background glow */}
			<Circle cx="100" cy="82" r="72" fill={colors.primary} opacity="0.08" />

			{/* Monitor body */}
			<Rect
				x="42" y="28" width="116" height="84"
				rx="10"
				fill={colors.surface}
				stroke={colors.primary}
				strokeWidth="1.5"
			/>

			{/* Screen area */}
			<Rect
				x="52" y="38" width="96" height="64"
				rx="5"
				fill={colors.background}
			/>

			{/* EEG wave */}
			<Polyline
				points="56,70 65,70 70,48 74,92 79,55 84,70 93,70 102,70 108,70 113,50 117,90 122,62 126,70 136,70 144,70"
				stroke={colors.primary}
				strokeWidth="2"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			{/* Monitor stand */}
			<Rect x="88" y="112" width="24" height="9" rx="3" fill={colors.border} />
			<Rect x="72" y="121" width="56" height="5" rx="2.5" fill={colors.border} />

			{/* Sparkle dots */}
			<Circle cx="32" cy="44" r="4" fill={colors.primary} opacity="0.45" />
			<Circle cx="170" cy="38" r="5" fill={colors.secondary} opacity="0.45" />
			<Circle cx="174" cy="120" r="3" fill={colors.primary} opacity="0.35" />
			<Circle cx="28" cy="118" r="3" fill={colors.secondary} opacity="0.35" />
			<Circle cx="155" cy="148" r="2.5" fill={colors.primary} opacity="0.3" />
			<Circle cx="44" cy="150" r="2" fill={colors.secondary} opacity="0.3" />

			{/* Small cross sparkles */}
			<Line x1="168" y1="62" x2="168" y2="70" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="164" y1="66" x2="172" y2="66" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="32" y1="88" x2="32" y2="94" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="29" y1="91" x2="35" y2="91" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
		</Svg>
	)
}
