import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { createDividerStyles } from "./Divider.styles"

type Props = {
	label?: string
}

export function Divider({ label = "або" }: Props) {
	const theme = useAppTheme()
	const styles = createDividerStyles(theme)

	return (
		<View style={styles.wrapper}>
			<View style={styles.line} />
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.line} />
		</View>
	)
}
