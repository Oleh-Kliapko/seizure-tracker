// components/history/SectionCard.tsx

import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"

type Props = {
	title: string
	children: React.ReactNode
}

export function SectionCard({ title, children }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	return (
		<View
			style={{
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				padding: spacing.md,
				marginBottom: spacing.md,
			}}
		>
			<Text
				style={{
					fontFamily: fonts.medium,
					fontSize: fontSize.xs,
					color: colors.textSecondary,
					textTransform: "uppercase",
					letterSpacing: 0.5,
					marginBottom: spacing.md,
				}}
			>
				{title}
			</Text>
			{children}
		</View>
	)
}
