// app/(auth)/login.tsx

import {
	AppLogo,
	AppName,
	AppSlogan,
	AuthFooterLink,
	Button,
	Divider,
	FormInput,
	ScreenWrapper,
} from "@/components/ui"
import { GOOGLE_ICON } from "@/components/ui/svg"
import { useAppTheme, useLoginForm } from "@/hooks"
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native"
// import { SvgXml } from "react-native-svg"
import { SvgXml } from "react-native-svg"
import { useTranslation } from "react-i18next"
import createAuthStyles from "./auth.styles"

export default function Login() {
	const theme = useAppTheme()
	const styles = createAuthStyles(theme)
	const { t } = useTranslation()

	const {
		email,
		setEmail,
		password,
		setPassword,
		isLoading,
		displayError,
		handleLogin,
		loginWithGoogle,
	} = useLoginForm()

	return (
		<ScreenWrapper>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.logoContainer}>
						<AppLogo size={80} />
						<AppName marginTop={4} />
						<AppSlogan />
					</View>

					<View style={styles.formCard}>
						<FormInput
							label={t('auth.emailLabel')}
							value={email}
							onChangeText={setEmail}
							placeholder={t('auth.emailPlaceholder')}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
						/>
						<FormInput
							label={t('auth.passwordLabel')}
							value={password}
							onChangeText={setPassword}
							placeholder={t('auth.passwordPlaceholder')}
							autoComplete="password"
							isPassword
						/>

						<View style={styles.errorContainer}>
							{displayError && (
								<Text style={styles.errorText}>{t(displayError)}</Text>
							)}
						</View>

						<Button
							title={isLoading ? t('common.loading') : t('auth.login.submit')}
							onPress={handleLogin}
							disabled={isLoading}
						/>
					</View>

					<Divider />
					<Button
						title={t('auth.google')}
						icon={<SvgXml xml={GOOGLE_ICON} width={20} height={20} />}
						iconPosition="left"
						onPress={loginWithGoogle}
						variant="secondary"
					/>
					<AuthFooterLink
						question={t('auth.login.noAccount')}
						linkText={t('auth.login.registerLink')}
						href="./register"
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
