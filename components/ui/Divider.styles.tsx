// components/ui/Divider.styles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createDividerStyles = (theme: AppTheme) => {
	return StyleSheet.create({
		wrapper: {
			flexDirection: "row",
			alignItems: "center",
			marginVertical: 16,
		},

		label: {
			marginHorizontal: theme.spacing.sm,
			fontFamily: theme.fonts.regular,
			fontSize: theme.fontSize.sm,
			color: theme.colors.textSecondary,
		},

		line: {
			flex: 1,
			height: 1,
			backgroundColor: theme.colors.border,
		},
	})
}
