// components/seizure/list/cards/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
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

		severityRow: {
			flexDirection: "row",
			gap: 4,
		},

		// Video upload
		videoErrorText: {
			fontSize: 12,
			color: colors.error,
		},

		videoActionBtn: {
			flexDirection: "row",
			alignItems: "center",
			gap: 6,
			paddingHorizontal: 10,
			paddingVertical: 6,
			borderRadius: radius.sm,
			alignSelf: "flex-start" as const,
		},

		videoActionBtnText: {
			fontSize: 12,
		},

		videoActionRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
		},

		videoErrorInline: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			gap: 4,
		},
	})
}
