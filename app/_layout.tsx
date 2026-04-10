// app/_layout.tsx

import { ThemeProvider, useAppFonts, useThemeContext } from "@/hooks"
import { Stack } from "expo-router"
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"

function AppLayout() {
	const { theme, isDark } = useThemeContext()
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
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</PaperProvider>
	)
}

export default function RootLayout() {
	const fontsReady = useAppFonts()

	if (!fontsReady) return null

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<AppLayout />
			</ThemeProvider>
		</SafeAreaProvider>
	)
}
