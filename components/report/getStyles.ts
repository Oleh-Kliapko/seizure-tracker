// components/report/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: {
			surface,
			border,
			error,
			background,
			textSecondary,
			onSurface,
			primary,
			onPrimary,
		},
		fonts,
		fontSize,
		spacing,
		radius,
	} = theme

	return StyleSheet.create({
		card: {
			backgroundColor: surface,
			borderRadius: radius.lg,
			paddingVertical: spacing.md,
			paddingHorizontal: spacing.lg,
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
		rulesList: {
			marginTop: 4,
			marginBottom: spacing.md,
			gap: 2,
		},
		subtitle: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
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
			color: onPrimary,
		},
		errorContainer: {
			minHeight: 24,
			justifyContent: "center" as const,
			marginBottom: spacing.sm,
		},
		errorText: {
			color: error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center" as const,
			flexShrink: 1,
		},
		buttonsContainer: {
			gap: spacing.md,
		},
		emailCooldownText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			textAlign: "center" as const,
			marginTop: 4,
		},
		modalOverlay: {
			flex: 1,
			backgroundColor: "rgba(0,0,0,0.5)",
			justifyContent: "center",
			alignItems: "center",
			padding: spacing.xl,
		},
		modalCard: {
			backgroundColor: background,
			borderRadius: radius.md,
			padding: spacing.xl,
			width: "100%",
			maxWidth: 400,
			gap: spacing.md,
		},
		modalTitle: {
			fontFamily: fonts.bold,
			fontSize: fontSize.lg,
			color: onSurface,
		},
		modalDescription: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			lineHeight: 18,
		},
		modalInput: {
			borderWidth: 1,
			borderColor: border,
			borderRadius: radius.sm,
			padding: spacing.md,
			fontSize: fontSize.md,
			color: onSurface,
			backgroundColor: surface,
		},
		modalButtonRow: {
			flexDirection: "row",
			gap: spacing.sm,
		},
	})
}
