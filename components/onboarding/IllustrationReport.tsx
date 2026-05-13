// components/onboarding/IllustrationReport.tsx

import React from "react"
import Animated, {
	cancelAnimation,
	Easing,
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
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type Colors = {
	primary: string; surface: string; border: string; error: string
	warning: string; success: string; textSecondary: string; onPrimary: string; background: string
}

const DOC_X = 30, DOC_Y = 18, DOC_W = 220, DOC_H = 210
const BTN_CX = 238, BTN_CY = 218

export function IllustrationReport({ c, active }: { c: Colors; active: boolean }) {
	const docOp = useSharedValue(0), docS = useSharedValue(0.88)
	const r0Op = useSharedValue(0), r1Op = useSharedValue(0), r2Op = useSharedValue(0)
	const r3Op = useSharedValue(0), r4Op = useSharedValue(0)
	const pulseR = useSharedValue(28), pulseOp = useSharedValue(0)
	const btnS = useSharedValue(1)

	useEffect(() => {
		if (active) {
			docOp.value = 0; docS.value = 0.88
			r0Op.value = 0; r1Op.value = 0; r2Op.value = 0
			r3Op.value = 0; r4Op.value = 0
			pulseR.value = 28; pulseOp.value = 0; btnS.value = 1

			docOp.value = withTiming(1, { duration: 400 })
			docS.value = withTiming(1, { duration: 460, easing: Easing.out(Easing.back(1.1)) })

			r0Op.value = withDelay(350, withTiming(1, { duration: 320 }))
			r1Op.value = withDelay(470, withTiming(1, { duration: 320 }))
			r2Op.value = withDelay(590, withTiming(1, { duration: 320 }))
			r3Op.value = withDelay(710, withTiming(1, { duration: 320 }))
			r4Op.value = withDelay(830, withTiming(1, { duration: 320 }))

			pulseR.value = withDelay(950, withRepeat(
				withSequence(
					withTiming(28, { duration: 1 }),
					withTiming(52, { duration: 1100, easing: Easing.out(Easing.quad) }),
				),
				-1, false,
			))
			pulseOp.value = withDelay(950, withRepeat(
				withSequence(
					withTiming(0.55, { duration: 1 }),
					withTiming(0, { duration: 1100 }),
				),
				-1, false,
			))
			btnS.value = withDelay(950, withRepeat(
				withSequence(withTiming(1.08, { duration: 700 }), withTiming(1, { duration: 700 })),
				-1, false,
			))
		} else {
			cancelAnimation(pulseR); cancelAnimation(pulseOp); cancelAnimation(btnS)
		}
	}, [active])

	const docProps = useAnimatedProps(() => ({
		opacity: docOp.value,
		transform: [
			{ translateX: BTN_CX }, { translateY: BTN_CY },
			{ scale: docS.value },
			{ translateX: -BTN_CX }, { translateY: -BTN_CY },
		],
	}))
	const r0Props = useAnimatedProps(() => ({ opacity: r0Op.value }))
	const r1Props = useAnimatedProps(() => ({ opacity: r1Op.value }))
	const r2Props = useAnimatedProps(() => ({ opacity: r2Op.value }))
	const r3Props = useAnimatedProps(() => ({ opacity: r3Op.value }))
	const r4Props = useAnimatedProps(() => ({ opacity: r4Op.value }))
	const pulseProps = useAnimatedProps(() => ({ r: pulseR.value, opacity: pulseOp.value }))
	const btnProps = useAnimatedProps(() => ({
		transform: [
			{ translateX: BTN_CX }, { translateY: BTN_CY },
			{ scale: btnS.value },
			{ translateX: -BTN_CX }, { translateY: -BTN_CY },
		],
	}))

	const miniBarH = [22, 36, 18, 42, 28]
	const miniBarW = 18, miniBarGap = 8
	const miniBase = DOC_Y + DOC_H - 36
	const miniBarsLeft = DOC_X + 20

	return (
		<Svg width="100%" height="100%" viewBox="0 0 300 260" fill="none">
			{/* Shadow */}
			<Rect x={DOC_X + 6} y={DOC_Y + 6} width={DOC_W} height={DOC_H} rx="22" fill={c.textSecondary} fillOpacity="0.12" />

			{/* Document */}
			<AnimatedG animatedProps={docProps}>
				<Rect x={DOC_X} y={DOC_Y} width={DOC_W} height={DOC_H} rx="22" fill={c.surface} />
				<Rect x={DOC_X} y={DOC_Y} width={DOC_W} height="56" rx="22" fill={c.primary} />
				<Rect x={DOC_X} y={DOC_Y + 36} width={DOC_W} height="20" fill={c.primary} />
				<Rect x={DOC_X + 20} y={DOC_Y + 16} width="90" height="11" rx="5.5" fill={c.onPrimary} fillOpacity="0.75" />
				<Rect x={DOC_X + 20} y={DOC_Y + 32} width="60" height="8" rx="4" fill={c.onPrimary} fillOpacity="0.4" />
			</AnimatedG>

			{/* Data rows — each fades in independently */}
			<AnimatedG animatedProps={r0Props}>
				<Rect x={DOC_X + 20} y={DOC_Y + 76} width="48" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x={DOC_X + 80} y={DOC_Y + 76} width="120" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.18" />
			</AnimatedG>
			<AnimatedG animatedProps={r1Props}>
				<Rect x={DOC_X + 20} y={DOC_Y + 96} width="48" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x={DOC_X + 80} y={DOC_Y + 96} width="120" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.18" />
			</AnimatedG>
			<AnimatedG animatedProps={r2Props}>
				<Rect x={DOC_X + 20} y={DOC_Y + 116} width="48" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x={DOC_X + 80} y={DOC_Y + 116} width="120" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.18" />
			</AnimatedG>
			<AnimatedG animatedProps={r3Props}>
				<Rect x={DOC_X + 20} y={DOC_Y + 136} width="48" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x={DOC_X + 80} y={DOC_Y + 136} width="120" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.18" />
			</AnimatedG>
			<AnimatedG animatedProps={r4Props}>
				<Rect x={DOC_X + 20} y={DOC_Y + 156} width="48" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.38" />
				<Rect x={DOC_X + 80} y={DOC_Y + 156} width="120" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.18" />
			</AnimatedG>

			{/* Mini bar chart */}
			{miniBarH.map((h, i) => (
				<Rect
					key={i}
					x={miniBarsLeft + i * (miniBarW + miniBarGap)}
					y={miniBase - h}
					width={miniBarW}
					height={h}
					rx="5"
					fill={c.primary}
					fillOpacity={0.3 + i * 0.12}
				/>
			))}
			<Rect x={miniBarsLeft} y={miniBase} width={5 * miniBarW + 4 * miniBarGap} height="1.5" rx="1" fill={c.border} />

			{/* Pulse ring */}
			<AnimatedCircle cx={BTN_CX} cy={BTN_CY} fill="transparent" stroke={c.primary} strokeWidth="2" animatedProps={pulseProps} />

			{/* Share button */}
			<AnimatedG animatedProps={btnProps}>
				<Circle cx={BTN_CX} cy={BTN_CY} r="28" fill={c.primary} />
				<Path d={`M ${BTN_CX} ${BTN_CY - 8} L ${BTN_CX} ${BTN_CY + 8}`} stroke={c.onPrimary} strokeWidth="2.5" strokeLinecap="round" />
				<Path d={`M ${BTN_CX - 6} ${BTN_CY - 2} L ${BTN_CX} ${BTN_CY - 10} L ${BTN_CX + 6} ${BTN_CY - 2}`} stroke={c.onPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
				<Path d={`M ${BTN_CX - 7} ${BTN_CY + 4} L ${BTN_CX - 7} ${BTN_CY + 10} L ${BTN_CX + 7} ${BTN_CY + 10} L ${BTN_CX + 7} ${BTN_CY + 4}`} stroke={c.onPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			</AnimatedG>
		</Svg>
	)
}
