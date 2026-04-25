// components/history/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: { surface, border, error, background, textSecondary, primary },
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
		title: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: textSecondary,
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},
		subtitle: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginTop: 2,
			marginBottom: spacing.md,
		},
		row: {
			flexDirection: "row",
			gap: spacing.md,
			marginBottom: spacing.md,
		},
		dateBtn: {
			flex: 1,
			backgroundColor: background,
			borderWidth: 1,
			borderColor: border,
			borderRadius: radius.md,
			padding: spacing.md,
		},
		dateBtnLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: 2,
		},
		dateBtnValue: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: primary,
		},
		doneBtn: {
			marginTop: spacing.sm,
			borderRadius: radius.md,
			paddingVertical: spacing.sm,
			alignItems: "center" as const,
			backgroundColor: primary,
		},
		doneBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: "#fff",
		},
		errorContainer: {
			height: 24,
			justifyContent: "center" as const,
			marginBottom: spacing.sm,
		},
		errorText: {
			color: error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center" as const,
		},
	})
}
