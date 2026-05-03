// app/(tabs)/_layout.tsx

import { FontFamily } from "@/constants/fonts"
import { useAppTheme } from "@/hooks"
import { Tabs } from "expo-router"
import {
	CalendarDays,
	ChartBar,
	House,
	Settings,
	Zap,
} from "lucide-react-native"
import { useTranslation } from "react-i18next"

export default function TabsLayout() {
	const {
		colors: { primary, textSecondary, surface, border },
		iconSize: { md },
		fontSize: { sm },
	} = useAppTheme()
	const { t } = useTranslation()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				sceneStyle: { backgroundColor: "transparent" },
				tabBarActiveTintColor: primary,
				tabBarInactiveTintColor: textSecondary,
				tabBarStyle: {
					backgroundColor: surface,
					borderTopColor: border,
					paddingTop: 8,
				},
				tabBarLabelStyle: {
					fontFamily: FontFamily.medium,
					fontSize: sm,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: t("tabs.home"),
					tabBarIcon: ({ color }) => <House size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="seizures"
				options={{
					title: t("tabs.seizures"),
					tabBarIcon: ({ color }) => <Zap size={md} color={color} />,
					href: "/(tabs)/seizures",
				}}
			/>
			<Tabs.Screen
				name="tracking"
				options={{
					title: t("tabs.tracking"),
					tabBarIcon: ({ color }) => <ChartBar size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: t("tabs.history"),
					tabBarIcon: ({ color }) => <CalendarDays size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: t("tabs.profile"),
					tabBarIcon: ({ color }) => <Settings size={md} color={color} />,
				}}
			/>
		</Tabs>
	)
}
