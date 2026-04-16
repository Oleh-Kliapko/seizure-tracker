// components/settings/profile/PersonalForm.tsx

import { FormInput, PrimaryButton } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"

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
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()

	return (
		<View
			style={{
				shadowColor: "#000",
				shadowOpacity: 0.04,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 2 },
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				padding: spacing.lg,
			}}
		>
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

			<View style={{ height: 20, marginBottom: spacing.sm }}>
				{displayError && (
					<Text
						style={{
							color: colors.error,
							fontFamily: fonts.regular,
							fontSize: fontSize.sm - 2,
							textAlign: "center",
						}}
					>
						{displayError}
					</Text>
				)}
			</View>

			<PrimaryButton
				title={isLoading ? "Оновлення..." : "Оновити"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
