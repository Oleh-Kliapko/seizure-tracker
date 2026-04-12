// hooks/index.ts

import { useAppFonts } from "./useAppFonts"
import {
	ThemeProvider,
	useAppTheme,
	useIsDarkTheme,
	useThemeContext,
} from "./useAppTheme"
import { useAuth } from "./useAuth"
import { useAuthActions } from "./useAuthActions"
import { useLoginForm } from "./useLoginForm"
import { useRegisterForm } from "./useRegisterForm"
import { useUser } from "./useUser"

export {
	ThemeProvider,
	useAppFonts,
	useAppTheme,
	useAuth,
	useAuthActions,
	useIsDarkTheme,
	useLoginForm,
	useRegisterForm,
	useThemeContext,
	useUser,
}
