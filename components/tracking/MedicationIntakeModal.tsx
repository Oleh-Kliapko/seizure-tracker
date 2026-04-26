// components/tracking/MedicationIntakeModal.tsx

import { useAppTheme } from "@/hooks"
import { Medication } from "@/models/medication"
import { useState } from "react"
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
	visible: boolean
	medications: Medication[]
	onClose: () => void
	onAdd: (medicationId: string, amount: number) => void
}

export function MedicationIntakeModal({ visible, medications, onClose, onAdd }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const insets = useSafeAreaInsets()
	const [selectedId, setSelectedId] = useState(medications[0]?.id ?? "")
	const [amount, setAmount] = useState(1)

	const selected = medications.find(m => m.id === selectedId)

	const handleAdd = () => {
		if (!selectedId) return
		onAdd(selectedId, amount)
		setAmount(1)
		onClose()
	}

	const decrement = () => setAmount(prev => Math.max(0.5, prev - 0.5))
	const increment = () => setAmount(prev => prev + 0.5)

	const formatAmount = (v: number) =>
		v % 1 === 0 ? String(v) : v.toFixed(1)

	return (
		<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
			<TouchableOpacity
				style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
				activeOpacity={1}
				onPress={onClose}
			/>
			<View
				style={{
					backgroundColor: colors.surface,
					borderTopLeftRadius: radius.lg,
					borderTopRightRadius: radius.lg,
					paddingHorizontal: spacing.lg,
					paddingTop: spacing.lg,
					paddingBottom: spacing.lg + insets.bottom,
					maxHeight: "75%",
				}}
			>
				<Text
					style={{
						fontFamily: fonts.medium,
						fontSize: fontSize.sm,
						color: colors.textSecondary,
						textTransform: "uppercase",
						letterSpacing: 0.5,
						marginBottom: spacing.md,
					}}
				>
					Препарат
				</Text>

				<ScrollView
					style={{ maxHeight: 200 }}
					showsVerticalScrollIndicator={false}
				>
					{medications.map(med => {
						const active = med.id === selectedId
						return (
							<TouchableOpacity
								key={med.id}
								onPress={() => { setSelectedId(med.id); setAmount(med.doseAmount) }}
								activeOpacity={0.7}
								style={{
									flexDirection: "row",
									alignItems: "center",
									paddingVertical: spacing.sm,
									paddingHorizontal: spacing.md,
									borderRadius: radius.sm,
									backgroundColor: active ? colors.primary + "15" : "transparent",
									marginBottom: 4,
								}}
							>
								<View
									style={{
										width: 20,
										height: 20,
										borderRadius: 10,
										borderWidth: 2,
										borderColor: active ? colors.primary : colors.border,
										justifyContent: "center",
										alignItems: "center",
										marginRight: spacing.sm,
									}}
								>
									{active && (
										<View
											style={{
												width: 10,
												height: 10,
												borderRadius: 5,
												backgroundColor: colors.primary,
											}}
										/>
									)}
								</View>
								<View style={{ flex: 1 }}>
									<Text
										style={{
											fontFamily: active ? fonts.medium : fonts.regular,
											fontSize: fontSize.md,
											color: active ? colors.primary : colors.onSurface,
										}}
									>
										{med.name}
									</Text>
									<Text
										style={{
											fontFamily: fonts.regular,
											fontSize: fontSize.sm,
											color: colors.textSecondary,
										}}
									>
										доза: {med.doseAmount} {med.doseUnit}
									</Text>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>

				{/* Amount stepper */}
				<View
					style={{
						marginTop: spacing.lg,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text
						style={{
							fontFamily: fonts.medium,
							fontSize: fontSize.sm,
							color: colors.textSecondary,
							textTransform: "uppercase",
							letterSpacing: 0.5,
						}}
					>
						Кількість
					</Text>
					<View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
						<TouchableOpacity
							onPress={decrement}
							activeOpacity={0.7}
							style={{
								width: 36,
								height: 36,
								borderRadius: 18,
								borderWidth: 1,
								borderColor: colors.border,
								backgroundColor: colors.background,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text style={{ fontFamily: fonts.medium, fontSize: 20, color: colors.onSurface, lineHeight: 24 }}>−</Text>
						</TouchableOpacity>

						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.lg, color: colors.onSurface, minWidth: 60, textAlign: "center" }}>
							{formatAmount(amount)} {selected?.doseUnit ?? ""}
						</Text>

						<TouchableOpacity
							onPress={increment}
							activeOpacity={0.7}
							style={{
								width: 36,
								height: 36,
								borderRadius: 18,
								borderWidth: 1,
								borderColor: colors.border,
								backgroundColor: colors.background,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text style={{ fontFamily: fonts.medium, fontSize: 20, color: colors.onSurface, lineHeight: 24 }}>+</Text>
						</TouchableOpacity>
					</View>
				</View>

				{/* Buttons */}
				<View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.xl }}>
					<TouchableOpacity
						onPress={onClose}
						activeOpacity={0.7}
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: colors.border,
							borderRadius: radius.md,
							paddingVertical: spacing.md,
							alignItems: "center",
						}}
					>
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: colors.onSurface }}>
							Скасувати
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleAdd}
						activeOpacity={0.8}
						style={{
							flex: 1,
							backgroundColor: colors.primary,
							borderRadius: radius.md,
							paddingVertical: spacing.md,
							alignItems: "center",
						}}
					>
						<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: "#fff" }}>
							Записати
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
