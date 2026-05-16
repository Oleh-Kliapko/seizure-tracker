// components/ui/Button.tsx
import { useAppTheme } from "@/hooks"
import * as Haptics from "expo-haptics"
import {
	GestureResponderEvent,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native"
import { createButtonStyles } from "./Button.styles"

type Props = TouchableOpacityProps & {
	title: string
	icon?: React.ReactNode
	iconPosition?: "left" | "right"
	variant?: "primary" | "secondary"
}

export function Button({
	title,
	icon,
	iconPosition = "left",
	variant = "primary",
	style,
	onPress,
	...props
}: Props) {
	const theme = useAppTheme()
	const styles = createButtonStyles(theme, variant)

	function handlePress(e: GestureResponderEvent) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		onPress?.(e)
	}

	return (
		<TouchableOpacity
			style={[styles.wrapper, style, props.disabled && { opacity: 0.45 }]}
			activeOpacity={0.85}
			onPress={props.disabled ? undefined : handlePress}
			{...props}
		>
			<View style={styles.content}>
				{icon && iconPosition === "left" && (
					<View style={styles.iconLeft}>{icon}</View>
				)}

				<Text style={styles.text}>{title}</Text>

				{icon && iconPosition === "right" && (
					<View style={styles.iconRight}>{icon}</View>
				)}
			</View>
		</TouchableOpacity>
	)
}
