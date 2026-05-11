// components/ui/FormInput.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createFormInputStyles = (theme: AppTheme) => {
	return StyleSheet.create({
		container: {
			marginBottom: theme.spacing.sm,
		},

		label: {
			marginBottom: theme.spacing.xs,
			fontFamily: theme.fonts.medium,
			fontSize: theme.fontSize.sm,
			color: theme.colors.textSecondary,
		},

		inputWrapper: {
			flexDirection: "row",
			alignItems: "center",
			borderWidth: 1,
			backgroundColor: theme.colors.background,
			borderColor: theme.colors.border,
			borderRadius: theme.radius.md,
		},

		input: {
			flex: 1,
			fontFamily: theme.fonts.regular,
			fontSize: theme.fontSize.md,
			color: theme.colors.onSurface,
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.sm + 2,
		},

		eyeBtn: {
			justifyContent: "center",
			paddingHorizontal: theme.spacing.sm,
		},
	})
}
