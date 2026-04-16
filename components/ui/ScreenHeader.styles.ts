// components/ui/ScreenHeader.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createScreenHeaderStyles = (theme: AppTheme) => {
	return StyleSheet.create({
		container: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
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
	})
}
