// components/settings/guardians/GuardiansList.tsx

import { useAppTheme } from "@/hooks"
import { Guardian } from "@/models/user"
import { UserPlus } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "../getStyles"
import { GuardianForm } from "./GuardianForm"

type Props = {
	guardians: Guardian[]
	onAdd: () => void
	onRemove: (index: number) => void
	onUpdate: (index: number, field: keyof Guardian, value: string) => void
	onBlur: () => void
	error: string | null
}

export function GuardiansList({
	guardians,
	onAdd,
	onRemove,
	onUpdate,
	onBlur,
	error,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.card}>
			{guardians.map((guardian, index) => (
				<GuardianForm
					key={index}
					guardian={guardian}
					index={index}
					onUpdate={(field, value) => onUpdate(index, field, value)}
					onRemove={() => onRemove(index)}
					onBlur={onBlur}
				/>
			))}

			<TouchableOpacity
				style={styles.addBtn}
				onPress={onAdd}
				activeOpacity={0.7}
			>
				<UserPlus size={20} color={theme.colors.primary} />
				<Text style={styles.addBtnText}>{t("guardians.addGuardian")}</Text>
			</TouchableOpacity>

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	)
}
