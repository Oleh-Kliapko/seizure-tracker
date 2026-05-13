// components/onboarding/IllustrationTracking.tsx

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
import Svg, { Circle, G, Path, Rect } from "react-native-svg"
import { useEffect } from "react"

const AnimatedG = Animated.createAnimatedComponent(G)

type Colors = {
	primary: string; surface: string; border: string; error: string
	warning: string; success: string; textSecondary: string; onPrimary: string; background: string
}

const EASE = Easing.out(Easing.back(1.4))
const CARD_W = 112, CARD_H = 82, CARD_GAP = 14
const COL1 = 31, COL2 = COL1 + CARD_W + CARD_GAP
const ROW1 = 76, ROW2 = ROW1 + CARD_H + CARD_GAP

const CX0 = COL1 + CARD_W / 2, CY0 = ROW1 + CARD_H / 2
const CX1 = COL2 + CARD_W / 2, CY1 = ROW1 + CARD_H / 2
const CX2 = COL1 + CARD_W / 2, CY2 = ROW2 + CARD_H / 2
const CX3 = COL2 + CARD_W / 2, CY3 = ROW2 + CARD_H / 2

export function IllustrationTracking({ c, active }: { c: Colors; active: boolean }) {
	const op0 = useSharedValue(0), s0 = useSharedValue(0.75)
	const op1 = useSharedValue(0), s1 = useSharedValue(0.75)
	const op2 = useSharedValue(0), s2 = useSharedValue(0.75)
	const op3 = useSharedValue(0), s3 = useSharedValue(0.75)
	const hOp = useSharedValue(0)

	const startCard = (op: SharedValue<number>, s: SharedValue<number>, delay: number) => {
		op.value = withDelay(delay, withTiming(1, { duration: 350 }))
		s.value = withDelay(delay, withSequence(
			withTiming(1, { duration: 420, easing: EASE }),
			withDelay(400, withRepeat(
				withSequence(withTiming(1.06, { duration: 850 }), withTiming(1, { duration: 850 })),
				-1, false,
			)),
		))
	}

	useEffect(() => {
		if (active) {
			hOp.value = 0
			op0.value = 0; s0.value = 0.75
			op1.value = 0; s1.value = 0.75
			op2.value = 0; s2.value = 0.75
			op3.value = 0; s3.value = 0.75

			hOp.value = withTiming(1, { duration: 350 })
			startCard(op0, s0, 180)
			startCard(op1, s1, 310)
			startCard(op2, s2, 440)
			startCard(op3, s3, 570)
		} else {
			cancelAnimation(s0); cancelAnimation(s1); cancelAnimation(s2); cancelAnimation(s3)
			cancelAnimation(hOp)
		}
	}, [active])

	const hProps = useAnimatedProps(() => ({ opacity: hOp.value }))
	const c0Props = useAnimatedProps(() => ({
		opacity: op0.value,
		transform: [{ translateX: CX0 }, { translateY: CY0 }, { scale: s0.value }, { translateX: -CX0 }, { translateY: -CY0 }],
	}))
	const c1Props = useAnimatedProps(() => ({
		opacity: op1.value,
		transform: [{ translateX: CX1 }, { translateY: CY1 }, { scale: s1.value }, { translateX: -CX1 }, { translateY: -CY1 }],
	}))
	const c2Props = useAnimatedProps(() => ({
		opacity: op2.value,
		transform: [{ translateX: CX2 }, { translateY: CY2 }, { scale: s2.value }, { translateX: -CX2 }, { translateY: -CY2 }],
	}))
	const c3Props = useAnimatedProps(() => ({
		opacity: op3.value,
		transform: [{ translateX: CX3 }, { translateY: CY3 }, { scale: s3.value }, { translateX: -CX3 }, { translateY: -CY3 }],
	}))

	const i1 = { cx: CX0, cy: ROW1 + 30 }
	const i2 = { cx: CX1, cy: ROW1 + 30 }
	const i3 = { cx: CX2, cy: ROW2 + 30 }
	const i4 = { cx: CX3, cy: ROW2 + 30 }
	const lY1 = ROW1 + CARD_H - 18, lY2 = ROW2 + CARD_H - 18

	return (
		<Svg width="100%" height="100%" viewBox="0 0 300 260" fill="none">
			<Rect x="15" y="12" width="270" height="236" rx="24" fill={c.surface} />

			<AnimatedG animatedProps={hProps}>
				<Rect x="15" y="12" width="270" height="52" rx="24" fill={c.primary} />
				<Rect x="15" y="40" width="270" height="24" fill={c.primary} />
				<Rect x="36" y="25" width="90" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />
			</AnimatedG>

			{/* Card 0 — Sleep */}
			<AnimatedG animatedProps={c0Props}>
				<Rect x={COL1} y={ROW1} width={CARD_W} height={CARD_H} rx="14" fill={c.background} />
				<Circle cx={i1.cx} cy={i1.cy} r="16" fill={c.primary} fillOpacity="0.2" />
				<Circle cx={i1.cx + 7} cy={i1.cy - 5} r="13" fill={c.background} />
				<Circle cx={i1.cx - 1} cy={i1.cy} r="14" fill={c.primary} fillOpacity="0.7" />
				<Circle cx={i1.cx + 6} cy={i1.cy - 4} r="11" fill={c.background} />
				<Rect x={COL1 + 14} y={lY1} width={CARD_W - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />
			</AnimatedG>

			{/* Card 1 — Mood */}
			<AnimatedG animatedProps={c1Props}>
				<Rect x={COL2} y={ROW1} width={CARD_W} height={CARD_H} rx="14" fill={c.background} />
				<Circle cx={i2.cx} cy={i2.cy} r="16" fill={c.warning} fillOpacity="0.25" />
				<Circle cx={i2.cx} cy={i2.cy} r="14" stroke={c.warning} strokeWidth="2" />
				<Circle cx={i2.cx - 5} cy={i2.cy - 4} r="2.5" fill={c.warning} />
				<Circle cx={i2.cx + 5} cy={i2.cy - 4} r="2.5" fill={c.warning} />
				<Path d={`M ${i2.cx - 6} ${i2.cy + 4} Q ${i2.cx} ${i2.cy + 10} ${i2.cx + 6} ${i2.cy + 4}`} stroke={c.warning} strokeWidth="2.5" strokeLinecap="round" />
				<Rect x={COL2 + 14} y={lY1} width={CARD_W - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />
			</AnimatedG>

			{/* Card 2 — Vitals */}
			<AnimatedG animatedProps={c2Props}>
				<Rect x={COL1} y={ROW2} width={CARD_W} height={CARD_H} rx="14" fill={c.background} />
				<Path
					d={`M ${COL1 + 14} ${i3.cy} L ${i3.cx - 22} ${i3.cy} L ${i3.cx - 14} ${i3.cy - 14} L ${i3.cx - 6} ${i3.cy + 14} L ${i3.cx + 2} ${i3.cy - 8} L ${i3.cx + 10} ${i3.cy} L ${COL1 + CARD_W - 14} ${i3.cy}`}
					stroke={c.error} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
				/>
				<Rect x={COL1 + 14} y={lY2} width={CARD_W - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />
			</AnimatedG>

			{/* Card 3 — Meds */}
			<AnimatedG animatedProps={c3Props}>
				<Rect x={COL2} y={ROW2} width={CARD_W} height={CARD_H} rx="14" fill={c.background} />
				<Rect x={i4.cx - 20} y={i4.cy - 10} width="40" height="20" rx="10" fill={c.success} fillOpacity="0.25" />
				<Rect x={i4.cx - 20} y={i4.cy - 10} width="40" height="20" rx="10" stroke={c.success} strokeWidth="2" />
				<Rect x={i4.cx - 1} y={i4.cy - 10} width="2" height="20" fill={c.success} fillOpacity="0.6" />
				<Rect x={i4.cx - 20} y={i4.cy - 10} width="21" height="20" rx="10" fill={c.success} fillOpacity="0.4" />
				<Rect x={COL2 + 14} y={lY2} width={CARD_W - 28} height="8" rx="4" fill={c.textSecondary} fillOpacity="0.35" />
			</AnimatedG>
		</Svg>
	)
}
