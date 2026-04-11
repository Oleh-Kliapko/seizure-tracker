// components/ui/ScreenWrapper.tsx

import { useAppTheme } from "@/hooks"
import { ReactNode } from "react"
import { View } from "react-native"
import { AppBackground } from "./AppBackground"

export function ScreenWrapper({ children }: { children: ReactNode }) {
	const { colors } = useAppTheme()

	return (
		<View style={[{ flex: 1 }, { backgroundColor: colors.background }]}>
			<AppBackground />
			{children}
		</View>
	)
}
