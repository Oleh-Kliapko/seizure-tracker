// components/ui/IllustrationSeizuresEmpty.tsx

import { useAppTheme } from "@/hooks"
import { Circle, Line, Rect, Svg } from "react-native-svg"

export function IllustrationSeizuresEmpty() {
	const { colors } = useAppTheme()

	return (
		<Svg width={200} height={168} viewBox="0 0 200 168">
			{/* Soft background glow */}
			<Circle cx="100" cy="90" r="68" fill={colors.primary} opacity="0.08" />

			{/* Clipboard body */}
			<Rect
				x="52" y="42" width="96" height="112"
				rx="10"
				fill={colors.surface}
				stroke={colors.border}
				strokeWidth="1.5"
			/>

			{/* Clipboard clip */}
			<Rect
				x="76" y="33" width="48" height="18"
				rx="9"
				fill={colors.surface}
				stroke={colors.border}
				strokeWidth="1.5"
			/>
			<Rect
				x="85" y="38" width="30" height="8"
				rx="4"
				fill={colors.border}
				opacity="0.5"
			/>

			{/* Empty line rows */}
			<Rect x="66" y="72" width="68" height="9" rx="4.5" fill={colors.border} opacity="0.55" />
			<Rect x="66" y="90" width="52" height="9" rx="4.5" fill={colors.border} opacity="0.55" />
			<Rect x="66" y="108" width="60" height="9" rx="4.5" fill={colors.border} opacity="0.55" />

			{/* Plus button circle */}
			<Circle cx="100" cy="134" r="13" fill={colors.primary} opacity="0.15" />
			<Circle cx="100" cy="134" r="13" stroke={colors.primary} strokeWidth="1.5" fill="none" opacity="0.4" />
			<Line x1="100" y1="127" x2="100" y2="141" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
			<Line x1="93" y1="134" x2="107" y2="134" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />

			{/* Sparkle dots */}
			<Circle cx="34" cy="58" r="4" fill={colors.primary} opacity="0.4" />
			<Circle cx="168" cy="52" r="5" fill={colors.secondary} opacity="0.4" />
			<Circle cx="170" cy="130" r="3" fill={colors.primary} opacity="0.3" />
			<Circle cx="30" cy="122" r="3" fill={colors.secondary} opacity="0.3" />

			{/* Small cross sparkles */}
			<Line x1="166" y1="82" x2="166" y2="90" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="162" y1="86" x2="170" y2="86" stroke={colors.secondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="34" y1="98" x2="34" y2="104" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
			<Line x1="31" y1="101" x2="37" y2="101" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
		</Svg>
	)
}
