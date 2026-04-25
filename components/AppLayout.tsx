// components/AppLayout.tsx

import { useAuth, useThemeContext } from "@/hooks"
import { Redirect, Stack } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper"

export function AppLayout() {
	const { theme, isDark } = useThemeContext()
	const { user, isLoading } = useAuth()
	const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme

	useEffect(() => {
		const url = process.env.EXPO_PUBLIC_BACKEND_URL
		if (!url) return
		fetch(`${url}/health`).catch(() => {})
	}, [])

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
					surface,
					error,
					onSurface,
					outline: border,
				},
			}}
		>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "transparent" },
				}}
			>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="(auth)" />
			</Stack>
			{!user && <Redirect href="/(auth)/login" />}
			{user && <Redirect href="/(tabs)" />}
		</PaperProvider>
	)
}
