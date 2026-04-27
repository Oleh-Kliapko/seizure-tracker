// components/settings/medical/AnamnesisInput.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	value: string
	onChange: (v: string) => void
	onBlur: () => void
}

export function AnamnesisInput({ value, onChange, onBlur }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View>
			<Text style={styles.label}>Основний анамнез</Text>
			<TextInput
				style={styles.textInput}
				value={value}
				onChangeText={onChange}
				onBlur={onBlur}
				placeholder="Опишіть основний анамнез..."
				placeholderTextColor={theme.colors.textSecondary}
				multiline
				numberOfLines={5}
				textAlignVertical="top"
			/>
		</View>
	)
}
