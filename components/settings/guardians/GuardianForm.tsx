// components/settings/guardians/GuardianForm.tsx

import { memo } from "react"
import { FormInput } from "@/components/ui"
import { RELATIONS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Guardian } from "@/models/user"
import { Trash2 } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"

type Props = {
	guardian: Guardian
	index: number
	onUpdate: (field: keyof Guardian, value: string) => void
	onRemove: () => void
	onBlur: () => void
}

export const GuardianForm = memo(function GuardianForm({ guardian, index, onUpdate, onRemove, onBlur }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.guardianCard}>
			<View style={styles.guardianHeader}>
				<Text style={styles.guardianTitle}>{t('guardians.title', { index: index + 1 })}</Text>
				<TouchableOpacity onPress={onRemove} activeOpacity={0.7} accessibilityLabel="Видалити опікуна" accessibilityRole="button">
					<Trash2 size={20} color={theme.colors.error} />
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>{t('guardians.relation')}</Text>
			<View style={styles.relationsRow}>
				{RELATIONS.map(r => {
					const isSelected = guardian.relation === r.value
					return (
						<TouchableOpacity
							key={r.value}
							style={[
								styles.relationBtn,
								isSelected && styles.relationBtnActive,
							]}
							onPress={() => onUpdate("relation", r.value)}
							activeOpacity={0.7}
						>
							<View
								style={[
									styles.radioCircle,
									isSelected && styles.radioCircleActive,
								]}
							>
								{isSelected && <View style={styles.radioDot} />}
							</View>
							<Text
								style={[
									styles.relationLabel,
									isSelected && styles.relationLabelActive,
								]}
							>
								{t(r.labelKey)}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>

			<FormInput
				label={t('guardians.fullName')}
				value={guardian.fullName}
				onChangeText={v => onUpdate("fullName", v)}
				onBlur={onBlur}
				placeholder={t('guardians.fullNamePlaceholder')}
				autoCapitalize="words"
			/>
			<FormInput
				label={t('auth.emailLabel')}
				value={guardian.email}
				onChangeText={v => onUpdate("email", v)}
				onBlur={onBlur}
				placeholder={t('guardians.emailPlaceholder')}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<FormInput
				label={t('guardians.phone')}
				value={guardian.phone}
				onChangeText={v => onUpdate("phone", v)}
				onBlur={onBlur}
				placeholder={t('guardians.phonePlaceholder')}
				keyboardType="phone-pad"
			/>
		</View>
	)
})
