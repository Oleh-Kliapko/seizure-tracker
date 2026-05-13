// components/seizure/datetime/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		dateTimeValue: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.primary,
			marginTop: 4,
		},

		doneBtn: {
			marginTop: spacing.sm,
			borderRadius: radius.md,
			paddingVertical: spacing.sm,
			alignItems: "center",
			backgroundColor: colors.primary,
		},

		doneBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onPrimary,
		},

		switchRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: spacing.sm,
		},
	})
}
