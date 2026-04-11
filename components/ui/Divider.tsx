import { useAppTheme } from "@/hooks"
import { StyleSheet, Text, View } from "react-native"

type Props = {
	label?: string
}

export function Divider({ label = "або" }: Props) {
	const { colors, fonts, fontSize } = useAppTheme()

	return (
		<View style={s.container}>
			<View style={[s.line, { backgroundColor: colors.border }]} />
			<Text
				style={[
					s.label,
					{
						fontFamily: fonts.regular,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
					},
				]}
			>
				{label}
			</Text>
			<View style={[s.line, { backgroundColor: colors.border }]} />
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 16,
	},
	line: {
		flex: 1,
		height: 1,
	},
	label: {
		marginHorizontal: 12,
	},
})
