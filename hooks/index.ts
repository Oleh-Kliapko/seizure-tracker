// hooks/index.ts

import { useAuth } from "./auth/useAuth"
import { useAuthActions } from "./auth/useAuthActions"
import { useGoogleAuth } from "./auth/useGoogleAuth"
import { useLoginForm } from "./auth/useLoginForm"
import { useRegisterForm } from "./auth/useRegisterForm"
import { useSetPasswordForm } from "./auth/useSetPasswordForm"
import { useVerifyEmailActions } from "./auth/useVerifyEmailActions"
import { useDashboard } from "./dashboard/useDashboard"
import { useExport } from "./history/useExport"
import { useHistoryData } from "./history/useHistoryData"
import { useSeizureEditForm } from "./seizure/useSeizureEditForm"
import { useSeizureForm } from "./seizure/useSeizureForm"
import { useSeizureList } from "./seizure/useSeizureList"
import { useVideoUpload } from "./seizure/useVideoUpload"
import { useAppSettingsForm } from "./settings/useAppSettingsForm"
import { useAvatarUpload } from "./settings/useAvatarUpload"
import { useChangePasswordForm } from "./settings/useChangePasswordForm"
import { useDeleteAccount } from "./settings/useDeleteAccount"
import { useGuardiansForm } from "./settings/useGuardiansForm"
import { useMedicalForm } from "./settings/useMedicalForm"
import { useMedications } from "./settings/useMedications"
import { useMedicationsForm } from "./settings/useMedicationsForm"
import { usePersonalForm } from "./settings/usePersonalForm"
import { useUpdateProfile } from "./settings/useUpdateProfile"
import { useTrackingCalendar } from "./tracking/useTrackingCalendar"
import { useTrackingExport } from "./report/useTrackingExport"
import { useTrackingForm } from "./tracking/useTrackingForm"
import { useAppFonts } from "./useAppFonts"
import {
	ThemeProvider,
	useAppTheme,
	useIsDarkTheme,
	useThemeContext,
} from "./useAppTheme"
import { useUser } from "./useUser"

export {
	ThemeProvider,
	useAppFonts,
	useAppSettingsForm,
	useAppTheme,
	useAuth,
	useAuthActions,
	useAvatarUpload,
	useChangePasswordForm,
	useDashboard,
	useDeleteAccount,
	useExport,
	useGoogleAuth,
	useGuardiansForm,
	useHistoryData,
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
	useTrackingCalendar,
	useTrackingExport,
	useTrackingForm,
	useUpdateProfile,
	useUser,
	useVerifyEmailActions,
	useVideoUpload,
}
