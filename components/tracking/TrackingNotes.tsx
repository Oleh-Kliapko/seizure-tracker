// components/tracking/TrackingNotes.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
import { getStyles } from "./getStyles"

const MAX_LENGTH = 150

type Props = {
	patientNotes: string
	doctorNotes: string
	onPatientNotesChange: (v: string) => void
	onDoctorNotesChange: (v: string) => void
}

function NoteField({
	label,
	value,
	onChange,
	styles,
	theme,
}: {
	label: string
	value: string
	onChange: (v: string) => void
	styles: ReturnType<typeof getStyles>
	theme: ReturnType<typeof useAppTheme>
}) {
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 4,
				}}
			>
				<Text style={styles.label}>{label}</Text>
				<Text
					style={{
						fontFamily: theme.fonts.regular,
						fontSize: 10,
						color: theme.colors.textSecondary,
					}}
				>
					{value.length}/{MAX_LENGTH}
				</Text>
			</View>
			<TextInput
				style={styles.notesInput}
				value={value}
				onChangeText={onChange}
				placeholder="Нотатки..."
				placeholderTextColor={theme.colors.textSecondary}
				multiline
				numberOfLines={4}
				maxLength={MAX_LENGTH}
			/>
		</View>
	)
}

export function TrackingNotes({
	patientNotes,
	doctorNotes,
	onPatientNotesChange,
	onDoctorNotesChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Нотатки</Text>
			<NoteField
				label="Пацієнт"
				value={patientNotes}
				onChange={onPatientNotesChange}
				styles={styles}
				theme={theme}
			/>
			<View style={styles.divider} />
			<NoteField
				label="Лікар"
				value={doctorNotes}
				onChange={onDoctorNotesChange}
				styles={styles}
				theme={theme}
			/>
		</View>
	)
}
