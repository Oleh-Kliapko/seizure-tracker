// components/seizure/SeizureExtra.tsx

import { FormInput } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { VITAL_BOUNDS } from "@/utils"
import { useTranslation } from "react-i18next"
import { Alert, Text, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	sleepHoursBefore: number | undefined
	description: string
	onSleepHoursChange: (v: number | undefined) => void
	onDescriptionChange: (v: string) => void
}

export function SeizureExtra({
	sleepHoursBefore,
	description,
	onSleepHoursChange,
	onDescriptionChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("seizure.additional")}</Text>

			<FormInput
				label={t("seizure.sleepHours")}
				value={sleepHoursBefore !== undefined ? String(sleepHoursBefore) : ""}
				onChangeText={v => onSleepHoursChange(v ? Number(v) : undefined)}
				onBlur={() => {
					if (sleepHoursBefore === undefined) return
					const { min, max } = VITAL_BOUNDS.sleepHoursBefore
					if (sleepHoursBefore < min || sleepHoursBefore > max) {
						Alert.alert(t("common.error"), t("tracking.error.sleepDuration"))
						onSleepHoursChange(undefined)
					}
				}}
				placeholder="6"
				keyboardType="number-pad"
				maxLength={2}
			/>

			<View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Text style={styles.label}>{t("seizure.description")}</Text>
					<Text style={[styles.sublabel, { fontSize: 10 }]}>
						{description.length}/150
					</Text>
				</View>
				<FormInput
					value={description}
					onChangeText={onDescriptionChange}
					placeholder={t("seizure.descriptionPlaceholder")}
					multiline
					numberOfLines={4}
					maxLength={150}
					style={[styles.descriptionInput, { textAlignVertical: "top" }]}
				/>
			</View>
		</View>
	)
}
