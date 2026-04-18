// components/settings/app-settings/DangerZone.tsx

import { FormInput } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { auth } from "@/config/firebase"
import { useAppTheme, useDeleteAccount } from "@/hooks"
import { Trash2 } from "lucide-react-native"
import { useState } from "react"
import { Alert, Text, View } from "react-native"
import { getStyles } from "../getStyles"

export function DangerZone() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { deleteAccount, isLoading, error } = useDeleteAccount()
	const [password, setPassword] = useState("")
	const [showConfirm, setShowConfirm] = useState(false)

	const isPasswordUser = auth.currentUser?.providerData.some(
		p => p.providerId === "password",
	)

	const handleDeletePress = () => {
		Alert.alert(
			"Видалити акаунт",
			"Ця дія незворотня. Всі ваші дані будуть видалені назавжди.",
			[
				{ text: "Скасувати", style: "cancel" },
				{
					text: "Продовжити",
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
			<Text style={styles.settingsSectionTitle}>Небезпечна зона</Text>

			{showConfirm && (
				<View>
					{isPasswordUser && (
						<FormInput
							label="Введіть пароль для підтвердження"
							value={password}
							onChangeText={setPassword}
							placeholder="••••••••"
							isPassword
						/>
					)}

					<View style={styles.errorContainer}>
						{error && <Text style={styles.errorText}>{error}</Text>}
					</View>

					<Button
						title={isLoading ? "Видалення..." : "Підтвердити видалення"}
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
						title="Скасувати"
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
					title="Видалити акаунт"
					onPress={handleDeletePress}
					variant="secondary"
					icon={<Trash2 size={18} color={theme.colors.error} />}
					iconPosition="left"
					style={{ borderColor: theme.colors.error }}
				/>
			)}
		</View>
	)
}
