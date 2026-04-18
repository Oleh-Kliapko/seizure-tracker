// hooks/index.ts

import { useAppFonts } from "./useAppFonts"
import { useAppSettingsForm } from "./useAppSettingsForm"
import {
	ThemeProvider,
	useAppTheme,
	useIsDarkTheme,
	useThemeContext,
} from "./useAppTheme"
import { useAuth } from "./useAuth"
import { useAuthActions } from "./useAuthActions"
import { useChangePasswordForm } from "./useChangePasswordForm"
import { useDeleteAccount } from "./useDeleteAccount"
import { useGuardiansForm } from "./useGuardiansForm"
import { useLoginForm } from "./useLoginForm"
import { useMedicalForm } from "./useMedicalForm"
import { usePersonalForm } from "./usePersonalForm"
import { useRegisterForm } from "./useRegisterForm"
import { useSeizureForm } from "./useSeizureForm"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

export {
	ThemeProvider,
	useAppFonts,
	useAppSettingsForm,
	useAppTheme,
	useAuth,
	useAuthActions,
	useChangePasswordForm,
	useDeleteAccount,
	useGuardiansForm,
	useIsDarkTheme,
	useLoginForm,
	useMedicalForm,
	usePersonalForm,
	useRegisterForm,
	useSeizureForm,
	useThemeContext,
	useUpdateProfile,
	useUser,
}
