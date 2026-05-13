// components/seizure/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		section: {
			backgroundColor: colors.surface,
			borderRadius: radius.lg,
			padding: spacing.lg,
			marginBottom: spacing.md,
			shadowColor: "#000",
			shadowOpacity: 0.04,
			shadowRadius: 6,
			shadowOffset: { width: 0, height: 2 },
		},

		sectionTitle: {
			fontFamily: fonts.medium,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginBottom: spacing.md,
			textTransform: "uppercase" as const,
			letterSpacing: 0.5,
		},

		row: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},

		label: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		sublabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		divider: {
			height: 1,
			backgroundColor: colors.border,
			marginVertical: spacing.md,
		},

		// Тип приступу
		typeOption: {
			flexDirection: "row",
			alignItems: "center",
			paddingVertical: spacing.sm,
			gap: spacing.sm,
		},

		typeLabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.md,
			color: colors.onSurface,
		},

		typeLabelActive: {
			fontFamily: fonts.medium,
			color: colors.primary,
		},

		radioCircle: {
			width: 20,
			height: 20,
			borderRadius: 10,
			borderWidth: 2,
			borderColor: colors.border,
			justifyContent: "center",
			alignItems: "center",
		},

		radioCircleActive: {
			borderColor: colors.primary,
		},

		radioDot: {
			width: 10,
			height: 10,
			borderRadius: 5,
			backgroundColor: colors.primary,
		},

		checkboxSquare: {
			width: 20,
			height: 20,
			borderRadius: 4,
			borderWidth: 2,
			borderColor: colors.border,
			justifyContent: "center",
			alignItems: "center",
		},

		checkboxSquareActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary,
		},

		checkboxMark: {
			width: 10,
			height: 6,
			borderLeftWidth: 2,
			borderBottomWidth: 2,
			borderColor: colors.onPrimary,
			transform: [{ rotate: "-45deg" }, { translateY: -1 }],
		},

		// Тригери
		triggerChip: {
			flexDirection: "row",
			alignItems: "center",
			paddingHorizontal: spacing.md,
			paddingVertical: spacing.sm,
			borderRadius: radius.lg,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.background,
			marginRight: spacing.sm,
			marginBottom: spacing.sm,
		},

		triggerChipActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary + "15",
		},

		triggerChipText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
		},

		triggerChipTextActive: {
			fontFamily: fonts.medium,
			color: colors.primary,
		},

		triggerRow: {
			flexDirection: "row",
			flexWrap: "wrap",
		},

		// Настрій
		moodRow: {
			flexDirection: "row",
			justifyContent: "space-between",
			marginTop: spacing.sm,
		},

		moodBtn: {
			width: 44,
			height: 44,
			borderRadius: 22,
			borderWidth: 1,
			borderColor: colors.border,
			backgroundColor: colors.background,
			justifyContent: "center",
			alignItems: "center",
		},

		moodBtnActive: {
			borderColor: colors.primary,
			backgroundColor: colors.primary,
		},

		moodBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.textSecondary,
		},

		moodBtnTextActive: {
			color: colors.onPrimary,
		},

		// Блискавки
		severityRow: {
			flexDirection: "row",
			gap: spacing.md,
			marginTop: spacing.sm,
		},

		// Switch row
		switchRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			paddingVertical: spacing.sm,
			gap: spacing.md,
		},

		switchLabel: {
			flex: 1,
		},

		// Відео
		videoBtn: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderColor: colors.primary,
			borderRadius: radius.md,
			padding: spacing.md,
			gap: spacing.sm,
		},

		videoBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.primary,
		},

		videoPreview: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: colors.background,
			borderRadius: radius.md,
			padding: spacing.md,
			borderWidth: 1,
			borderColor: colors.border,
		},

		videoPreviewText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.onSurface,
			flex: 1,
			marginLeft: spacing.sm,
		},

		errorContainer: {
			height: 40,
			justifyContent: "center",
			marginBottom: spacing.sm,
		},

		errorText: {
			color: colors.error,
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			textAlign: "center",
		},

		doneBtn: {
			marginTop: spacing.sm,
			borderRadius: radius.md,
			paddingVertical: spacing.sm,
			alignItems: "center",
		},

		doneBtnText: {
			fontFamily: fonts.medium,
			fontSize: fontSize.md,
			color: colors.onPrimary,
		},

		uploadProgress: {
			marginTop: spacing.sm,
		},

		progressBar: {
			height: 6,
			backgroundColor: colors.border,
			borderRadius: 3,
			overflow: "hidden" as const,
		},

		progressFill: {
			height: 6,
			borderRadius: 3,
		},

		videoLimitText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			textAlign: "center" as const,
			marginTop: spacing.xs,
		},

		descriptionInput: {
			minHeight: 100,
		},
	})
}
