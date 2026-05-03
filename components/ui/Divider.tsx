import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { createDividerStyles } from "./Divider.styles"

type Props = {
	label?: string
}

export function Divider({ label }: Props) {
	const theme = useAppTheme()
	const styles = createDividerStyles(theme)
	const { t } = useTranslation()
	const displayLabel = label ?? t("common.or")

	return (
		<View style={styles.wrapper}>
			<View style={styles.line} />
			{displayLabel && <Text style={styles.label}>{displayLabel}</Text>}
			<View style={styles.line} />
		</View>
	)
}
