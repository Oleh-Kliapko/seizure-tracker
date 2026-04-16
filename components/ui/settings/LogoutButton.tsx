import { useAppTheme } from "@/hooks"
import { LogOut } from "lucide-react-native"
import { Text, TouchableOpacity } from "react-native"
import { getStyles } from "./getStyles"

export function LogoutButton({ onPress }: { onPress: () => void }) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<TouchableOpacity
			style={styles.btnError}
			activeOpacity={0.7}
			onPress={onPress}
		>
			<LogOut size={theme.iconSize.md} color={theme.colors.error} />

			<Text style={styles.btnErrorText}>Вийти</Text>
		</TouchableOpacity>
	)
}
