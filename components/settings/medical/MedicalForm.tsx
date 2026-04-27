// components/settings/medical/MedicalForm.tsx
import { Divider } from "@/components/ui"
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
	onBlur: () => void
	error: string | null
}

export function MedicalForm(props: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const {
		month, year, bloodType, rhFactor, height, weight, anamnesis,
		onMonthChange, onYearChange,
		onBloodTypeChange, onRhFactorChange,
		onHeightChange, onWeightChange,
		onAnamnesisChange,
		onBlur,
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

			<Divider label="" />

			<BloodTypePicker
				bloodType={bloodType}
				rhFactor={rhFactor}
				onBloodTypeChange={onBloodTypeChange}
				onRhFactorChange={onRhFactorChange}
			/>

			<Divider label="" />

			<PhysicalInfo
				height={height}
				weight={weight}
				onHeightChange={onHeightChange}
				onWeightChange={onWeightChange}
				onBlur={onBlur}
			/>

			<Divider label="" />

			<AnamnesisInput value={anamnesis} onChange={onAnamnesisChange} onBlur={onBlur} />

			{error && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
			)}
		</View>
	)
}
