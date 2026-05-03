// components/settings/medical/AnamnesisInput.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

type Props = {
	value: string
	onChange: (v: string) => void
	onBlur: () => void
}

export function AnamnesisInput({ value, onChange, onBlur }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View>
			<Text style={styles.label}>{t('medical.anamnesis')}</Text>
			<TextInput
				style={styles.textInput}
				value={value}
				onChangeText={onChange}
				onBlur={onBlur}
				placeholder={t('medical.anamnesisPlaceholder')}
				placeholderTextColor={theme.colors.textSecondary}
				multiline
				numberOfLines={5}
				textAlignVertical="top"
			/>
		</View>
	)
}
