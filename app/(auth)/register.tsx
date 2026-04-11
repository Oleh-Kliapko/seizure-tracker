// app/(auth)/register.tsx

import {
	AppLogo,
	AppName,
	AppSlogan,
	AuthFooterLink,
	Divider,
	FormInput,
	GoogleButton,
	PrimaryButton,
	ScreenWrapper,
} from "@/components/ui"
import { useAppTheme, useRegisterForm } from "@/hooks"
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native"

export default function Register() {
	const { spacing, colors, radius, fonts, fontSize } = useAppTheme()
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
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						paddingHorizontal: spacing.lg,
						paddingVertical: spacing.xl,
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View style={{ alignItems: "center", marginBottom: spacing.xl }}>
						<AppLogo size={80} />
						<AppName marginTop={4} />
						<AppSlogan />
					</View>

					<View
						style={{
							backgroundColor: colors.surface,
							borderRadius: radius.lg,
							padding: spacing.lg,
							marginBottom: spacing.md,
						}}
					>
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

						<View style={{ minHeight: 24, marginBottom: spacing.sm }}>
							{displayError && (
								<Text
									style={{
										color: colors.error,
										fontFamily: fonts.regular,
										fontSize: fontSize.sm,
										textAlign: "center",
									}}
								>
									{displayError}
								</Text>
							)}
						</View>

						<PrimaryButton
							title={isLoading ? "Завантаження..." : "Зареєструватись"}
							onPress={handleRegister}
							disabled={isLoading}
						/>
					</View>

					<Divider />
					<GoogleButton onPress={loginWithGoogle} />
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
