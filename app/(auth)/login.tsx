// app/(auth)/login.tsx

import { ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"

export default function Login() {
	const { fonts, colors } = useAppTheme()

	return (
		<ScreenWrapper>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text
					style={{
						fontSize: 20,
						fontFamily: fonts.medium,
						color: colors.onSurface,
					}}
				>
					Тут буде логіка для входу в акаунт
				</Text>
			</View>
		</ScreenWrapper>
	)
}
