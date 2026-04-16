// components/ui/settings/medical/getStyles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: { surface, border, error, background, textSecondary, onSurface },
		fonts,
		fontSize,
		spacing,
		radius,
	} = theme

	return StyleSheet.create({
		card: {
			backgroundColor: surface,
			borderRadius: radius.lg,
			padding: spacing.lg,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		divider: {
			height: 1,
			backgroundColor: border,
			marginVertical: 20,
		},

		errorText: {
			color: error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center",
			marginVertical: spacing.md,
		},

		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: spacing.md,
		},

		row: {
			flexDirection: "row",
		},

		pickerWrapper: {
			borderWidth: 1,
			overflow: "hidden",
			backgroundColor: background,
			borderColor: border,
			borderRadius: radius.md,
			paddingHorizontal: spacing.sm,
			marginHorizontal: spacing.sm,
			flex: 1,
		},
		textInput: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: onSurface,
			backgroundColor: background,
			borderColor: border,
			borderRadius: radius.md,
			borderWidth: 1,
			minHeight: 120,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm + 2,
		},
	})
}
