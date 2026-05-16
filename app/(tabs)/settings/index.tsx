// app/(tabs)/settings/index.tsx

import { LogoutButton, ProfileAvatar, ProfileMenu, ProfileSkeleton } from "@/components/settings"
import { ScreenWrapper } from "@/components/ui"
import { useAppTheme, useAuthActions, useAvatar, useUser } from "@/hooks"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Alert, ScrollView, View } from "react-native"

export default function ProfileScreen() {
	const { spacing } = useAppTheme()
	const { t } = useTranslation()
	const { profile, isLoading } = useUser()
	const { logout } = useAuthActions()
	const {
		pickAndUpload,
		removeAvatar,
		isUploading,
		error: avatarError,
	} = useAvatar()

	useEffect(() => {
		if (avatarError) Alert.alert(t("common.error"), t(avatarError))
	}, [avatarError]) // eslint-disable-line react-hooks/exhaustive-deps

	if (isLoading) {
		return (
			<ScreenWrapper>
				<ProfileSkeleton />
			</ScreenWrapper>
		)
	}

	return (
		<ScreenWrapper>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					padding: spacing.lg,
					paddingTop: 88,
				}}
				showsVerticalScrollIndicator={false}
			>
				<ProfileAvatar
					displayName={profile?.displayName ?? "—"}
					email={profile?.email ?? "—"}
					avatarUrl={profile?.avatarUrl}
					isUploading={isUploading}
					onEdit={pickAndUpload}
					onDelete={() =>
						removeAvatar(profile?.avatarPublicId, profile?.avatarUrl)
					}
				/>

				<View style={{ flex: 1, gap: 12 }}>
					<ProfileMenu />
				</View>

				<LogoutButton onPress={logout} />
			</ScrollView>
		</ScreenWrapper>
	)
}
