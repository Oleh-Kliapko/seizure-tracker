// components/ui/PickerItem.tsx

import { useAppTheme } from "@/hooks"
import { Text, TouchableOpacity } from "react-native"
import { createTimePickerModalStyles } from "./TimePickerModal.styles"

type Props = {
	value: number
	active: boolean
	onPress: () => void
}

export function PickerItem({ value, active, onPress }: Props) {
	const theme = useAppTheme()
	const styles = createTimePickerModalStyles(theme)

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={[styles.pickerItem, active && styles.pickerItemActive]}
		>
			<Text
				style={[styles.pickerItemText, active && styles.pickerItemTextActive]}
			>
				{String(value).padStart(2, "0")}
			</Text>
		</TouchableOpacity>
	)
}
