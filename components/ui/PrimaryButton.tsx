import { useAppTheme } from "@/hooks"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type Props = TouchableOpacityProps & {
	title: string
}

export function PrimaryButton({ title, style, ...props }: Props) {
	const { colors, fonts, radius, spacing, fontSize } = useAppTheme()

	return (
		<TouchableOpacity
			style={[
				{
					alignItems: "center",
					height: 52,
					backgroundColor: colors.primary,
					borderRadius: radius.md,
					paddingVertical: spacing.md,
				},
				style,
			]}
			activeOpacity={0.85}
			{...props}
		>
			<Text
				style={{ color: "#fff", fontFamily: fonts.bold, fontSize: fontSize.md }}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
