// app/(tabs)/settings/index.tsx

import { ScreenWrapper } from "@/components/ui"
import {
	LogoutButton,
	ProfileAvatar,
	ProfileMenu,
} from "@/components/ui/settings"
import { useAppTheme, useAuthActions, useUser } from "@/hooks"
import { ActivityIndicator, ScrollView, View } from "react-native"

export default function ProfileScreen() {
	const { colors, spacing } = useAppTheme()
	const { profile, isLoading } = useUser()
	const { logout } = useAuthActions()

	if (isLoading) {
		return (
			<ScreenWrapper>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			</ScreenWrapper>
		)
	}

	return (
		<ScreenWrapper>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					padding: spacing.lg,
					paddingTop: 120,
				}}
				showsVerticalScrollIndicator={false}
			>
				<ProfileAvatar
					displayName={profile?.displayName ?? "—"}
					email={profile?.email ?? "—"}
					onEdit={() => {}}
				/>

				<View style={{ flex: 1, gap: spacing.xl }}>
					<ProfileMenu />
				</View>

				<LogoutButton onPress={logout} />
			</ScrollView>
		</ScreenWrapper>
	)
}
