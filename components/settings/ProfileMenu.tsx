// components/settings/ProfileMenu.tsx

import { useAppTheme } from "@/hooks"
import { Heart, Pill, Settings, User, Users } from "lucide-react-native"
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

	const items: MenuItem[] = [
		{
			href: "/(tabs)/settings/personal",
			icon: <User size={iconSize} color={primary} />,
			title: "Особисті дані",
			subtitle: "Ім'я, телефон, адреса",
		},
		{
			href: "/(tabs)/settings/medical",
			icon: <Heart size={iconSize} color={primary} />,
			title: "Медичні дані",
			subtitle: "Перша поява приступів",
		},
		{
			href: "/(tabs)/settings/guardians",
			icon: <Users size={iconSize} color={primary} />,
			title: "Опікуни",
			subtitle: "Батьки та опікуни",
		},
		{
			href: "/(tabs)/settings/medications",
			icon: <Pill size={iconSize} color={primary} />,
			title: "Ліки",
			subtitle: "Список препаратів",
		},
		{
			href: "/(tabs)/settings/app-settings",
			icon: <Settings size={iconSize} color={primary} />,
			title: "Налаштування",
			subtitle: "Канал комунікації",
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
