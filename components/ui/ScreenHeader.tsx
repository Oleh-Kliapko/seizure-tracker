// components/ui/ScreenHeader.tsx

import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
	title: string
}

export function ScreenHeader({ title }: Props) {
	const { colors, fonts, fontSize, spacing } = useAppTheme()
	const insets = useSafeAreaInsets()

	return (
		<View
			style={[
				s.container,
				{
					paddingHorizontal: spacing.lg,
					paddingVertical: spacing.md,
					paddingTop: insets.top + spacing.sm,
				},
			]}
		>
			<TouchableOpacity
				onPress={() => router.back()}
				activeOpacity={0.7}
				style={s.backBtn}
			>
				<ArrowLeft size={24} color={colors.primary} />
			</TouchableOpacity>
			<Text
				style={{
					fontFamily: fonts.bold,
					fontSize: fontSize.lg,
					color: colors.onSurface,
				}}
			>
				{title}
			</Text>
			<View style={s.placeholder} />
		</View>
	)
}

const s = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	backBtn: {
		width: 40,
		height: 40,
		justifyContent: "center",
	},
	placeholder: {
		width: 40,
	},
})
