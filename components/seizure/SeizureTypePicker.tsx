// components/seizure/SeizureTypePicker.tsx

import { FormInput } from "@/components/ui"
import { SEIZURE_TYPES } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { SeizureType } from "@/models"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	value: SeizureType
	customType: string
	onChange: (v: SeizureType) => void
	onCustomChange: (v: string) => void
}

export function SeizureTypePicker({
	value,
	customType,
	onChange,
	onCustomChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Тип приступу</Text>

			{SEIZURE_TYPES.map(t => (
				<TouchableOpacity
					key={t.value}
					style={styles.typeOption}
					onPress={() => onChange(t.value)}
					activeOpacity={0.7}
				>
					<View
						style={[
							styles.radioCircle,
							value === t.value && styles.radioCircleActive,
						]}
					>
						{value === t.value && <View style={styles.radioDot} />}
					</View>
					<Text
						style={[
							styles.typeLabel,
							value === t.value && styles.typeLabelActive,
						]}
					>
						{t.label}
					</Text>
				</TouchableOpacity>
			))}

			{value === "custom" && (
				<FormInput
					label="Опишіть тип"
					value={customType}
					onChangeText={onCustomChange}
					placeholder="Введіть тип приступу"
				/>
			)}
		</View>
	)
}
