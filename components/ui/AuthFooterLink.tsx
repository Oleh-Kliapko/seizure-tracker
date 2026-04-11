import { useAppTheme } from "@/hooks"
import { Link } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
	question: string
	linkText: string
	href: string
}

export function AuthFooterLink({ question, linkText, href }: Props) {
	const { colors, fonts, fontSize, spacing } = useAppTheme()

	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "center",
				marginTop: 24,
			}}
		>
			<Text
				style={{
					fontFamily: fonts.regular,
					fontSize: fontSize.sm,
					color: colors.textSecondary,
				}}
			>
				{question}
			</Text>
			<Link href={href as any} asChild>
				<TouchableOpacity>
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.sm,
							color: colors.primary,
							marginLeft: spacing.xs,
						}}
					>
						{linkText}
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	)
}
