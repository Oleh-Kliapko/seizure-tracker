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
import { useAppTheme } from "@/hooks"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"

export default function Login() {
	const { spacing, colors, radius } = useAppTheme()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = () => {
		// логіка входу — додамо далі
	}

	const handleGoogle = () => {
		// логіка Google — додамо далі
	}

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
							secureTextEntry
							autoComplete="password"
							isPassword
						/>
						<PrimaryButton title="Увійти" onPress={handleLogin} />
					</View>

					<Divider />
					<GoogleButton onPress={handleGoogle} />
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
