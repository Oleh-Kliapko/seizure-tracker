// components/tracking/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		section: {
			backgroundColor: colors.surface,
			borderRadius: radius.lg,
			padding: spacing.lg,
			marginBottom: spacing.md,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		sectionTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginBottom: spacing.md,
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},

		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		sublabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		divider: {
			height: 1,
			backgroundColor: colors.border,
			marginVertical: spacing.md,
		},

		row: {
			flexDirection: "row" as const,
			alignItems: "center" as const,
			justifyContent: "space-between" as const,
		},

		// Vitals grid
		vitalsGrid: {
			flexDirection: "row" as const,
			flexWrap: "wrap" as const,
			gap: spacing.sm,
		},

		vitalItem: {
			flex: 1,
			minWidth: "45%",
		},

		vitalLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginBottom: 4,
		},

		vitalInput: {
			backgroundColor: colors.background,
			borderRadius: radius.md,
			borderWidth: 1,
			borderColor: colors.border,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		// Scale buttons (1-5)
		scaleRow: {
			flexDirection: "row" as const,
			justifyContent: "space-between" as const,
			marginTop: spacing.sm,
		},

		scaleBtn: {
			width: 44,
			height: 44,
			borderRadius: 22,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.background,
			justifyContent: "center" as const,
			alignItems: "center" as const,
		},

		scaleBtnActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary,
		},

		scaleBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.textSecondary,
		},

		scaleBtnTextActive: {
			color: "#fff",
		},

		// Stepper (count)
		stepperRow: {
			flexDirection: "row" as const,
			alignItems: "center" as const,
			gap: spacing.md,
			marginTop: spacing.sm,
		},

		stepperBtn: {
			width: 36,
			height: 36,
			borderRadius: 18,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.background,
			justifyContent: "center" as const,
			alignItems: "center" as const,
		},

		stepperBtnText: {
			fontFamily: fonts.medium,
			fontSize: 20,
			color: colors.onSurface,
			lineHeight: 24,
		},

		stepperValue: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: colors.onSurface,
			minWidth: 32,
			textAlign: "center" as const,
		},

		// Medications
		medRow: {
			flexDirection: "row" as const,
			alignItems: "center" as const,
			justifyContent: "space-between" as const,
			paddingVertical: spacing.sm,
		},

		medName: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		medDose: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		// Triggers
		triggerChip: {
			flexDirection: "row" as const,
			alignItems: "center" as const,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			borderRadius: radius.lg,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.background,
			marginRight: spacing.sm,
			marginBottom: spacing.sm,
		},

		triggerChipActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary + "15",
		},

		triggerChipText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		triggerChipTextActive: {
			fontFamily: fonts.medium,
			color: colors.primary,
		},

		triggerRow: {
			flexDirection: "row" as const,
			flexWrap: "wrap" as const,
		},

		// Notes
		notesInput: {
			backgroundColor: colors.background,
			borderRadius: radius.md,
			borderWidth: 1,
			borderColor: colors.border,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: colors.onSurface,
			minHeight: 100,
			textAlignVertical: "top" as const,
		},

		emptyText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			textAlign: "center" as const,
			paddingVertical: spacing.sm,
		},
	})
}
