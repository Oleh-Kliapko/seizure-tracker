// app/(tabs)/settings/medications/index.tsx

import { MedicationsList } from "@/components/settings/medications/MedicationsList"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme } from "@/hooks"
import { useMedicationsForm } from "@/hooks/useMedicationsForm"
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native"

export default function MedicationsScreen() {
	const { colors, spacing } = useAppTheme()
	const {
		entries,
		isLoading,
		isSaving,
		isSaved,
		error,
		addEntry,
		removeEntry,
		updateEntry,
		addEntryTime,
		removeEntryTime,
		handleSave,
	} = useMedicationsForm()

	return (
		<ScreenWrapper>
			<ScreenHeader title="Ліки" />

			{isLoading ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			) : (
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<ScrollView
						contentContainerStyle={{ padding: spacing.lg }}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<MedicationsList
							entries={entries}
							isSaving={isSaving}
							isSaved={isSaved}
							error={error}
							onAdd={addEntry}
							onRemove={removeEntry}
							onUpdate={updateEntry}
							onAddTime={addEntryTime}
							onRemoveTime={removeEntryTime}
							onSave={handleSave}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			)}
		</ScreenWrapper>
	)
}
