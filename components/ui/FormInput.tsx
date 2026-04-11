// components/ui/FormInput.tsx

import { useAppTheme } from "@/hooks"
import { Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native"

type Props = Omit<TextInputProps, "secureTextEntry"> & {
	label: string
	isPassword?: boolean
}

export function FormInput({ label, isPassword = false, ...props }: Props) {
	const { colors, fonts, spacing, radius, fontSize, iconSize } = useAppTheme()
	const [isVisible, setIsVisible] = useState(false)

	return (
		<View style={s.container}>
			<Text
				style={[
					s.label,
					{
						fontFamily: fonts.medium,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
					},
				]}
			>
				{label}
			</Text>

			<View
				style={[
					s.inputWrapper,
					{
						backgroundColor: colors.background,
						borderColor: colors.border,
						borderRadius: radius.md,
					},
				]}
			>
				<TextInput
					{...props}
					secureTextEntry={isPassword && !isVisible}
					style={[
						s.input,
						{
							fontFamily: fonts.regular,
							fontSize: fontSize.md,
							color: colors.onSurface,
							paddingHorizontal: spacing.md,
							paddingVertical: spacing.sm + 2,
						},
					]}
					placeholderTextColor={colors.textSecondary}
				/>

				{isPassword && (
					<TouchableOpacity
						style={[s.eyeBtn, { paddingHorizontal: spacing.sm }]}
						onPress={() => setIsVisible(v => !v)}
						activeOpacity={0.7}
					>
						{isVisible ? (
							<Eye size={iconSize.sm} color={colors.textSecondary} />
						) : (
							<EyeOff size={iconSize.sm} color={colors.textSecondary} />
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		marginBottom: 6,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
	},
	input: {
		flex: 1,
	},
	eyeBtn: {
		justifyContent: "center",
	},
})
