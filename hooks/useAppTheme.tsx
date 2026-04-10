// hooks/useAppTheme.ts

import { AppTheme, darkTheme, lightTheme } from "@/constants/theme"
import { createContext, ReactNode, useContext, useMemo } from "react"
import { useColorScheme } from "react-native"

type ThemeContextType = {
	theme: AppTheme
	isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
	theme: lightTheme,
	isDark: false,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemScheme = useColorScheme()

	const value = useMemo<ThemeContextType>(() => {
		const isDark = systemScheme === "dark"
		return {
			theme: isDark ? darkTheme : lightTheme,
			isDark,
		}
	}, [systemScheme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
	return useContext(ThemeContext)
}

export function useAppTheme(): AppTheme {
	return useContext(ThemeContext).theme
}

export function useIsDarkTheme(): boolean {
	return useContext(ThemeContext).isDark
}
