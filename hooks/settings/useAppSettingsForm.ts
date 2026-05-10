// hooks/settings/useAppSettingsForm.ts

import { AppThemeMode, CommunicationChannel } from "@/models/user"
import { useEffect, useState } from "react"
import { useThemeContext } from "../useAppTheme"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "../useUser"

export function useAppSettingsForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, isLoading } = useUpdateProfile()
	const { themeMode, setThemeMode } = useThemeContext()
	const [communicationChannel, setCommunicationChannel] =
		useState<CommunicationChannel>("email")

	useEffect(() => {
		if (!profile?.appSettings) return
		if (profile.appSettings.themeMode) {
			setThemeMode(profile.appSettings.themeMode)
		}
		setCommunicationChannel(profile.appSettings.communicationChannel ?? "email")
	}, [profile, setThemeMode])

	const handleThemeChange = async (mode: AppThemeMode) => {
		setThemeMode(mode)
		await updateProfile({
			appSettings: { themeMode: mode, communicationChannel },
		})
	}

	const handleCommunicationChange = async (channel: CommunicationChannel) => {
		setCommunicationChannel(channel)
		await updateProfile({
			appSettings: { themeMode, communicationChannel: channel },
		})
	}

	return {
		themeMode,
		communicationChannel,
		isLoading,
		isLoadingProfile,
		handleThemeChange,
		handleCommunicationChange,
	}
}
