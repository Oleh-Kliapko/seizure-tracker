// components/settings/app-settings/AppSettingsForm.tsx

import { AppThemeMode, CommunicationChannel } from "@/models/user"
import { View } from "react-native"
import { ChangePasswordSection } from "./ChangePasswordSection"
import { CommunicationSelector } from "./CommunicationSelector"
import { DangerZone } from "./DangerZone"
import { LanguageSelector } from "./LanguageSelector"
import { LegalLinks } from "./LegalLinks"
import { ThemeSelector } from "./ThemeSelector"

type Props = {
	themeMode: AppThemeMode
	communicationChannel: CommunicationChannel
	onThemeChange: (v: AppThemeMode) => void
	onCommunicationChange: (v: CommunicationChannel) => void
	isLoading: boolean
}

export function AppSettingsForm({
	themeMode,
	communicationChannel,
	onThemeChange,
	onCommunicationChange,
	isLoading,
}: Props) {
	return (
		<View>
			<LanguageSelector />
			<ThemeSelector value={themeMode} onChange={onThemeChange} />
			<CommunicationSelector
				value={communicationChannel}
				onChange={onCommunicationChange}
			/>
			<ChangePasswordSection />
			<LegalLinks />
			<DangerZone />
		</View>
	)
}
