// components/settings/guardians/GuardiansList.tsx

import { Button } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Guardian } from "@/models/user"
import { UserPlus } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "../getStyles"
import { GuardianForm } from "./GuardianForm"

type Props = {
	guardians: Guardian[]
	onAdd: () => void
	onRemove: (index: number) => void
	onUpdate: (index: number, field: keyof Guardian, value: string) => void
	onSave: () => void
	isLoading: boolean
	error: string | null
}

export function GuardiansList({
	guardians,
	onAdd,
	onRemove,
	onUpdate,
	onSave,
	isLoading,
	error,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.card}>
			{guardians.map((guardian, index) => (
				<GuardianForm
					key={index}
					guardian={guardian}
					index={index}
					onUpdate={(field, value) => onUpdate(index, field, value)}
					onRemove={() => onRemove(index)}
				/>
			))}

			<TouchableOpacity
				style={styles.addBtn}
				onPress={onAdd}
				activeOpacity={0.7}
			>
				<UserPlus size={20} color={theme.colors.primary} />
				<Text style={styles.addBtnText}>Додати опікуна</Text>
			</TouchableOpacity>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{error}</Text>}
			</View>

			<Button
				title={isLoading ? "Збереження..." : "Зберегти"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
