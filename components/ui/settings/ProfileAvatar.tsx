// components/settings/ProfileAvatar.tsx

import { useAppTheme } from "@/hooks"
import { Pencil } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	displayName: string
	email: string
	onEdit?: () => void
}

export function ProfileAvatar({
	displayName = "User",
	email = "user@example.com",
	onEdit,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const avatarLetter = displayName[0]?.toUpperCase() ?? "?"

	return (
		<View style={styles.avatarContainer}>
			<View style={styles.avatarWrapper}>
				<View style={styles.avatarIcon}>
					<Text style={styles.avatarTextFirstLetter}>{avatarLetter}</Text>
				</View>

				<TouchableOpacity
					style={styles.avatarBtn}
					onPress={onEdit}
					activeOpacity={0.7}
				>
					<Pencil size={14} color={theme.colors.primary} />
				</TouchableOpacity>
			</View>

			<Text style={styles.avatarDisplayname}>{displayName}</Text>
			<Text style={styles.avatarTextEmail}>{email}</Text>
		</View>
	)
}
