// components/AppLayout.tsx

import { useAuth, useThemeContext } from "@/hooks"
import { Redirect, Stack } from "expo-router"
import { ActivityIndicator, View } from "react-native"
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper"

export function AppLayout() {
	const { theme, isDark } = useThemeContext()
	const { user, isLoading } = useAuth()
	const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme

	const {
		colors: {
			primary,
			secondary,
			background,
			surface,
			onSurface,
			error,
			border,
		},
	} = theme

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: background,
				}}
			>
				<ActivityIndicator color={primary} size="large" />
			</View>
		)
	}

	return (
		<PaperProvider
			theme={{
				...baseTheme,
				dark: isDark,
				colors: {
					...baseTheme.colors,
					primary,
					secondary,
					background,
					surface,
					error,
					onSurface,
					outline: border,
				},
			}}
		>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="(auth)" />
			</Stack>
			{!user && <Redirect href="/(auth)/login" />}
		</PaperProvider>
	)
}
