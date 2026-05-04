// components/history/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: { surface, border, error, background, textSecondary, onSurface, primary },
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
			color: "#fff",
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

		// Email modal
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
			gap: spacing.md,
		},

		// Calendar
		calendarContainer: {
			gap: spacing.sm,
		},
		monthCard: {
			borderWidth: 1,
			borderColor: border,
			borderRadius: radius.md,
			padding: spacing.sm,
		},
		monthTitle: {
			fontFamily: fonts.medium,
			fontSize: 12,
			color: textSecondary,
			marginBottom: spacing.sm,
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},
		dayNamesRow: {
			flexDirection: "row",
			marginBottom: 4,
		},
		dayNameCell: {
			flex: 1,
			alignItems: "center",
		},
		dayNameText: {
			fontFamily: fonts.regular,
			fontSize: 11,
			color: textSecondary,
		},
		daysGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
		},
		dayCellOuter: {
			width: `${100 / 7}%` as any,
			height: 34,
			alignItems: "center",
			justifyContent: "center",
		},
		dayCellInner: {
			width: 30,
			height: 30,
			borderRadius: 15,
			alignItems: "center",
			justifyContent: "center",
		},
		dayNumber: {
			fontSize: 13,
		},
		seizureBadge: {
			position: "absolute",
			top: 0,
			right: 2,
			width: 13,
			height: 13,
			borderRadius: 7,
			alignItems: "center",
			justifyContent: "center",
		},
		seizureBadgeText: {
			fontSize: 8,
			color: "#fff",
			fontFamily: fonts.bold,
		},

		// Shared empty state
		emptyState: {
			alignItems: "center" as const,
			paddingVertical: spacing.lg,
		},
		emptyStateText: {
			fontFamily: fonts.regular,
			fontSize: 14,
			color: textSecondary,
		},

		// Period filter
		periodFilterRow: {
			flexDirection: "row",
			gap: spacing.sm,
			marginBottom: spacing.md,
		},
		periodBtn: {
			flex: 1,
			paddingVertical: spacing.xs + 2,
			borderRadius: radius.md,
			alignItems: "center" as const,
		},
		periodBtnText: {
			fontFamily: fonts.medium,
			fontSize: 12,
		},

		// Trigger bars
		triggerList: {
			gap: spacing.sm,
		},
		triggerLabelRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginBottom: 4,
		},
		triggerLabel: {
			fontFamily: fonts.regular,
			fontSize: 14,
			color: onSurface,
		},
		triggerCount: {
			fontFamily: fonts.medium,
			fontSize: 14,
			color: primary,
		},
		triggerBarBg: {
			height: 6,
			backgroundColor: border,
			borderRadius: radius.sm,
			overflow: "hidden" as const,
		},
		triggerBarFill: {
			height: 6,
			borderRadius: radius.sm,
		},

		// Donut chart
		donutContainer: {
			alignItems: "center" as const,
		},
		donutCenterOverlay: {
			position: "absolute" as const,
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			alignItems: "center" as const,
			justifyContent: "center" as const,
		},
		donutTotal: {
			fontFamily: fonts.bold,
			fontSize: 26,
			color: onSurface,
		},
		donutTotalLabel: {
			fontFamily: fonts.regular,
			fontSize: 11,
			color: textSecondary,
		},
		donutLegend: {
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "center",
			gap: 10,
			marginTop: spacing.md,
		},
		donutLegendItem: {
			flexDirection: "row",
			alignItems: "center",
			gap: 6,
		},
		donutLegendDot: {
			width: 10,
			height: 10,
			borderRadius: 5,
		},
		donutLegendText: {
			fontFamily: fonts.regular,
			fontSize: 13,
			color: onSurface,
		},
	})
}
