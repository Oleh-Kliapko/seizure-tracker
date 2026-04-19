// components/seizure/list/getSeizureColor.ts

import { AppTheme } from "@/constants/theme"
import { SeizureSeverity } from "@/models"

export function getSeizureColor(
	theme: AppTheme,
	severity?: SeizureSeverity,
): string {
	const { seizureColors } = theme
	switch (severity) {
		case 3:
			return seizureColors.severe
		case 2:
			return seizureColors.medium
		case 1:
			return seizureColors.light
		default:
			return seizureColors.unknown
	}
}
