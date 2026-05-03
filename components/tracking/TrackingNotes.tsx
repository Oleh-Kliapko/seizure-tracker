// components/tracking/TrackingNotes.tsx

import { useAppTheme } from "@/hooks"
import { Text, TextInput, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"

const MAX_LENGTH = 150

type Props = {
	patientNotes: string
	doctorNotes: string
	onPatientNotesChange: (v: string) => void
	onDoctorNotesChange: (v: string) => void
	onSave: () => void
}

function NoteField({
	label,
	value,
	placeholder,
	onChange,
	onSave,
	styles,
	theme,
}: {
	label: string
	value: string
	placeholder: string
	onChange: (v: string) => void
	onSave: () => void
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
				onBlur={onSave}
				placeholder={placeholder}
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
	onSave,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t('tracking.notes')}</Text>
			<NoteField
				label={t('tracking.patientNotes')}
				value={patientNotes}
				placeholder={t('tracking.notesPlaceholder')}
				onChange={onPatientNotesChange}
				onSave={onSave}
				styles={styles}
				theme={theme}
			/>
			<View style={styles.divider} />
			<NoteField
				label={t('tracking.doctorNotes')}
				value={doctorNotes}
				placeholder={t('tracking.notesPlaceholder')}
				onChange={onDoctorNotesChange}
				onSave={onSave}
				styles={styles}
				theme={theme}
			/>
		</View>
	)
}
