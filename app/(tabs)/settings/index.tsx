// app/(tabs)/settings/index.tsx

import { LogoutButton, ProfileAvatar, ProfileMenu } from "@/components/settings"
import { ScreenWrapper } from "@/components/ui"
import { useAppTheme, useAuthActions, useAvatar, useUser } from "@/hooks"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Alert, ScrollView, View } from "react-native"

export default function ProfileScreen() {
	const { colors, spacing } = useAppTheme()
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
					onDelete={() =>
						removeAvatar(profile?.avatarPublicId, profile?.avatarUrl)
					}
				/>

				<View style={{ flex: 1, gap: spacing.md }}>
					<ProfileMenu />
				</View>

				<LogoutButton onPress={logout} />
			</ScrollView>
		</ScreenWrapper>
	)
}
