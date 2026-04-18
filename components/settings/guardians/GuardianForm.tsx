// components/settings/guardians/GuardianForm.tsx

import { FormInput } from "@/components/ui"
import { RELATIONS } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { Guardian } from "@/models/user"
import { Picker } from "@react-native-picker/picker"
import { Trash2 } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"

type Props = {
	guardian: Guardian
	index: number
	onUpdate: (field: keyof Guardian, value: string) => void
	onRemove: () => void
}

export function GuardianForm({ guardian, index, onUpdate, onRemove }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.guardianCard}>
			<View style={styles.guardianHeader}>
				<Text style={styles.guardianTitle}>Опікун {index + 1}</Text>
				<TouchableOpacity onPress={onRemove} activeOpacity={0.7}>
					<Trash2 size={20} color={theme.colors.error} />
				</TouchableOpacity>
			</View>

			<Text style={styles.label}>Ступінь спорідненості</Text>
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
								{r.label}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>

			<FormInput
				label="ПІБ"
				value={guardian.fullName}
				onChangeText={v => onUpdate("fullName", v)}
				placeholder="Прізвище Ім'я По батькові"
				autoCapitalize="words"
			/>
			<FormInput
				label="Email"
				value={guardian.email}
				onChangeText={v => onUpdate("email", v)}
				placeholder="email@example.com"
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<FormInput
				label="Телефон"
				value={guardian.phone}
				onChangeText={v => onUpdate("phone", v)}
				placeholder="+380XXXXXXXXX"
				keyboardType="phone-pad"
			/>
		</View>
	)
}
