// components/seizure/list/cards/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing } = theme

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
	})
}
