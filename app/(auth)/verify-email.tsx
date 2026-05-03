// app/(auth)/verify-email.tsx

import { AppLogo, AppName, Button, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useVerifyEmailActions } from "@/hooks"
import { ScrollView, Text, View } from "react-native"
import createAuthStyles from "./auth.styles"

export default function VerifyEmail() {
	const theme = useAppTheme()
	const styles = createAuthStyles(theme)
	const {
		email,
		isLoading,
		error,
		isResent,
		cooldown,
		handleResend,
		handleCheckVerification,
		handleLogout,
	} = useVerifyEmailActions()

	return (
		<ScreenWrapper>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.logoContainer}>
					<AppLogo size={80} />
					<AppName marginTop={4} />
				</View>

				<View style={styles.formCard}>
					<Text
						style={{
							color: theme.colors.onSurface,
							fontFamily: theme.fonts.medium,
							fontSize: theme.fontSize.lg,
							textAlign: "center",
							marginBottom: theme.spacing.sm,
						}}
					>
						Підтвердіть email
					</Text>
					<Text
						style={{
							color: theme.colors.textSecondary,
							fontFamily: theme.fonts.regular,
							fontSize: theme.fontSize.sm,
							textAlign: "center",
							marginBottom: theme.spacing.lg,
						}}
					>
						Ми надіслали листа на {email}.{"\n"}
						Перейдіть за посиланням у листі, щоб підтвердити акаунт.
					</Text>

					<View style={styles.errorContainer}>
						{error && <Text style={styles.errorText}>{error}</Text>}
						{isResent && !error && (
							<Text
								style={[styles.errorText, { color: theme.colors.success }]}
							>
								Лист надіслано повторно!
							</Text>
						)}
					</View>

					<Button
						title={isLoading ? "Перевірка..." : "Я підтвердив"}
						onPress={handleCheckVerification}
						disabled={isLoading}
					/>
					<View style={{ height: theme.spacing.sm }} />
					<Button
						title={
							cooldown > 0
								? `Надіслати повторно (${cooldown}с)`
								: "Надіслати повторно"
						}
						onPress={handleResend}
						variant="secondary"
						disabled={isLoading || cooldown > 0}
					/>
					<View style={{ height: theme.spacing.sm }} />
					<Button
						title="Вийти"
						onPress={handleLogout}
						variant="secondary"
						disabled={isLoading}
					/>
				</View>
			</ScrollView>
		</ScreenWrapper>
	)
}
