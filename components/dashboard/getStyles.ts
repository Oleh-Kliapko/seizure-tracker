// components/dashboard/getStyles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: { primary, surface, border, onSurface, textSecondary, onPrimary },
		fonts,
		fontSize,
		spacing,
		radius,
	} = theme

	return StyleSheet.create({
		// Empty state
		emptyContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingHorizontal: spacing.xl,
			gap: spacing.lg,
		},
		emptyTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: onSurface,
			textAlign: "center",
		},
		emptySubtitle: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: textSecondary,
			textAlign: "center",
		},
		emptyButton: {
			backgroundColor: primary,
			paddingHorizontal: spacing.xl,
			paddingVertical: spacing.md,
			borderRadius: radius.full,
		},
		emptyButtonText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: onPrimary,
		},

		// Hero
		heroCard: {
			backgroundColor: primary,
			borderRadius: radius.lg,
			paddingHorizontal: 20,
			paddingVertical: 12,
			alignItems: "center",
			marginBottom: 12,
		},
		heroNoSeizures: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: onPrimary,
			opacity: 0.9,
			textAlign: "center",
			paddingVertical: 4,
		},
		heroLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: onPrimary,
			opacity: 0.8,
			marginBottom: spacing.xs,
			textTransform: "uppercase",
			letterSpacing: 1,
		},
		heroToday: {
			fontFamily: fonts.bold,
			fontSize: 38,
			color: onPrimary,
			lineHeight: 46,
		},
		heroDaysRow: {
			flexDirection: "row",
			alignItems: "flex-end",
			justifyContent: "center",
			gap: 6,
		},
		heroDaysCount: {
			fontFamily: fonts.bold,
			fontSize: 56,
			color: onPrimary,
			lineHeight: 64,
		},
		heroDaysWord: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: onPrimary,
			opacity: 0.85,
			marginBottom: 6,
		},
		heroBadge: {
			marginTop: spacing.xs,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.xs,
			backgroundColor: "rgba(255,255,255,0.2)",
			borderRadius: radius.lg,
		},
		heroBadgeText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: onPrimary,
		},

		// Stats
		statsRow: {
			flexDirection: "row",
			gap: spacing.md,
			marginBottom: 12,
		},
		statsCard: {
			flex: 1,
			backgroundColor: surface,
			borderRadius: radius.lg,
			paddingHorizontal: 12,
			paddingVertical: 10,
		},
		statsLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: 2,
		},
		statsCount: {
			fontFamily: fonts.bold,
			fontSize: 24,
			color: onSurface,
			lineHeight: 30,
		},
		statsUnit: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
		},
		statsInnerRow: {
			flexDirection: "row",
			alignItems: "center",
			marginTop: 2,
			gap: 6,
		},
		statsInnerCol: {
			flex: 1,
			alignItems: "center",
		},
		statsInnerDivider: {
			width: 1,
			height: 28,
			backgroundColor: border,
		},
		statsCountSmall: {
			fontFamily: fonts.bold,
			fontSize: fontSize.md,
			color: onSurface,
			lineHeight: 22,
		},
		statsTrend: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			marginTop: 2,
			textAlign: "center" as const,
		},

		// Heatmap
		heatmapCard: {
			backgroundColor: surface,
			borderRadius: radius.lg,
			padding: spacing.md,
			marginBottom: spacing.md,
		},
		heatmapHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: spacing.sm,
		},
		heatmapTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: onSurface,
		},
		heatmapDetailsLink: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: primary,
		},
		heatmapGrid: {
			gap: 4,
		},
		heatmapRow: {
			flexDirection: "row",
			gap: 4,
		},
		heatmapDot: {
			flex: 1,
			height: 20,
			borderRadius: radius.xs,
		},
		heatmapDates: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: spacing.xs,
		},
		heatmapDate: {
			fontFamily: fonts.regular,
			fontSize: 10,
			color: textSecondary,
		},

		// Today / StatusRow / Recent seizures (shared card)
		sectionCard: {
			backgroundColor: surface,
			borderRadius: radius.lg,
			paddingHorizontal: 16,
			marginBottom: 12,
		},
		divider: {
			height: 1,
			backgroundColor: border,
		},
		statusRow: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: spacing.sm,
			gap: spacing.sm,
		},
		statusRowLabel: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: onSurface,
			flex: 1,
		},
		statusRowText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			marginRight: spacing.xs,
		},

		// Recent seizures
		recentSectionLabel: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: textSecondary,
			paddingTop: spacing.sm,
			paddingBottom: spacing.xs,
		},
		seizureRow: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: spacing.xs,
			gap: spacing.sm,
		},
		seizureDate: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: onSurface,
			width: "30%",
		},
		seizureTime: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			width: "25%",
		},
		seizureSeverity: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			flex: 1,
		},
		allSeizuresRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "flex-end",
			paddingVertical: spacing.xs,
			gap: spacing.xs,
		},
		allSeizuresText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: primary,
		},
	})
}
