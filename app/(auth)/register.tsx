// app/(auth)/register.tsx

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
import { useAppTheme, useRegisterForm } from "@/hooks"
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native"
import { SvgXml } from "react-native-svg"
import createAuthStyles from "./auth.styles"

export default function Register() {
	const theme = useAppTheme()
	const styles = createAuthStyles(theme)

	const {
		email,
		setEmail,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		isLoading,
		displayError,
		handleRegister,
		loginWithGoogle,
	} = useRegisterForm()

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
							label="Email"
							value={email}
							onChangeText={setEmail}
							placeholder="your@email.com"
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
						/>
						<FormInput
							label="Пароль"
							value={password}
							onChangeText={setPassword}
							placeholder="••••••••"
							autoComplete="new-password"
							isPassword
						/>
						<FormInput
							label="Підтвердити пароль"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							placeholder="••••••••"
							autoComplete="new-password"
							isPassword
						/>

						<View style={styles.errorContainer}>
							{displayError && (
								<Text style={styles.errorText}>{displayError}</Text>
							)}
						</View>

						<Button
							title={isLoading ? "Завантаження..." : "Зареєструватись"}
							onPress={handleRegister}
							disabled={isLoading}
						/>
					</View>

					<Divider />
					<Button
						title="Продовжити з Google"
						icon={<SvgXml xml={GOOGLE_ICON} width={20} height={20} />}
						iconPosition="left"
						onPress={loginWithGoogle}
						variant="secondary"
					/>
					<AuthFooterLink
						question="Вже є акаунт?"
						linkText="Увійти"
						href="./login"
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
