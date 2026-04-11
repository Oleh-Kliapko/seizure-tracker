// components/ui/GoogleButton.tsx

import { useAppTheme } from "@/hooks"
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from "react-native"
import { SvgXml } from "react-native-svg"
import { GOOGLE_ICON } from "./svg"

type Props = TouchableOpacityProps & {
	title?: string
}

export function GoogleButton({
	title = "Продовжити з Google",
	style,
	...props
}: Props) {
	const { colors, fonts, radius, spacing, fontSize } = useAppTheme()

	return (
		<TouchableOpacity
			style={[
				s.btn,
				{
					borderColor: colors.border,
					borderRadius: radius.md,
					paddingVertical: spacing.md,
					backgroundColor: colors.surface,
				},
				style,
			]}
			activeOpacity={0.85}
			{...props}
		>
			<View style={s.content}>
				<SvgXml xml={GOOGLE_ICON} width={20} height={20} />
				<Text
					style={[
						s.text,
						{
							fontFamily: fonts.medium,
							fontSize: fontSize.md,
							color: colors.onSurface,
							marginLeft: spacing.sm,
						},
					]}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const s = StyleSheet.create({
	btn: {
		borderWidth: 1,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {},
})
