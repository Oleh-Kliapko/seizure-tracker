// app/(auth)/_layout.tsx

import { useAppTheme } from "@/hooks"
import { Stack } from "expo-router"

export default function AuthLayout() {
	const { colors } = useAppTheme()

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: colors.background },
			}}
		/>
	)
}
