// components/settings/medical/MedicalForm.tsx
import { PrimaryButton } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { getStyles } from "../getStyles"
import { AnamnesisInput } from "./AnamnesisInput"
import { BloodTypePicker } from "./BloodTypePicker"
import { FirstSeizureDatePicker } from "./FirstSeizureDatePicker"
import { PhysicalInfo } from "./PhysicalInfo"

type Props = {
	month: number
	year: number
	bloodType: string
	rhFactor: string
	height: string
	weight: string
	anamnesis: string
	onMonthChange: (v: number) => void
	onYearChange: (v: number) => void
	onBloodTypeChange: (v: string) => void
	onRhFactorChange: (v: string) => void
	onHeightChange: (v: string) => void
	onWeightChange: (v: string) => void
	onAnamnesisChange: (v: string) => void
	onSave: () => void
	isLoading: boolean
	error: string | null
}

export function MedicalForm(props: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const {
		month,
		year,
		bloodType,
		rhFactor,
		height,
		weight,
		anamnesis,
		onMonthChange,
		onYearChange,
		onBloodTypeChange,
		onRhFactorChange,
		onHeightChange,
		onWeightChange,
		onAnamnesisChange,
		onSave,
		isLoading,
		error,
	} = props

	return (
		<View style={styles.card}>
			<FirstSeizureDatePicker
				month={month}
				year={year}
				onMonthChange={onMonthChange}
				onYearChange={onYearChange}
			/>

			<View style={styles.divider} />

			<BloodTypePicker
				bloodType={bloodType}
				rhFactor={rhFactor}
				onBloodTypeChange={onBloodTypeChange}
				onRhFactorChange={onRhFactorChange}
			/>

			<View style={styles.divider} />

			<PhysicalInfo
				height={height}
				weight={weight}
				onHeightChange={onHeightChange}
				onWeightChange={onWeightChange}
			/>

			<View style={styles.divider} />

			<AnamnesisInput value={anamnesis} onChange={onAnamnesisChange} />

			{error && <Text style={styles.errorText}>{error}</Text>}

			<PrimaryButton
				title={isLoading ? "Збереження..." : "Зберегти"}
				onPress={onSave}
				disabled={isLoading}
			/>
		</View>
	)
}
