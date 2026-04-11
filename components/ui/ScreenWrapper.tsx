// components/ui/ScreenWrapper.tsx

import { useAppTheme } from "@/hooks"
import { ReactNode } from "react"
import { View } from "react-native"
import { AppBackground } from "./AppBackground"

type ScreenWrapperProps = {
	from?: string
	children: ReactNode
}

export function ScreenWrapper({
	from = "default",
	children,
}: ScreenWrapperProps) {
	const { colors } = useAppTheme()

	return (
		<View style={[{ flex: 1 }, { backgroundColor: colors.background }]}>
			<AppBackground
				color={from === "default" ? colors.primary : colors.secondary}
			/>
			{children}
		</View>
	)
}
