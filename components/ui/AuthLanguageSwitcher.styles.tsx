// components/ui/AuthLanguageSwitcher.styles.tsx
import { AppTheme } from "@/constants/theme"
import { StyleSheet } from "react-native"

export const createAuthLanguageSwitcherStyles = (theme: AppTheme) => {
	return StyleSheet.create({
		container: {
			flexDirection: "row",
			alignSelf: "flex-end",
			gap: 8,
			marginBottom: 16,
		},
		button: {
			width: 40,
			height: 40,
			borderRadius: 20,
			borderWidth: 2,
			alignItems: "center",
			justifyContent: "center",
		},
		flag: {
			fontSize: 20,
		},
	})
}
