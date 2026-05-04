// app/(tabs)/settings/_layout.tsx

import { useAppTheme } from "@/hooks"
import { Stack } from "expo-router"

export default function SettingsLayout() {
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
