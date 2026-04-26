import { useAppTheme } from "@/hooks"
import { Stack } from "expo-router"

export default function MedicationsLayout() {
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
