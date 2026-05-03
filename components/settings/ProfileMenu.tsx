// components/settings/ProfileMenu.tsx

import { useAppTheme } from "@/hooks"
import { Heart, Pill, Settings, User, Users } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { ProfileLink } from "./ProfileLink"

type MenuItem = {
	href: string
	icon: React.ReactNode
	title: string
	subtitle: string
}

export function ProfileMenu() {
	const {
		colors: { primary },
		iconSize: { md: iconSize },
	} = useAppTheme()
	const { t } = useTranslation()

	const items: MenuItem[] = [
		{
			href: "/(tabs)/settings/personal",
			icon: <User size={iconSize} color={primary} />,
			title: t('settings.personal'),
			subtitle: t('settings.personalSubtitle'),
		},
		{
			href: "/(tabs)/settings/medical",
			icon: <Heart size={iconSize} color={primary} />,
			title: t('settings.medical'),
			subtitle: t('settings.medicalSubtitle'),
		},
		{
			href: "/(tabs)/settings/guardians",
			icon: <Users size={iconSize} color={primary} />,
			title: t('settings.guardians'),
			subtitle: t('settings.guardiansSubtitle'),
		},
		{
			href: "/(tabs)/settings/medications",
			icon: <Pill size={iconSize} color={primary} />,
			title: t('settings.medications'),
			subtitle: t('settings.medicationsSubtitle'),
		},
		{
			href: "/(tabs)/settings/app-settings",
			icon: <Settings size={iconSize} color={primary} />,
			title: t('settings.appSettings'),
			subtitle: t('settings.appSettingsSubtitle'),
		},
	]

	return (
		<>
			{items.map(item => (
				<ProfileLink
					key={item.href}
					href={item.href}
					icon={item.icon}
					title={item.title}
					subtitle={item.subtitle}
				/>
			))}
		</>
	)
}
