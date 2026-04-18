// components/settings/medical/PhysicalInfo.tsx

import { FormInput } from "@/components/ui"

type Props = {
	height: string
	weight: string
	onHeightChange: (v: string) => void
	onWeightChange: (v: string) => void
}

export function PhysicalInfo({
	height,
	weight,
	onHeightChange,
	onWeightChange,
}: Props) {
	return (
		<>
			<FormInput
				label="Ріст (см)"
				value={height}
				onChangeText={onHeightChange}
				placeholder="Наприклад: 175"
				keyboardType="number-pad"
				maxLength={3}
			/>
			<FormInput
				label="Вага (кг)"
				value={weight}
				onChangeText={onWeightChange}
				placeholder="Наприклад: 70"
				keyboardType="number-pad"
				maxLength={3}
			/>
		</>
	)
}
