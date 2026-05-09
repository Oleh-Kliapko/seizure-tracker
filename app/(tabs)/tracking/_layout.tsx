// app/(tabs)/tracking/_layout.tsx

import { Stack } from "expo-router"

export default function TrackingLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: "transparent" },
			}}
		/>
	)
}
