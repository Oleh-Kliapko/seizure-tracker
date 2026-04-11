// app/(auth)/login.tsx

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
import { useAppTheme, useLoginForm } from "@/hooks"
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native"

export default function Login() {
	const { spacing, colors, radius, fontSize, fonts } = useAppTheme()
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
							autoComplete="password"
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
							title={isLoading ? "Завантаження..." : "Увійти"}
							onPress={handleLogin}
							disabled={isLoading}
						/>
					</View>

					<Divider />
					<GoogleButton onPress={loginWithGoogle} />
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
