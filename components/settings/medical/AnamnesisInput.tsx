// components/settings/medical/AnamnesisInput.tsx

import { useAppTheme } from "@/hooks"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

const MAX_LENGTH = 150

type Props = {
	value: string
	onChange: (v: string) => void
	onBlur: () => void
}

export function AnamnesisInput({ value, onChange, onBlur }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const isDirty = useRef(false)
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleChange = (text: string) => {
		isDirty.current = true
		onChange(text)
	}

	const handleBlur = () => {
		if (isDirty.current) {
			isDirty.current = false
			if (timerRef.current) clearTimeout(timerRef.current)
			setShowCheck(true)
			timerRef.current = setTimeout(() => setShowCheck(false), 2000)
		}
		onBlur()
	}

	return (
		<View>
			<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: styles.label.marginBottom }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
					<Text style={[styles.label, { marginBottom: 0 }]}>{t('medical.anamnesis')}</Text>
					{showCheck && <Check size={13} color="#22C55E" />}
				</View>
				<Text style={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSize.sm, color: theme.colors.textSecondary }}>
				{value.length}/{MAX_LENGTH}
				</Text>
			</View>
			<TextInput
				style={styles.textInput}
				value={value}
				onChangeText={handleChange}
				onBlur={handleBlur}
				placeholder={t('medical.anamnesisPlaceholder')}
				placeholderTextColor={theme.colors.textSecondary}
				multiline
				numberOfLines={5}
				textAlignVertical="top"
				maxLength={MAX_LENGTH}
			/>
		</View>
	)
}
