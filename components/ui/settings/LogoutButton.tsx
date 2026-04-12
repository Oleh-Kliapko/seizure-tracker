import { useAppTheme } from "@/hooks"
import { LogOut } from "lucide-react-native"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

export function LogoutButton({ onPress }: { onPress: () => void }) {
	const { colors, fonts, fontSize, spacing, radius, iconSize } = useAppTheme()

	return (
		<TouchableOpacity
			style={[
				s.btn,
				{
					borderRadius: radius.md,
					padding: spacing.md,
					marginTop: spacing.xl,
					borderColor: colors.error,
				},
			]}
			activeOpacity={0.7}
			onPress={onPress}
		>
			<LogOut size={iconSize.md} color={colors.error} />
			<Text
				style={{
					fontFamily: fonts.medium,
					fontSize: fontSize.lg,
					color: colors.error,
					marginLeft: spacing.sm,
				}}
			>
				Вийти
			</Text>
		</TouchableOpacity>
	)
}

const s = StyleSheet.create({
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
})
