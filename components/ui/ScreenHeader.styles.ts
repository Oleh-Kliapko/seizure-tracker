// components/ui/ScreenHeader.styles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createScreenHeaderStyles = (theme: AppTheme, insets: any) => {
	return StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: theme.spacing.md,
			paddingTop: insets.top + theme.spacing.sm,
		},

		backBtn: {
			width: 40,
			height: 40,
			justifyContent: "center",
			alignItems: "center",
		},

		title: {
			fontFamily: theme.fonts.bold,
			fontSize: theme.fontSize.lg,
			color: theme.colors.onSurface,
		},

		placeholder: {
			width: 40,
		},

		right: {
			width: 40,
			alignItems: "flex-end",
			justifyContent: "center",
		},
	})
}
