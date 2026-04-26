// components/ui/TimePickerModal.tsx

import { useAppTheme } from "@/hooks"
import { useState } from "react"
import {
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = [0, 30]
const ITEM_H = 52

type Props = {
	visible: boolean
	onClose: () => void
	onAdd: (time: string) => void
}

export function TimePickerModal({ visible, onClose, onAdd }: Props) {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const insets = useSafeAreaInsets()
	const [hour, setHour] = useState(8)
	const [minute, setMinute] = useState(0)

	const handleAdd = () => {
		onAdd(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
		onClose()
	}

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
				}}
			>
				{/* Preview */}
				<Text
					style={{
						fontFamily: fonts.bold,
						fontSize: 40,
						color: colors.onSurface,
						textAlign: "center",
						letterSpacing: 2,
						marginBottom: spacing.lg,
					}}
				>
					{String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
				</Text>

				{/* Columns */}
				<View style={{ flexDirection: "row", gap: spacing.md }}>
					{/* Hours */}
					<View style={{ flex: 1 }}>
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.sm,
								color: colors.textSecondary,
								textAlign: "center",
								marginBottom: spacing.sm,
								textTransform: "uppercase",
								letterSpacing: 0.5,
							}}
						>
							Година
						</Text>
						<FlatList
							data={HOURS}
							keyExtractor={item => String(item)}
							style={{ height: ITEM_H * 5 }}
							showsVerticalScrollIndicator={false}
							getItemLayout={(_, index) => ({
								length: ITEM_H,
								offset: ITEM_H * index,
								index,
							})}
							initialScrollIndex={hour > 2 ? hour - 2 : 0}
							renderItem={({ item }) => {
								const active = item === hour
								return (
									<TouchableOpacity
										onPress={() => setHour(item)}
										activeOpacity={0.7}
										style={{
											height: ITEM_H,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: radius.sm,
											backgroundColor: active ? colors.primary : "transparent",
										}}
									>
										<Text
											style={{
												fontFamily: active ? fonts.bold : fonts.regular,
												fontSize: fontSize.xl,
												color: active ? "#fff" : colors.onSurface,
											}}
										>
											{String(item).padStart(2, "0")}
										</Text>
									</TouchableOpacity>
								)
							}}
						/>
					</View>

					{/* Separator */}
					<Text
						style={{
							fontFamily: fonts.bold,
							fontSize: 32,
							color: colors.textSecondary,
							alignSelf: "center",
							marginTop: spacing.xl,
						}}
					>
						:
					</Text>

					{/* Minutes */}
					<View style={{ flex: 1 }}>
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.sm,
								color: colors.textSecondary,
								textAlign: "center",
								marginBottom: spacing.sm,
								textTransform: "uppercase",
								letterSpacing: 0.5,
							}}
						>
							Хвилини
						</Text>
						{MINUTES.map(m => {
							const active = m === minute
							return (
								<TouchableOpacity
									key={m}
									onPress={() => setMinute(m)}
									activeOpacity={0.7}
									style={{
										height: ITEM_H,
										justifyContent: "center",
										alignItems: "center",
										borderRadius: radius.sm,
										backgroundColor: active ? colors.primary : "transparent",
									}}
								>
									<Text
										style={{
											fontFamily: active ? fonts.bold : fonts.regular,
											fontSize: fontSize.xl,
											color: active ? "#fff" : colors.onSurface,
										}}
									>
										{String(m).padStart(2, "0")}
									</Text>
								</TouchableOpacity>
							)
						})}
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
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.md,
								color: colors.onSurface,
							}}
						>
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
						<Text
							style={{
								fontFamily: fonts.medium,
								fontSize: fontSize.md,
								color: "#fff",
							}}
						>
							Додати
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
