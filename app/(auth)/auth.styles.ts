// app/(auth)/auth.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export default function createAuthStyles(theme: AppTheme) {
	return StyleSheet.create({
		scrollContent: {
			flexGrow: 1,
			justifyContent: "center",
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: theme.spacing.xl,
		},

		logoContainer: {
			alignItems: "center",
			marginBottom: theme.spacing.xl,
		},

		formCard: {
			backgroundColor: theme.colors.surface,
			borderRadius: theme.radius.lg,
			padding: theme.spacing.lg,
			marginBottom: theme.spacing.md,
		},

		errorContainer: {
			minHeight: 24,
			marginBottom: theme.spacing.sm,
		},

		errorText: {
			color: theme.colors.error,
			fontFamily: theme.fonts.regular,
			fontSize: theme.fontSize.sm,
			textAlign: "center",
		},
	})
}
