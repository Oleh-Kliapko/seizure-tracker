// app/(tabs)/seizures/_layout.tsx

import { Stack } from "expo-router"

export default function SeizuresLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: "transparent" },
			}}
		/>
	)
}
