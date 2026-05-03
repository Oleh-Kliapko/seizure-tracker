// components/settings/medical/PhysicalInfo.tsx

import { FormInput } from "@/components/ui"
import { useTranslation } from "react-i18next"

type Props = {
	height: string
	weight: string
	onHeightChange: (v: string) => void
	onWeightChange: (v: string) => void
	onBlur: () => void
}

export function PhysicalInfo({
	height,
	weight,
	onHeightChange,
	onWeightChange,
	onBlur,
}: Props) {
	const { t } = useTranslation()

	return (
		<>
			<FormInput
				label={t('medical.height')}
				value={height}
				onChangeText={onHeightChange}
				onBlur={onBlur}
				placeholder={t('medical.heightPlaceholder')}
				keyboardType="number-pad"
				maxLength={3}
			/>
			<FormInput
				label={t('medical.weight')}
				value={weight}
				onChangeText={onWeightChange}
				onBlur={onBlur}
				placeholder={t('medical.weightPlaceholder')}
				keyboardType="number-pad"
				maxLength={3}
			/>
		</>
	)
}
