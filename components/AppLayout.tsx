// components/AppLayout.tsx

import { useAuth, useOnboarding, useThemeContext } from "@/hooks"
import { router, Stack } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

export function AppLayout() {
	const { theme, isDark } = useThemeContext()
	const { user, isLoading } = useAuth()
	const { hasSeenOnboarding } = useOnboarding()
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const url = process.env.EXPO_PUBLIC_BACKEND_URL
		if (url) fetch(`${url}/health`).catch(() => {})
	}, [])

	useEffect(() => {
		if (isLoading) return

		const isEmailOnly =
			user?.providerData.some(p => p.providerId === "password") &&
			!user?.providerData.some(p => p.providerId === "google.com")

		if (!user && !hasSeenOnboarding) {
			router.replace("/onboarding")
		} else if (!user) {
			router.replace("/(auth)/login")
		} else if (isEmailOnly && !user.emailVerified) {
			router.replace("/(auth)/verify-email")
		} else {
			router.replace("/(tabs)")
		}

		setIsReady(true)
	}, [isLoading, user, hasSeenOnboarding])

	const { colors: { primary, background } } = theme

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: "transparent" },
				}}
			>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="(auth)" />
				<Stack.Screen name="onboarding" />
			</Stack>

			{/* Overlay blocks any persisted-route flash until navigation is decided */}
			{!isReady && (
				<View style={{
					position: "absolute",
					top: 0, left: 0, right: 0, bottom: 0,
					backgroundColor: background,
					justifyContent: "center",
					alignItems: "center",
				}}>
					<ActivityIndicator color={primary} size="large" />
				</View>
			)}
		</>
	)
}
