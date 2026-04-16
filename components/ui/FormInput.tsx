// components/ui/FormInput.tsx
import { useAppTheme } from "@/hooks"
import { Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"
import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native"
import { createFormInputStyles } from "./FormInput.styles"

type Props = Omit<TextInputProps, "secureTextEntry"> & {
	label: string
	isPassword?: boolean
}

export function FormInput({ label, isPassword = false, ...props }: Props) {
	const theme = useAppTheme()
	const styles = createFormInputStyles(theme)

	const [isVisible, setIsVisible] = useState(false)

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>

			<View style={styles.inputWrapper}>
				<TextInput
					{...props}
					secureTextEntry={isPassword && !isVisible}
					style={styles.input}
					placeholderTextColor={theme.colors.textSecondary}
				/>

				{isPassword && (
					<TouchableOpacity
						style={styles.eyeBtn}
						onPress={() => setIsVisible(v => !v)}
						activeOpacity={0.7}
					>
						{isVisible ? (
							<Eye
								size={theme.iconSize.sm}
								color={theme.colors.textSecondary}
							/>
						) : (
							<EyeOff
								size={theme.iconSize.sm}
								color={theme.colors.textSecondary}
							/>
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
