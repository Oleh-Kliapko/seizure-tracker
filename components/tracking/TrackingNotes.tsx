// components/tracking/TrackingNotes.tsx

import { useAppTheme } from "@/hooks"
import { Check } from "lucide-react-native"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, TextInput, View } from "react-native"
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
}: {
	label: string
	value: string
	placeholder: string
	onChange: (v: string) => void
	onSave: () => void
}) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const isDirty = useRef(false)
	const [showCheck, setShowCheck] = useState(false)
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleChange = (text: string) => {
		isDirty.current = true
		onChange(text)
	}

	const handleBlur = () => {
		if (isDirty.current) {
			isDirty.current = false
			if (timerRef.current) clearTimeout(timerRef.current)
			setShowCheck(true)
			timerRef.current = setTimeout(() => setShowCheck(false), 2000)
		}
		onSave()
	}

	return (
		<View>
			<View style={styles.noteLabelRow}>
				<Text style={styles.label}>{label}</Text>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
					{showCheck && <Check size={13} color={theme.colors.success} />}
					<Text style={styles.noteCharCounter}>
						{value.length}/{MAX_LENGTH}
					</Text>
				</View>
			</View>
			<TextInput
				style={styles.notesInput}
				value={value}
				onChangeText={handleChange}
				onBlur={handleBlur}
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
			<Text style={styles.sectionTitle}>{t("tracking.notes")}</Text>
			<NoteField
				label={t("tracking.patientNotes")}
				value={patientNotes}
				placeholder={t("tracking.notesPlaceholder")}
				onChange={onPatientNotesChange}
				onSave={onSave}
			/>
			<View style={styles.divider} />
			<NoteField
				label={t("tracking.doctorNotes")}
				value={doctorNotes}
				placeholder={t("tracking.notesPlaceholder")}
				onChange={onDoctorNotesChange}
				onSave={onSave}
			/>
		</View>
	)
}
