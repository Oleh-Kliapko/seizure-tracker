// components/ui/FormInput.tsx
import { useAppTheme } from "@/hooks"
import { Check, Eye, EyeOff } from "lucide-react-native"
import { useRef, useState } from "react"
import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native"
import { createFormInputStyles } from "./FormInput.styles"

type Props = Omit<TextInputProps, "secureTextEntry"> & {
	label?: string
	isPassword?: boolean
	validate?: (value: string) => boolean
}

export function FormInput({ label, isPassword = false, validate, ...props }: Props) {
	const theme = useAppTheme()
	const styles = createFormInputStyles(theme)

	const [isVisible, setIsVisible] = useState(false)
	const [showCheck, setShowCheck] = useState(false)
	const isDirty = useRef(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const currentValueRef = useRef(typeof props.value === "string" ? props.value : "")

	const handleChangeText = (text: string) => {
		isDirty.current = true
		currentValueRef.current = text
		props.onChangeText?.(text)
	}

	const handleBlur = (e: any) => {
		if (isDirty.current) {
			isDirty.current = false
			const isValid = validate ? validate(currentValueRef.current) : true
			if (isValid) {
				if (timerRef.current) clearTimeout(timerRef.current)
				setShowCheck(true)
				timerRef.current = setTimeout(() => setShowCheck(false), 2000)
			}
		}
		props.onBlur?.(e)
	}

	return (
		<View style={styles.container}>
			{!!label && <Text style={styles.label}>{label}</Text>}

			<View style={styles.inputWrapper}>
				<TextInput
					{...props}
					onChangeText={handleChangeText}
					onBlur={handleBlur}
					secureTextEntry={isPassword && !isVisible}
					style={styles.input}
					placeholderTextColor={theme.colors.textSecondary}
				/>

				{showCheck && !isPassword && (
					<View style={styles.eyeBtn}>
						<Check size={theme.iconSize.sm} color={theme.colors.success} />
					</View>
				)}

				{isPassword && (
					<TouchableOpacity
						style={styles.eyeBtn}
						onPress={() => setIsVisible(v => !v)}
						activeOpacity={0.7}
					>
						{isVisible ? (
							<Eye size={theme.iconSize.sm} color={theme.colors.textSecondary} />
						) : (
							<EyeOff size={theme.iconSize.sm} color={theme.colors.textSecondary} />
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
