// components/ui/Button.tsx
import { useAppTheme } from "@/hooks"
import {
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
	...props
}: Props) {
	const theme = useAppTheme()
	const styles = createButtonStyles(theme, variant)

	return (
		<TouchableOpacity
			style={[styles.wrapper, style, props.disabled && { opacity: 0.45 }]}
			activeOpacity={0.85}
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
