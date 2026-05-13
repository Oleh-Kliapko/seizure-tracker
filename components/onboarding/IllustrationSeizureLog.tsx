// components/onboarding/IllustrationSeizureLog.tsx

import Animated, {
	cancelAnimation,
	Easing,
	SharedValue,
	useAnimatedProps,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated"
import Svg, { Circle, G, Rect } from "react-native-svg"
import { useEffect } from "react"

const AnimatedG = Animated.createAnimatedComponent(G)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type Colors = {
	primary: string; surface: string; border: string; error: string
	warning: string; success: string; textSecondary: string; onPrimary: string; background: string
}

const EASE = Easing.out(Easing.cubic)

export function IllustrationSeizureLog({ c, active }: { c: Colors; active: boolean }) {
	const hOp = useSharedValue(0)
	const c1Op = useSharedValue(0), c1Y = useSharedValue(28)
	const c2Op = useSharedValue(0), c2Y = useSharedValue(28)
	const c3Op = useSharedValue(0), c3Y = useSharedValue(28)
	const d1R = useSharedValue(12), d2R = useSharedValue(12), d3R = useSharedValue(12)

	useEffect(() => {
		if (active) {
			hOp.value = 0
			c1Op.value = 0; c1Y.value = 28
			c2Op.value = 0; c2Y.value = 28
			c3Op.value = 0; c3Y.value = 28
			d1R.value = 12; d2R.value = 12; d3R.value = 12

			hOp.value = withTiming(1, { duration: 350 })
			c1Op.value = withDelay(150, withTiming(1, { duration: 380 }))
			c1Y.value = withDelay(150, withTiming(0, { duration: 420, easing: EASE }))
			c2Op.value = withDelay(340, withTiming(1, { duration: 380 }))
			c2Y.value = withDelay(340, withTiming(0, { duration: 420, easing: EASE }))
			c3Op.value = withDelay(530, withTiming(1, { duration: 380 }))
			c3Y.value = withDelay(530, withTiming(0, { duration: 420, easing: EASE }))

			const pulse = (sv: SharedValue<number>, delay: number) =>
				sv.value = withDelay(delay, withRepeat(
					withSequence(withTiming(16, { duration: 700 }), withTiming(12, { duration: 700 })),
					-1, false,
				))
			pulse(d1R, 1200)
			pulse(d2R, 1600)
			pulse(d3R, 2000)
		} else {
			cancelAnimation(d1R); cancelAnimation(d2R); cancelAnimation(d3R)
		}
	}, [active])

	const hProps = useAnimatedProps(() => ({ opacity: hOp.value }))
	const c1Props = useAnimatedProps(() => ({ opacity: c1Op.value, transform: [{ translateY: c1Y.value }] }))
	const c2Props = useAnimatedProps(() => ({ opacity: c2Op.value, transform: [{ translateY: c2Y.value }] }))
	const c3Props = useAnimatedProps(() => ({ opacity: c3Op.value, transform: [{ translateY: c3Y.value }] }))
	const d1Props = useAnimatedProps(() => ({ r: d1R.value }))
	const d2Props = useAnimatedProps(() => ({ r: d2R.value }))
	const d3Props = useAnimatedProps(() => ({ r: d3R.value }))

	return (
		<Svg width="100%" height="100%" viewBox="0 0 300 260" fill="none">
			{/* Header */}
			<AnimatedG animatedProps={hProps}>
				<Rect x="15" y="12" width="270" height="54" rx="24" fill={c.primary} />
				<Rect x="15" y="42" width="270" height="24" fill={c.primary} />
				<Rect x="36" y="28" width="100" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />
				<Circle cx="262" cy="39" r="16" fill={c.onPrimary} fillOpacity="0.15" />
				<Rect x="255" y="38" width="14" height="2" rx="1" fill={c.onPrimary} />
				<Rect x="261" y="32" width="2" height="14" rx="1" fill={c.onPrimary} />
			</AnimatedG>

			{/* Card 1 — error */}
			<AnimatedG animatedProps={c1Props}>
				<Rect x="26" y="78" width="248" height="50" rx="14" fill={c.background} />
				<AnimatedCircle cx="52" cy="103" animatedProps={d1Props} fill={c.error} />
				<Rect x="74" y="93" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x="74" y="109" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
				<Rect x="200" y="96" width="58" height="14" rx="7" fill={c.error} fillOpacity="0.12" />
				<Rect x="208" y="99" width="42" height="8" rx="4" fill={c.error} fillOpacity="0.5" />
			</AnimatedG>

			{/* Card 2 — warning */}
			<AnimatedG animatedProps={c2Props}>
				<Rect x="26" y="138" width="248" height="50" rx="14" fill={c.background} />
				<AnimatedCircle cx="52" cy="163" animatedProps={d2Props} fill={c.warning} />
				<Rect x="74" y="153" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x="74" y="169" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
				<Rect x="200" y="156" width="58" height="14" rx="7" fill={c.warning} fillOpacity="0.12" />
				<Rect x="208" y="159" width="42" height="8" rx="4" fill={c.warning} fillOpacity="0.5" />
			</AnimatedG>

			{/* Card 3 — success */}
			<AnimatedG animatedProps={c3Props}>
				<Rect x="26" y="198" width="248" height="50" rx="14" fill={c.background} />
				<AnimatedCircle cx="52" cy="223" animatedProps={d3Props} fill={c.success} />
				<Rect x="74" y="213" width="85" height="10" rx="5" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x="74" y="229" width="58" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.22" />
				<Rect x="200" y="216" width="58" height="14" rx="7" fill={c.success} fillOpacity="0.12" />
				<Rect x="208" y="219" width="42" height="8" rx="4" fill={c.success} fillOpacity="0.5" />
			</AnimatedG>
		</Svg>
	)
}
