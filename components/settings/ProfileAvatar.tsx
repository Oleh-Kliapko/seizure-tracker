// components/settings/ProfileAvatar.tsx

import { useAppTheme } from "@/hooks"
import { Pencil, Trash2 } from "lucide-react-native"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	displayName: string
	email: string
	avatarUrl?: string
	isUploading?: boolean
	onEdit?: () => void
	onDelete?: () => void
}

export function ProfileAvatar({
	displayName = "User",
	email = "user@example.com",
	avatarUrl,
	isUploading = false,
	onEdit,
	onDelete,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const avatarLetter = displayName[0]?.toUpperCase() ?? "?"
	const hasAvatar = !!avatarUrl

	return (
		<View style={styles.avatarContainer}>
			<View style={styles.avatarWrapper}>
				{hasAvatar ? (
					<Image source={{ uri: avatarUrl }} style={styles.avatarIcon} />
				) : (
					<View style={styles.avatarIcon}>
						<Text style={styles.avatarTextFirstLetter}>{avatarLetter}</Text>
					</View>
				)}

				{isUploading && (
					<View
						style={[
							styles.avatarIcon,
							{
								position: "absolute",
								backgroundColor: "rgba(0,0,0,0.4)",
								justifyContent: "center",
								alignItems: "center",
							},
						]}
					>
						<ActivityIndicator color="#fff" />
					</View>
				)}

				<TouchableOpacity
					style={styles.avatarBtn}
					onPress={hasAvatar ? onDelete : onEdit}
					activeOpacity={0.7}
					disabled={isUploading}
				>
					{hasAvatar ? (
						<Trash2 size={14} color={theme.colors.error} />
					) : (
						<Pencil size={14} color={theme.colors.primary} />
					)}
				</TouchableOpacity>
			</View>

			<Text style={styles.avatarDisplayname}>{displayName}</Text>
			<Text style={styles.avatarTextEmail}>{email}</Text>
		</View>
	)
}
