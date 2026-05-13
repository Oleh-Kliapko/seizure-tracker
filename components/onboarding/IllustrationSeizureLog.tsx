// components/onboarding/IllustrationSeizureLog.tsx

import Svg, { Circle, Rect } from "react-native-svg"

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

export function IllustrationSeizureLog({ c }: { c: Colors }) {
	return (
		<Svg width="100%" viewBox="0 0 300 260" fill="none">
			{/* Card background */}
			<Rect x="15" y="12" width="270" height="236" rx="24" fill={c.surface} />

			{/* Primary header */}
			<Rect x="15" y="12" width="270" height="54" rx="24" fill={c.primary} />
			<Rect x="15" y="42" width="270" height="24" fill={c.primary} />
			{/* Title placeholder */}
			<Rect x="36" y="28" width="100" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />
			{/* Plus button */}
			<Circle cx="262" cy="39" r="16" fill={c.onPrimary} fillOpacity="0.15" />
			<Rect x="255" y="38" width="14" height="2" rx="1" fill={c.onPrimary} />
			<Rect x="261" y="32" width="2" height="14" rx="1" fill={c.onPrimary} />

			{/* Seizure card 1 — severe */}
			<Rect x="26" y="78" width="248" height="50" rx="14" fill={c.background} />
			<Circle cx="52" cy="103" r="12" fill={c.error} />
			<Rect x="74" y="93" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
			<Rect x="74" y="109" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
			<Rect x="200" y="96" width="58" height="14" rx="7" fill={c.error} fillOpacity="0.12" />
			<Rect x="208" y="99" width="42" height="8" rx="4" fill={c.error} fillOpacity="0.5" />

			{/* Seizure card 2 — medium */}
			<Rect x="26" y="138" width="248" height="50" rx="14" fill={c.background} />
			<Circle cx="52" cy="163" r="12" fill={c.warning} />
			<Rect x="74" y="153" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
			<Rect x="74" y="169" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
			<Rect x="200" y="156" width="58" height="14" rx="7" fill={c.warning} fillOpacity="0.12" />
			<Rect x="208" y="159" width="42" height="8" rx="4" fill={c.warning} fillOpacity="0.5" />

			{/* Seizure card 3 — light */}
			<Rect x="26" y="198" width="248" height="50" rx="14" fill={c.background} />
			<Circle cx="52" cy="223" r="12" fill={c.success} />
			<Rect x="74" y="213" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
			<Rect x="74" y="229" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
			<Rect x="200" y="216" width="58" height="14" rx="7" fill={c.success} fillOpacity="0.12" />
			<Rect x="208" y="219" width="42" height="8" rx="4" fill={c.success} fillOpacity="0.5" />
		</Svg>
	)
}
