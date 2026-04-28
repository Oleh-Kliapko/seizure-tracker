// app/(tabs)/settings/index.tsx

import { LogoutButton, ProfileAvatar, ProfileMenu } from "@/components/settings"
import { ScreenWrapper } from "@/components/ui"
import { useAppTheme, useAuthActions, useAvatarUpload, useUser } from "@/hooks"
import { ActivityIndicator, ScrollView, View } from "react-native"

export default function ProfileScreen() {
	const { colors, spacing } = useAppTheme()
	const { profile, isLoading } = useUser()
	const { logout } = useAuthActions()
	const { pickAndUpload, removeAvatar, isUploading } = useAvatarUpload()

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
					avatarUrl={profile?.avatarUrl}
					isUploading={isUploading}
					onEdit={pickAndUpload}
					onDelete={() => removeAvatar(profile?.avatarPublicId, profile?.avatarUrl)}
				/>

				<View style={{ flex: 1, gap: spacing.md }}>
					<ProfileMenu />
				</View>

				<LogoutButton onPress={logout} />
			</ScrollView>
		</ScreenWrapper>
	)
}
