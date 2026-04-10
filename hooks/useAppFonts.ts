import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export function useAppFonts() {
	const [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	})

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync()
		}
	}, [fontsLoaded, fontError])

	return fontsLoaded || !!fontError
}
