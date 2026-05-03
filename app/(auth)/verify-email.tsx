// app/(auth)/verify-email.tsx

import { AppLogo, AppName, Button, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useVerifyEmailActions } from "@/hooks"
import { ScrollView, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import createAuthStyles from "./auth.styles"

export default function VerifyEmail() {
	const theme = useAppTheme()
	const styles = createAuthStyles(theme)
	const { t } = useTranslation()
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
						{t('auth.verify.title')}
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
						{t('auth.verify.message', { email })}
					</Text>

					<View style={styles.errorContainer}>
						{error && <Text style={styles.errorText}>{t(error)}</Text>}
						{isResent && !error && (
							<Text
								style={[styles.errorText, { color: theme.colors.success }]}
							>
								{t('auth.verify.resent')}
							</Text>
						)}
					</View>

					<Button
						title={isLoading ? t('auth.verify.checking') : t('auth.verify.confirmed')}
						onPress={handleCheckVerification}
						disabled={isLoading}
					/>
					<View style={{ height: theme.spacing.sm }} />
					<Button
						title={
							cooldown > 0
								? t('auth.verify.resendWithCooldown', { cooldown })
								: t('auth.verify.resend')
						}
						onPress={handleResend}
						variant="secondary"
						disabled={isLoading || cooldown > 0}
					/>
					<View style={{ height: theme.spacing.sm }} />
					<Button
						title={t('common.logout')}
						onPress={handleLogout}
						variant="secondary"
						disabled={isLoading}
					/>
				</View>
			</ScrollView>
		</ScreenWrapper>
	)
}
