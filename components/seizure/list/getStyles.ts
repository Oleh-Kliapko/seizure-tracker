// components/seizure/list/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		// Хедер статистики
		statsCard: {
			backgroundColor: colors.surface,
			borderRadius: radius.lg,
			padding: spacing.lg,
			marginBottom: spacing.md,
			flexDirection: "row",
			justifyContent: "space-between",
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		statItem: {
			alignItems: "center",
		},

		statValue: {
			fontFamily: fonts.bold,
			fontSize: fontSize.xl,
			color: colors.onSurface,
		},

		statLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		statDivider: {
			width: 1,
			backgroundColor: colors.border,
		},

		// Фільтри
		filtersRow: {
			flexDirection: "row",
			marginBottom: spacing.md,
			gap: spacing.sm,
		},

		filterChip: {
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			borderRadius: radius.lg,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.surface,
		},

		filterChipActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary,
		},

		filterChipText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		filterChipTextActive: {
			fontFamily: fonts.medium,
			color: "#fff",
		},

		// Картка приступу
		card: {
			borderRadius: radius.lg,
			padding: spacing.lg,
			marginBottom: spacing.md,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		cardHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
			marginBottom: spacing.sm,
		},

		cardDate: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		cardTime: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		cardType: {
			fontFamily: fonts.bold,
			fontSize: fontSize.lg,
			color: colors.onSurface,
			marginBottom: spacing.sm,
		},

		cardMoodRow: {
			flexDirection: "row",
			gap: spacing.md,
			marginBottom: spacing.sm,
		},

		cardMoodText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		cardTriggersRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: spacing.xs,
			marginTop: spacing.xs,
		},

		cardTriggerChip: {
			paddingHorizontal: spacing.sm,
			paddingVertical: 2,
			borderRadius: radius.sm,
			backgroundColor: colors.background + "80",
		},

		cardTriggerText: {
			fontFamily: fonts.regular,
			fontSize: 11,
			color: colors.textSecondary,
		},

		severityRow: {
			flexDirection: "row",
			gap: 4,
		},

		// Пагінація
		pagination: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			gap: spacing.sm,
			marginTop: spacing.md,
			marginBottom: spacing.xl,
		},

		pageBtn: {
			width: 36,
			height: 36,
			borderRadius: 18,
			justifyContent: "center",
			alignItems: "center",
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.surface,
		},

		pageBtnActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary,
		},

		pageBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		pageBtnTextActive: {
			color: "#fff",
		},

		emptyContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			paddingVertical: 60,
		},

		emptyText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.textSecondary,
		},

		emptySubtext: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: spacing.xs,
		},
	})
}
