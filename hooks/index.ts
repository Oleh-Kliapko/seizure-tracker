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
import { useAvatarUpload } from "./useAvatarUpload"
import { useChangePasswordForm } from "./useChangePasswordForm"
import { useDeleteAccount } from "./useDeleteAccount"
import { useExport } from "./useExport"
import { useGoogleAuth } from "./useGoogleAuth"
import { useGuardiansForm } from "./useGuardiansForm"
import { useLoginForm } from "./useLoginForm"
import { useMedicalForm } from "./useMedicalForm"
import { usePersonalForm } from "./usePersonalForm"
import { useRegisterForm } from "./useRegisterForm"
import { useSeizureEditForm } from "./useSeizureEditForm"
import { useSeizureForm } from "./useSeizureForm"
import { useSeizureList } from "./useSeizureList"
import { useSetPasswordForm } from "./useSetPasswordForm"
import { useVerifyEmailActions } from "./useVerifyEmailActions"
import { useMedications } from "./useMedications"
import { useMedicationsForm } from "./useMedicationsForm"
import { useTrackingForm } from "./useTrackingForm"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"
import { useVideoUpload } from "./useVideoUpload"

export {
	ThemeProvider,
	useAppFonts,
	useAppSettingsForm,
	useAppTheme,
	useAuth,
	useAuthActions,
	useAvatarUpload,
	useChangePasswordForm,
	useDeleteAccount,
	useExport,
	useGoogleAuth,
	useGuardiansForm,
	useIsDarkTheme,
	useLoginForm,
	useMedicalForm,
	useMedications,
	useMedicationsForm,
	usePersonalForm,
	useRegisterForm,
	useSeizureEditForm,
	useSeizureForm,
	useSeizureList,
	useSetPasswordForm,
	useThemeContext,
	useTrackingForm,
	useUpdateProfile,
	useUser,
	useVerifyEmailActions,
	useVideoUpload,
}
