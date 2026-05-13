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
			color: "rgba(255, 255, 255, 0.75)",
		},

		cardTime: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: "rgba(255, 255, 255, 0.55)",
			marginTop: 2,
		},

		severityRow: {
			flexDirection: "row",
			gap: 2,
			alignItems: "center",
		},

		// Video upload
		videoErrorText: {
			fontSize: fontSize.xs,
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
			fontSize: fontSize.xs,
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
