// components/onboarding/IllustrationPatterns.tsx

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
import Svg, { G, Rect } from "react-native-svg"
import { useEffect } from "react"

const AnimatedRect = Animated.createAnimatedComponent(Rect)
const AnimatedG = Animated.createAnimatedComponent(G)

type Colors = {
	primary: string; surface: string; border: string; error: string
	warning: string; success: string; textSecondary: string; onPrimary: string; background: string
}

const FULL_H = [28, 54, 16, 74, 38, 58]
const BAR_OPACITIES = [0.35, 0.55, 0.28, 0.85, 0.65, 0.72]
const BAR_W = 28, BAR_GAP = 18
const BAR_LEFT = (300 - (6 * BAR_W + 5 * BAR_GAP)) / 2
const BASE_Y = 152
const EASE = Easing.out(Easing.back(1.2))

const GRID = [
	[0, 1, 0, 0, 2, 0, 1],
	[0, 0, 1, 0, 0, 3, 0],
	[1, 0, 0, 2, 0, 0, 0],
	[0, 0, 1, 0, 0, 1, 0],
]
const DOT = 16, DOT_GAP = 6
const GRID_LEFT = (300 - (7 * DOT + 6 * DOT_GAP)) / 2

export function IllustrationPatterns({ c, active }: { c: Colors; active: boolean }) {
	const b0 = useSharedValue(0), b1 = useSharedValue(0), b2 = useSharedValue(0)
	const b3 = useSharedValue(0), b4 = useSharedValue(0), b5 = useSharedValue(0)
	const gOp = useSharedValue(0)

	// each bar: entrance → breathe loop (chained in one withSequence)
	const startBar = (sv: SharedValue<number>, fullH: number, delay: number) => {
		const delta = fullH * 0.12
		sv.value = withDelay(delay, withSequence(
			withTiming(fullH, { duration: 500, easing: EASE }),
			withRepeat(
				withSequence(
					withTiming(fullH + delta, { duration: 950 }),
					withTiming(fullH - delta * 0.5, { duration: 950 }),
					withTiming(fullH, { duration: 500 }),
				),
				-1, false,
			),
		))
	}

	useEffect(() => {
		if (active) {
			b0.value = 0; b1.value = 0; b2.value = 0
			b3.value = 0; b4.value = 0; b5.value = 0
			gOp.value = 0

			startBar(b0, FULL_H[0], 0)
			startBar(b1, FULL_H[1], 110)
			startBar(b2, FULL_H[2], 220)
			startBar(b3, FULL_H[3], 330)
			startBar(b4, FULL_H[4], 440)
			startBar(b5, FULL_H[5], 550)
			gOp.value = withDelay(750, withTiming(1, { duration: 400 }))
		} else {
			cancelAnimation(b0); cancelAnimation(b1); cancelAnimation(b2)
			cancelAnimation(b3); cancelAnimation(b4); cancelAnimation(b5)
			cancelAnimation(gOp)
		}
	}, [active])

	// Each bar needs its own useAnimatedProps — no hooks in map
	const b0P = useAnimatedProps(() => ({ height: Math.max(b0.value, 0), y: BASE_Y - Math.max(b0.value, 0) }))
	const b1P = useAnimatedProps(() => ({ height: Math.max(b1.value, 0), y: BASE_Y - Math.max(b1.value, 0) }))
	const b2P = useAnimatedProps(() => ({ height: Math.max(b2.value, 0), y: BASE_Y - Math.max(b2.value, 0) }))
	const b3P = useAnimatedProps(() => ({ height: Math.max(b3.value, 0), y: BASE_Y - Math.max(b3.value, 0) }))
	const b4P = useAnimatedProps(() => ({ height: Math.max(b4.value, 0), y: BASE_Y - Math.max(b4.value, 0) }))
	const b5P = useAnimatedProps(() => ({ height: Math.max(b5.value, 0), y: BASE_Y - Math.max(b5.value, 0) }))
	const bProps = [b0P, b1P, b2P, b3P, b4P, b5P]

	const gridProps = useAnimatedProps(() => ({ opacity: gOp.value }))

	const dotColor = (v: number) => {
		if (v === 1) return c.primary
		if (v === 2) return c.warning
		if (v === 3) return c.error
		return c.border
	}

	return (
		<Svg width="100%" height="100%" viewBox="0 0 300 260" fill="none">
			<Rect x="15" y="12" width="270" height="236" rx="24" fill={c.surface} />
			<Rect x="15" y="12" width="270" height="52" rx="24" fill={c.primary} />
			<Rect x="15" y="40" width="270" height="24" fill={c.primary} />
			<Rect x="36" y="25" width="90" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.65" />
			<Rect x="186" y="25" width="70" height="10" rx="5" fill={c.onPrimary} fillOpacity="0.3" />
			<Rect x="36" y="74" width="60" height="8" rx="4" fill={c.textSecondary} fillOpacity="0.32" />

			<AnimatedRect x={BAR_LEFT + 0 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[0]} animatedProps={bProps[0]} />
			<AnimatedRect x={BAR_LEFT + 1 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[1]} animatedProps={bProps[1]} />
			<AnimatedRect x={BAR_LEFT + 2 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[2]} animatedProps={bProps[2]} />
			<AnimatedRect x={BAR_LEFT + 3 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[3]} animatedProps={bProps[3]} />
			<AnimatedRect x={BAR_LEFT + 4 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[4]} animatedProps={bProps[4]} />
			<AnimatedRect x={BAR_LEFT + 5 * (BAR_W + BAR_GAP)} width={BAR_W} rx="7" fill={c.primary} fillOpacity={BAR_OPACITIES[5]} animatedProps={bProps[5]} />

			<Rect x="36" y={BASE_Y} width="228" height="1.5" rx="1" fill={c.border} />

			{/* Grid fades in as one group */}
			<AnimatedG animatedProps={gridProps}>
				<Rect x={GRID_LEFT} y="162" width="55" height="7" rx="3" fill={c.textSecondary} fillOpacity="0.3" />
				{GRID.map((row, ri) =>
					row.map((val, ci) => (
						<Rect
							key={`${ri}-${ci}`}
							x={GRID_LEFT + ci * (DOT + DOT_GAP)}
							y={172 + ri * (DOT + DOT_GAP)}
							width={DOT}
							height={DOT}
							rx="4"
							fill={dotColor(val)}
							fillOpacity={val === 0 ? 1 : 0.75}
						/>
					))
				)}
			</AnimatedG>
		</Svg>
	)
}
