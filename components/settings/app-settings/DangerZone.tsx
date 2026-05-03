// components/settings/app-settings/DangerZone.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { auth } from "@/config/firebase"
import { useAppTheme, useDeleteAccount } from "@/hooks"
import { Trash2 } from "lucide-react-native"
import { useState } from "react"
import { Alert, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

export function DangerZone() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const { deleteAccount, isLoading, error } = useDeleteAccount()
	const [password, setPassword] = useState("")
	const [showConfirm, setShowConfirm] = useState(false)

	const isPasswordUser = auth.currentUser?.providerData.some(
		p => p.providerId === "password",
	)

	const handleDeletePress = () => {
		Alert.alert(
			t('settings.deleteAccount'),
			t('settings.deleteAccountWarning'),
			[
				{ text: t('common.cancel'), style: "cancel" },
				{
					text: t('common.continue'),
					style: "destructive",
					onPress: () => setShowConfirm(true),
				},
			],
		)
	}

	const handleConfirmDelete = async () => {
		await deleteAccount(isPasswordUser ? password : undefined)
	}

	return (
		<View style={styles.settingsSection}>
			<Text style={styles.settingsSectionTitle}>{t('settings.dangerZone')}</Text>

			{showConfirm && (
				<View>
					{isPasswordUser && (
						<FormInput
							label={t('form.currentPassword')}
							value={password}
							onChangeText={setPassword}
							placeholder="••••••••"
							isPassword
						/>
					)}

					<View style={styles.errorContainer}>
						{error && <Text style={styles.errorText}>{t(error)}</Text>}
					</View>

					<Button
						title={isLoading ? t('settings.deleting') : t('settings.confirmDelete')}
						onPress={handleConfirmDelete}
						disabled={isLoading}
						variant="secondary"
						icon={<Trash2 size={18} color={theme.colors.error} />}
						iconPosition="left"
						style={{
							borderColor: theme.colors.error,
							marginBottom: theme.spacing.sm,
						}}
					/>

					<Button
						title={t('common.cancel')}
						onPress={() => {
							setShowConfirm(false)
							setPassword("")
						}}
						variant="secondary"
					/>
				</View>
			)}

			{!showConfirm && (
				<Button
					title={t('settings.deleteAccount')}
					onPress={handleDeletePress}
					variant="secondary"
					icon={<Trash2 size={18} color={theme.colors.error} />}
					iconPosition="left"
					style={{
						borderColor: theme.colors.error,
						backgroundColor: "transparent",
					}}
				/>
			)}
		</View>
	)
}
