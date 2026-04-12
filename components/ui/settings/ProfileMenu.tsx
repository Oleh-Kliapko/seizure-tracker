// components/settings/ProfileMenu.tsx

import { useAppTheme } from "@/hooks"
import { Heart, Settings, User, Users } from "lucide-react-native"
import { ProfileLink } from "./ProfileLink"

type MenuItem = {
	href: string
	icon: React.ReactNode
	title: string
	subtitle: string
}

export function ProfileMenu() {
	const { colors, iconSize } = useAppTheme()
	const size = iconSize.md
	const color = colors.primary

	const items: MenuItem[] = [
		{
			href: "/(tabs)/settings/personal",
			icon: <User size={size} color={color} />,
			title: "Особисті дані",
			subtitle: "Ім'я, телефон, адреса",
		},
		{
			href: "/(tabs)/settings/medical",
			icon: <Heart size={size} color={color} />,
			title: "Медичні дані",
			subtitle: "Перша поява приступів",
		},
		{
			href: "/(tabs)/settings/guardians",
			icon: <Users size={size} color={color} />,
			title: "Опікуни",
			subtitle: "Батьки та опікуни",
		},
		{
			href: "/(tabs)/settings/app-settings",
			icon: <Settings size={size} color={color} />,
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
