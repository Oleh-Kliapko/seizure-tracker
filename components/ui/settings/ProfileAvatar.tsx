// components/settings/ProfileAvatar.tsx

import { useAppTheme } from "@/hooks"
import { Pencil } from "lucide-react-native"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

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
	const { colors, fonts, fontSize, spacing } = useAppTheme()

	const avatarLetter = displayName[0]?.toUpperCase() ?? "?"

	return (
		<View style={s.container}>
			<View style={s.avatarWrapper}>
				<View style={[s.avatar, { backgroundColor: colors.primary }]}>
					<Text style={{ fontFamily: fonts.bold, fontSize: 42, color: "#fff" }}>
						{avatarLetter}
					</Text>
				</View>

				<TouchableOpacity
					style={[
						s.editBtn,
						{ backgroundColor: colors.surface, borderColor: colors.border },
					]}
					onPress={onEdit}
					activeOpacity={0.7}
				>
					<Pencil size={14} color={colors.primary} />
				</TouchableOpacity>
			</View>

			<Text
				style={{
					fontFamily: fonts.bold,
					fontSize: 24,
					color: colors.onSurface,
					marginTop: spacing.md,
				}}
			>
				{displayName}
			</Text>
			<Text
				style={{
					fontFamily: fonts.regular,
					fontSize: fontSize.md,
					color: colors.textSecondary,
					marginTop: 4,
				}}
			>
				{email}
			</Text>
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		alignItems: "center",
		marginBottom: 64,
	},
	avatarWrapper: {
		position: "relative",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	editBtn: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
})
