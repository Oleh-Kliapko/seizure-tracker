// hooks/useAppTheme.tsx

import { AppTheme, darkTheme, lightTheme } from "@/constants/theme"
import { AppThemeMode } from "@/models/user"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react"
import { useColorScheme } from "react-native"

const THEME_STORAGE_KEY = "app:themeMode"

type ThemeContextType = {
	theme: AppTheme
	isDark: boolean
	themeMode: AppThemeMode
	setThemeMode: (mode: AppThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
	theme: lightTheme,
	isDark: false,
	themeMode: "system",
	setThemeMode: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
	const systemScheme = useColorScheme()
	const [themeMode, setThemeModeState] = useState<AppThemeMode>("system")

	useEffect(() => {
		AsyncStorage.getItem(THEME_STORAGE_KEY).then(saved => {
			if (saved) setThemeModeState(saved as AppThemeMode)
		})
	}, [])

	const setThemeMode = useCallback((mode: AppThemeMode) => {
		setThemeModeState(mode)
		AsyncStorage.setItem(THEME_STORAGE_KEY, mode)
	}, [])

	const value = useMemo<ThemeContextType>(() => {
		const isDark =
			themeMode === "dark" ||
			(themeMode === "system" && systemScheme === "dark")

		return {
			theme: isDark ? darkTheme : lightTheme,
			isDark,
			themeMode,
			setThemeMode,
		}
	}, [themeMode, systemScheme, setThemeMode])

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
