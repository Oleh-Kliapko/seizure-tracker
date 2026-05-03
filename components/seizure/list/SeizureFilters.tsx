// components/seizure/list/SeizureFilters.tsx

import { FILTERS, SeizureFilter } from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { ScrollView, Text, TouchableOpacity } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	active: SeizureFilter
	onChange: (v: SeizureFilter) => void
}

export function SeizureFilters({ active, onChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.filtersRow}
		>
			{FILTERS.map(f => (
				<TouchableOpacity
					key={f.value}
					style={[
						styles.filterChip,
						active === f.value && styles.filterChipActive,
					]}
					onPress={() => onChange(f.value)}
					activeOpacity={0.7}
				>
					<Text
						style={[
							styles.filterChipText,
							active === f.value && styles.filterChipTextActive,
						]}
					>
						{t(f.labelKey)}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	)
}
