// app/_layout.tsx

import { AppLayout, ErrorBoundary } from "@/components"
import "@/config/i18n"
import { ThemeProvider, useAppFonts } from "@/hooks"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function RootLayout() {
	const fontsReady = useAppFonts()

	if (!fontsReady) return null

	return (
		<ErrorBoundary>
			<SafeAreaProvider>
				<ThemeProvider>
					<AppLayout />
				</ThemeProvider>
			</SafeAreaProvider>
		</ErrorBoundary>
	)
}
