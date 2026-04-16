// components/ui/Button.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createButtonStyles = (
	theme: AppTheme,
	variant: "primary" | "secondary",
) => {
	const isSecondary = variant === "secondary"

	return StyleSheet.create({
		wrapper: {
			height: 52,
			backgroundColor: isSecondary ? theme.colors.border : theme.colors.primary,
			borderRadius: theme.radius.md,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: theme.spacing.lg,
			borderWidth: isSecondary ? 1 : 0,
			borderColor: isSecondary ? theme.colors.border : undefined,
		},

		content: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
		},

		text: {
			color: isSecondary ? theme.colors.textSecondary : theme.colors.surface,
			fontFamily: theme.fonts.bold,
			fontSize: theme.fontSize.md,
		},

		iconLeft: {
			marginRight: theme.spacing.sm,
		},

		iconRight: {
			marginLeft: theme.spacing.sm,
		},
	})
}
