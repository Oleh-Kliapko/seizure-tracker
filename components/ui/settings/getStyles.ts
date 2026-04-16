// components/ui/settings/medical/getStyles.ts
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const {
		colors: {
			surface,
			border,
			error,
			background,
			textSecondary,
			onSurface,
			primary,
		},
		fonts,
		fontSize,
		spacing,
		radius,
	} = theme

	return StyleSheet.create({
		card: {
			backgroundColor: surface,
			borderRadius: radius.md,
			padding: spacing.md,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		content: {
			flexDirection: "row",
			alignItems: "center",
			gap: 14,
		},

		errorText: {
			color: error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center",
			marginVertical: spacing.md,
		},

		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: spacing.md,
		},

		row: {
			flexDirection: "row",
		},

		pickerWrapper: {
			borderWidth: 1,
			overflow: "hidden",
			backgroundColor: background,
			borderColor: border,
			borderRadius: radius.md,
			paddingHorizontal: spacing.sm,
			marginHorizontal: spacing.sm,
			flex: 1,
		},

		textInput: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: onSurface,
			backgroundColor: background,
			borderColor: border,
			borderRadius: radius.md,
			borderWidth: 1,
			minHeight: 120,
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm + 2,
		},

		btnError: {
			borderRadius: radius.md,
			padding: spacing.md,
			marginTop: spacing.xl,
			borderColor: error,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
		},

		btnErrorText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: error,
			marginLeft: spacing.sm,
		},

		avatarContainer: {
			alignItems: "center",
			marginBottom: 64,
		},

		avatarWrapper: {
			position: "relative",
		},

		avatarIcon: {
			width: 100,
			height: 100,
			borderRadius: 60,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: primary,
		},

		avatarTextFirstLetter: {
			fontFamily: fonts.bold,
			fontSize: 42,
			color: "#fff",
		},

		avatarBtn: {
			position: "absolute",
			bottom: 0,
			right: 0,
			width: 28,
			height: 28,
			borderRadius: 14,
			borderWidth: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: surface,
			borderColor: border,
		},

		avatarDisplayname: {
			fontFamily: fonts.bold,
			fontSize: fontSize.lg,
			color: onSurface,
			marginTop: spacing.md,
		},

		avatarTextEmail: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: textSecondary,
			marginTop: spacing.xs,
		},

		iconMenu: {
			width: 46,
			height: 46,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: background,
			borderRadius: radius.sm,
		},

		titleMenu: {
			fontFamily: fonts.medium,
			fontSize: fontSize.lg,
			color: onSurface,
		},

		subtitleMenu: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginTop: 4,
		},
	})
}
