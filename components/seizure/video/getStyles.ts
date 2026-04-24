// components/seizure/video/getStyles.ts

import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const getStyles = (theme: AppTheme) => {
	const { colors, fonts, fontSize, spacing, radius } = theme

	return StyleSheet.create({
		videoView: {
			width: "100%",
			height: 200,
			borderRadius: radius.md,
		},

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

		sublabel: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			marginTop: 2,
		},

		videoLimitText: {
			fontFamily: fonts.regular,
			fontSize: fontSize.sm,
			color: colors.textSecondary,
			textAlign: "center" as const,
			marginTop: spacing.xs,
		},
	})
}
