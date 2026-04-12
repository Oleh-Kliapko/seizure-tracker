// app/(tabs)/index.tsx

import { useAppTheme, useAuthActions } from "@/hooks"
import { Text, TouchableOpacity, View } from "react-native"

export default function Dashboard() {
	const { colors, fonts } = useAppTheme()
	const { logout } = useAuthActions()

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
				Дашборд
			</Text>
			<TouchableOpacity onPress={logout} style={{ marginTop: 20 }}>
				<Text style={{ color: colors.error }}>Вийти</Text>
			</TouchableOpacity>
		</View>
	)
}
