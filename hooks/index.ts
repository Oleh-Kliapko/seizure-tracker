// hooks/index.ts

import { useAppFonts } from "./useAppFonts"
import {
	ThemeProvider,
	useAppTheme,
	useIsDarkTheme,
	useThemeContext,
} from "./useAppTheme"
import { useAuth } from "./useAuth"

export {
	ThemeProvider,
	useAppFonts,
	useAppTheme,
	useAuth,
	useIsDarkTheme,
	useThemeContext,
}
