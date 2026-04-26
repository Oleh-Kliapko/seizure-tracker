// app/(tabs)/settings/medications/add.tsx

import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { FormInput } from "@/components/ui/FormInput"
import { useAppTheme, useMedicationForm } from "@/hooks"
import { router } from "expo-router"
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function AddMedicationScreen() {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const {
		name, setName,
		dose, setDose,
		scheduledTime, setScheduledTime,
		notes, setNotes,
		isSaving, error,
		handleSave,
	} = useMedicationForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Додати ліки" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg }}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					<View
						style={{
							backgroundColor: colors.surface,
							borderRadius: radius.md,
							padding: spacing.md,
							shadowColor: "#000",
							shadowOpacity: 0.04,
							shadowRadius: 6,
							shadowOffset: { width: 0, height: 2 },
						}}
					>
						<FormInput
							label="Назва препарату *"
							value={name}
							onChangeText={setName}
							placeholder="Наприклад: Карбамазепін"
							autoCapitalize="words"
						/>
						<FormInput
							label="Доза *"
							value={dose}
							onChangeText={setDose}
							placeholder="Наприклад: 200мг, 1 таблетка"
							autoCapitalize="none"
						/>
						<FormInput
							label="Час прийому"
							value={scheduledTime}
							onChangeText={setScheduledTime}
							placeholder="08:00"
							keyboardType="numbers-and-punctuation"
							autoCapitalize="none"
							maxLength={5}
						/>
						<FormInput
							label="Нотатки"
							value={notes}
							onChangeText={setNotes}
							placeholder="Додаткова інформація..."
							autoCapitalize="sentences"
							multiline
							numberOfLines={3}
						/>
					</View>

					<View style={{ height: 40, justifyContent: "center", marginTop: spacing.lg }}>
						{error && (
							<Text
								style={{
									fontFamily: fonts.regular,
									fontSize: fontSize.sm,
									color: colors.error,
									textAlign: "center",
								}}
							>
								{error}
							</Text>
						)}
					</View>

					<TouchableOpacity
						onPress={() => handleSave(() => router.back())}
						disabled={isSaving}
						activeOpacity={0.8}
						style={{
							backgroundColor: colors.primary,
							borderRadius: radius.md,
							paddingVertical: spacing.md,
							alignItems: "center",
							opacity: isSaving ? 0.7 : 1,
						}}
					>
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: "#fff" }}>
							{isSaving ? "Збереження..." : "Зберегти"}
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</ScreenWrapper>
	)
}
