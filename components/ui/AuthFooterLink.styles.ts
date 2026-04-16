// components/ui/AuthFooterLink.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createAuthFooterLinkStyles = (theme: AppTheme) => {
	return StyleSheet.create({
		wrapper: {
			flexDirection: "row",
			justifyContent: "center",
			marginTop: theme.spacing.lg,
		},

		question: {
			fontFamily: theme.fonts.regular,
			fontSize: theme.fontSize.sm,
			color: theme.colors.textSecondary,
		},

		linkText: {
			fontFamily: theme.fonts.medium,
			fontSize: theme.fontSize.sm,
			color: theme.colors.primary,
			marginLeft: theme.spacing.xs,
		},
	})
}
