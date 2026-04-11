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

export default function TabsLayout() {
	const {
		colors: { primary, textSecondary, surface, border },
		iconSize: { md },
		fontSize: { sm },
	} = useAppTheme()

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
					title: "Головна",
					tabBarIcon: ({ color }) => <House size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="seizures"
				options={{
					title: "Приступи",
					tabBarIcon: ({ color }) => <Zap size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="tracking"
				options={{
					title: "Трекінг",
					tabBarIcon: ({ color }) => <ChartBar size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					title: "Історія",
					tabBarIcon: ({ color }) => <CalendarDays size={md} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Профіль",
					tabBarIcon: ({ color }) => <Settings size={md} color={color} />,
				}}
			/>
		</Tabs>
	)
}
