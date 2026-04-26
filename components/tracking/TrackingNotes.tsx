// components/tracking/TrackingNotes.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	value: string
	onChange: (v: string) => void
}

export function TrackingNotes({ value, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Нотатки</Text>
			<TextInput
				style={styles.notesInput}
				value={value}
				onChangeText={onChange}
				placeholder="Як пройшов день..."
				placeholderTextColor={theme.colors.textSecondary}
				multiline
				numberOfLines={4}
			/>
		</View>
	)
}
