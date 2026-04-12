import { useAppTheme } from "@/hooks"
import { Link } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type Props = {
	href: string
	icon: React.ReactNode
	title: string
	subtitle?: string
}

export function ProfileLink({ href, icon, title, subtitle }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	return (
		<Link href={href as any} asChild>
			<TouchableOpacity
				style={[
					s.card,
					{
						backgroundColor: colors.surface,
						borderRadius: radius.md,
						padding: spacing.lg,
					},
				]}
				activeOpacity={0.7}
			>
				<View style={s.content}>
					<View
						style={[
							s.iconBox,
							{
								backgroundColor: colors.background,
								borderRadius: radius.sm,
							},
						]}
					>
						{icon}
					</View>
					<View style={s.text}>
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.lg,
								color: colors.onSurface,
							}}
						>
							{title}
						</Text>
						{subtitle && (
							<Text
								style={{
									fontFamily: fonts.regular,
									fontSize: fontSize.sm,
									color: colors.textSecondary,
									marginTop: 4,
								}}
							>
								{subtitle}
							</Text>
						)}
					</View>
					<Text style={{ color: colors.textSecondary, fontSize: 24 }}>›</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
}

const s = StyleSheet.create({
	card: {
		shadowColor: "#000",
		shadowOpacity: 0.04,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
	},
	iconBox: {
		width: 46,
		height: 46,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		flex: 1,
	},
})
