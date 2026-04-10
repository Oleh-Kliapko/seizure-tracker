// app/_layout.tsx

import { AppLayout } from "@/components"
import { ThemeProvider, useAppFonts } from "@/hooks"
import { SafeAreaProvider } from "react-native-safe-area-context"

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
