// app/(tabs)/tracking.tsx

import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"

export default function Tracking() {
	const { colors, fonts } = useAppTheme()

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: colors.background,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					fontFamily: fonts.medium,
					color: colors.onSurface,
				}}
			>
				Трекінг
			</Text>
		</View>
	)
}
