// components/dashboard/getStyles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: { primary, surface, border, onSurface, textSecondary },
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
			borderRadius: 999,
		},
		emptyButtonText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: "#fff",
		},

		// Hero
		heroCard: {
			backgroundColor: primary,
			borderRadius: radius.lg,
			paddingHorizontal: spacing.lg,
			paddingVertical: spacing.md,
			alignItems: "center",
			marginBottom: spacing.md,
		},
		heroNoSeizures: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: "#fff",
			opacity: 0.9,
			textAlign: "center",
			paddingVertical: spacing.sm,
		},
		heroLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: "#fff",
			opacity: 0.8,
			marginBottom: spacing.xs,
			textTransform: "uppercase",
			letterSpacing: 1,
		},
		heroToday: {
			fontFamily: fonts.bold,
			fontSize: 42,
			color: "#fff",
			lineHeight: 50,
		},
		heroDaysRow: {
			flexDirection: "row",
			alignItems: "flex-end",
			justifyContent: "center",
			gap: 6,
		},
		heroDaysCount: {
			fontFamily: fonts.bold,
			fontSize: 64,
			color: "#fff",
			lineHeight: 72,
		},
		heroDaysWord: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: "#fff",
			opacity: 0.85,
			marginBottom: 7,
		},
		heroBadge: {
			marginTop: spacing.sm,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.xs,
			backgroundColor: "rgba(255,255,255,0.2)",
			borderRadius: radius.lg,
		},
		heroBadgeText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: "#fff",
		},

		// Stats
		statsRow: {
			flexDirection: "row",
			gap: spacing.md,
			marginBottom: spacing.md,
		},
		statsCard: {
			flex: 1,
			backgroundColor: surface,
			borderRadius: radius.lg,
			padding: spacing.md,
		},
		statsLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: spacing.xs,
		},
		statsCount: {
			fontFamily: fonts.bold,
			fontSize: 28,
			color: onSurface,
			lineHeight: 34,
		},
		statsUnit: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
		},
		statsTrend: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			marginTop: spacing.xs,
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
			borderRadius: 4,
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
			width: 60,
		},
		seizureTime: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			width: 42,
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
