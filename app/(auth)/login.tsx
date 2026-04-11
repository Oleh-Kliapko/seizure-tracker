// app/(auth)/login.tsx

import { AppLogo, AppName, AppSlogan, ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { View } from "react-native"

export default function Login() {
	const { spacing } = useAppTheme()

	return (
		<ScreenWrapper>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingHorizontal: spacing.lg,
				}}
			>
				<AppLogo size={80} />
				<AppName marginTop={4} />
				<AppSlogan />
			</View>
		</ScreenWrapper>
	)
}
