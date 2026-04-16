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
import { SvgXml } from "react-native-svg"
import createAuthStyles from "./auth.styles"

export default function Login() {
	const theme = useAppTheme()
	const styles = createAuthStyles(theme)

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
							autoComplete="password"
							isPassword
						/>

						<View style={styles.errorContainer}>
							{displayError && (
								<Text style={styles.errorText}>{displayError}</Text>
							)}
						</View>

						<Button
							title={isLoading ? "Завантаження..." : "Увійти"}
							onPress={handleLogin}
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
						question="Ще немає акаунту?"
						linkText="Зареєструватись"
						href="./register"
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
