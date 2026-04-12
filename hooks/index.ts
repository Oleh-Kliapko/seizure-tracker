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
import { usePersonalForm } from "./usePersonalForm"
import { useRegisterForm } from "./useRegisterForm"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

export {
	ThemeProvider,
	useAppFonts,
	useAppTheme,
	useAuth,
	useAuthActions,
	useIsDarkTheme,
	useLoginForm,
	usePersonalForm,
	useRegisterForm,
	useThemeContext,
	useUpdateProfile,
	useUser,
}
