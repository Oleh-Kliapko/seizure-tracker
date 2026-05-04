// components/ui/TimePickerModal.styles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const ITEM_H = 52

export const createTimePickerModalStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		overlay: {
			flex: 1,
			backgroundColor: "rgba(0,0,0,0.45)",
		},

		sheet: {
			backgroundColor: colors.surface,
			borderTopLeftRadius: radius.lg,
			borderTopRightRadius: radius.lg,
			paddingHorizontal: spacing.lg,
			paddingTop: spacing.lg,
		},

		preview: {
			fontFamily: fonts.bold,
			fontSize: 40,
			color: colors.onSurface,
			textAlign: "center",
			letterSpacing: 2,
			marginBottom: spacing.lg,
		},

		columnsRow: {
			flexDirection: "row",
			gap: spacing.md,
		},

		column: {
			flex: 1,
		},

		columnLabel: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			textAlign: "center",
			marginBottom: spacing.sm,
			textTransform: "uppercase",
			letterSpacing: 0.5,
		},

		hourList: {
			height: ITEM_H * 5,
		},

		pickerItem: {
			height: ITEM_H,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: radius.sm,
		},

		pickerItemActive: {
			backgroundColor: colors.primary,
		},

		pickerItemText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.xl,
			color: colors.onSurface,
		},

		pickerItemTextActive: {
			fontFamily: fonts.bold,
			color: "#fff",
		},

		separator: {
			fontFamily: fonts.bold,
			fontSize: 32,
			color: colors.textSecondary,
			alignSelf: "center",
			marginTop: spacing.xl,
		},

		btnRow: {
			flexDirection: "row",
			gap: spacing.md,
			marginTop: spacing.xl,
		},

		cancelBtn: {
			flex: 1,
			borderWidth: 1,
			borderColor: colors.border,
			borderRadius: radius.md,
			paddingVertical: spacing.md,
			alignItems: "center",
		},

		cancelBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		confirmBtn: {
			flex: 1,
			backgroundColor: colors.primary,
			borderRadius: radius.md,
			paddingVertical: spacing.md,
			alignItems: "center",
		},

		confirmBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: "#fff",
		},
	})
}
