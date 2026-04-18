// components/settings/profile/PersonalForm.tsx

import { Button, FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"

type FormField = {
	label: string
	value: string
	onChange: (v: string) => void
	placeholder: string
	autoCapitalize?: "none" | "words" | "sentences" | "characters"
	keyboardType?: "default" | "phone-pad" | "email-address"
}

type Props = {
	fields: FormField[]
	onSave: () => void
	isLoading: boolean
	displayError: string | null
}

export function PersonalForm({
	fields,
	onSave,
	isLoading,
	displayError,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.card}>
			{fields.map(field => {
				const {
					label,
					value,
					onChange,
					placeholder,
					autoCapitalize,
					keyboardType,
				} = field

				return (
					<FormInput
						key={label}
						label={label}
						value={value}
						onChangeText={onChange}
						placeholder={placeholder}
						autoCapitalize={autoCapitalize ?? "sentences"}
						keyboardType={keyboardType ?? "default"}
					/>
				)
			})}

			<View style={styles.errorContainer}>
				{displayError && <Text style={styles.errorText}>{displayError}</Text>}
			</View>

			<Button
				title={isLoading ? "Оновлення..." : "Оновити"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
