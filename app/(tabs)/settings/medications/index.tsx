// app/(tabs)/settings/medications/index.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useMedications } from "@/hooks"
import { Medication } from "@/models/medication"
import { router, useFocusEffect } from "expo-router"
import { Pill, Plus, Trash2 } from "lucide-react-native"
import { useCallback } from "react"
import {
	ActivityIndicator,
	Alert,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function MedicationsScreen() {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const { medications, isLoading, remove, reload } = useMedications()

	useFocusEffect(useCallback(() => { reload() }, [reload]))

	const handleDelete = (med: Medication) => {
		Alert.alert(
			"Видалити ліки?",
			`"${med.name}" буде видалено назавжди.`,
			[
				{ text: "Скасувати", style: "cancel" },
				{ text: "Видалити", style: "destructive", onPress: () => remove(med.id) },
			],
		)
	}

	return (
		<ScreenWrapper>
			<ScreenHeader
				title="Ліки"
				right={
					<TouchableOpacity
						onPress={() => router.push("/(tabs)/settings/medications/add")}
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

			{isLoading ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			) : medications.length === 0 ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
					<Pill size={48} color={colors.textSecondary} />
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.md,
							color: colors.textSecondary,
							marginTop: spacing.md,
							textAlign: "center",
						}}
					>
						Ліки ще не додані
					</Text>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: fontSize.sm,
							color: colors.textSecondary,
							marginTop: spacing.xs,
							textAlign: "center",
						}}
					>
						Натисніть + щоб додати перший препарат
					</Text>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
				>
					{medications.map(med => (
						<TouchableOpacity
							key={med.id}
							activeOpacity={0.7}
							onPress={() => router.push(`/(tabs)/settings/medications/${med.id}` as any)}
							style={{
								backgroundColor: colors.surface,
								borderRadius: radius.md,
								padding: spacing.md,
								marginBottom: spacing.sm,
								flexDirection: "row",
								alignItems: "center",
								shadowColor: "#000",
								shadowOpacity: 0.04,
								shadowRadius: 6,
								shadowOffset: { width: 0, height: 2 },
							}}
						>
							<View
								style={{
									width: 40,
									height: 40,
									borderRadius: radius.sm,
									backgroundColor: colors.background,
									justifyContent: "center",
									alignItems: "center",
									marginRight: spacing.md,
								}}
							>
								<Pill size={20} color={colors.primary} />
							</View>

							<View style={{ flex: 1 }}>
								<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: colors.onSurface }}>
									{med.name}
								</Text>
								<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 }}>
									{med.dose}{med.scheduledTime ? ` · ${med.scheduledTime}` : ""}
								</Text>
							</View>

							<TouchableOpacity
								onPress={() => handleDelete(med)}
								activeOpacity={0.7}
								hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
							>
								<Trash2 size={18} color={colors.error} />
							</TouchableOpacity>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}
