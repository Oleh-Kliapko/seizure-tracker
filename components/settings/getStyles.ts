// components/settings/getStyles.ts
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
			onPrimary,
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
			padding: 12,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		content: {
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
		},

		errorContainer: {
			height: 40,
			justifyContent: "center",
			marginBottom: spacing.sm,
		},

		errorText: {
			color: error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center",
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
			marginBottom: 32,
		},

		avatarWrapper: {
			position: "relative",
		},

		avatarIcon: {
			width: 100,
			height: 100,
			borderRadius: radius.full,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: primary,
		},

		avatarTextFirstLetter: {
			fontFamily: fonts.bold,
			fontSize: 42,
			color: onPrimary,
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
			width: 38,
			height: 38,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: background,
			borderRadius: radius.sm,
		},

		titleMenu: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: onSurface,
		},

		subtitleMenu: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginTop: 4,
		},

		guardianCard: {
			backgroundColor: background,
			borderRadius: radius.md,
			padding: spacing.md,
			marginBottom: spacing.md,
			borderWidth: 1,
			borderColor: border,
		},

		guardianHeader: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: spacing.md,
		},

		guardianTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: onSurface,
		},

		relationsRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: spacing.sm,
			marginBottom: spacing.lg,
		},

		relationBtn: {
			flexDirection: "row",
			alignItems: "center",
			gap: spacing.xs,
		},

		relationBtnActive: {},

		radioCircle: {
			width: 20,
			height: 20,
			borderRadius: 10,
			borderWidth: 2,
			borderColor: border,
			justifyContent: "center",
			alignItems: "center",
		},

		radioCircleActive: {
			borderColor: primary,
		},

		radioDot: {
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: primary,
		},

		relationLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
		},

		relationLabelActive: {
			fontFamily: fonts.medium,
			color: primary,
		},

		addBtn: {
			borderWidth: 1,
			borderColor: primary,
			borderRadius: radius.md,
			padding: spacing.md,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
			marginBottom: spacing.md,
		},

		addBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: primary,
			marginLeft: spacing.xs,
		},

		// додай в getStyles.ts — нові селектори

		settingsSection: {
			backgroundColor: surface,
			borderRadius: radius.lg,
			padding: spacing.md,
			marginBottom: spacing.lg,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		settingsSectionTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginBottom: spacing.xs,
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},

		settingsRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: spacing.sm,
		},

		settingsRowTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: onSurface,
		},

		settingsRowSubtitle: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: textSecondary,
			marginTop: 2,
		},

		settingsDivider: {
			height: 1,
			backgroundColor: border,
			marginVertical: spacing.xs,
		},

		themeOption: {
			flexDirection: "row",
			alignItems: "center",
			gap: spacing.sm,
			paddingVertical: spacing.sm,
		},

		themeOptionLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: onSurface,
		},

		themeOptionLabelActive: {
			fontFamily: fonts.medium,
			color: primary,
		},

		dangerBtn: {
			borderWidth: 1,
			borderColor: error,
			borderRadius: radius.md,
			padding: spacing.md,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
		},

		dangerBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: error,
			marginLeft: spacing.sm,
		},

		legalLink: {
			paddingVertical: spacing.md,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},

		legalLinkText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: onSurface,
		},

		flexContainer: {
			flex: 1,
		},

		menuArrow: {
			color: textSecondary,
		},

		iconRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: 12,
		},
	})
}
