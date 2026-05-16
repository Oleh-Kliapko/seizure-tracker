import { useAppTheme } from "@/hooks"
import { useEffect, useRef } from "react"
import { Animated, DimensionValue, ViewStyle } from "react-native"

type Props = {
	width?: DimensionValue
	height?: number
	borderRadius?: number
	style?: ViewStyle
}

export function SkeletonBox({ width = "100%", height = 16, borderRadius = 8, style }: Props) {
	const { colors } = useAppTheme()
	const opacity = useRef(new Animated.Value(0.4)).current

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
				Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
			]),
		).start()
	}, [opacity])

	return (
		<Animated.View
			style={[
				{ width, height, borderRadius, backgroundColor: colors.border },
				{ opacity },
				style,
			]}
		/>
	)
}
