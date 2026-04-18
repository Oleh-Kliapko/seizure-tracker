// app/(tabs)/seizures/index.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { Plus } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

export default function SeizuresScreen() {
	const { colors, fonts, fontSize, spacing } = useAppTheme()

	return (
		<ScreenWrapper>
			<ScreenHeader
				title="Приступи"
				right={
					<TouchableOpacity
						onPress={() => router.push("/(tabs)/seizures/add")}
						activeOpacity={0.7}
						style={{
							width: 36,
							height: 36,
							borderRadius: 18,
							backgroundColor: colors.primary,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Plus size={22} color="#fff" />
					</TouchableOpacity>
				}
			/>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text
					style={{
						fontFamily: fonts.medium,
						fontSize: fontSize.lg,
						color: colors.textSecondary,
					}}
				>
					Приступів ще немає
				</Text>
				<Text
					style={{
						fontFamily: fonts.regular,
						fontSize: fontSize.md,
						color: colors.textSecondary,
						marginTop: spacing.xs,
					}}
				>
					Натисніть кнопку додавання справа вгорі
				</Text>
			</View>
		</ScreenWrapper>
	)
}
