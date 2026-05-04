// components/ui/TimePickerModal.tsx

import { useAppTheme } from "@/hooks"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PickerItem } from "./PickerItem"
import { createTimePickerModalStyles, ITEM_H } from "./TimePickerModal.styles"

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = [0, 30]

type Props = {
	visible: boolean
	onClose: () => void
	onAdd: (time: string) => void
}

export function TimePickerModal({ visible, onClose, onAdd }: Props) {
	const theme = useAppTheme()
	const styles = createTimePickerModalStyles(theme)
	const insets = useSafeAreaInsets()
	const { t } = useTranslation()
	const [hour, setHour] = useState(8)
	const [minute, setMinute] = useState(0)

	const handleAdd = () => {
		onAdd(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)
		onClose()
	}

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.overlay}
				activeOpacity={1}
				onPress={onClose}
			/>
			<View
				style={[
					styles.sheet,
					{ paddingBottom: theme.spacing.lg + insets.bottom },
				]}
			>
				<Text style={styles.preview}>
					{String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
				</Text>

				<View style={styles.columnsRow}>
					<View style={styles.column}>
						<Text style={styles.columnLabel}>{t("common.hour")}</Text>
						<FlatList
							data={HOURS}
							keyExtractor={item => String(item)}
							style={styles.hourList}
							showsVerticalScrollIndicator={false}
							getItemLayout={(_, index) => ({
								length: ITEM_H,
								offset: ITEM_H * index,
								index,
							})}
							initialScrollIndex={hour > 2 ? hour - 2 : 0}
							renderItem={({ item }) => (
								<PickerItem
									value={item}
									active={item === hour}
									onPress={() => setHour(item)}
								/>
							)}
						/>
					</View>

					<Text style={styles.separator}>:</Text>

					<View style={styles.column}>
						<Text style={styles.columnLabel}>{t("common.minutes")}</Text>
						{MINUTES.map(m => (
							<PickerItem
								key={m}
								value={m}
								active={m === minute}
								onPress={() => setMinute(m)}
							/>
						))}
					</View>
				</View>

				<View style={styles.btnRow}>
					<TouchableOpacity
						onPress={onClose}
						activeOpacity={0.7}
						style={styles.cancelBtn}
					>
						<Text style={styles.cancelBtnText}>{t("common.cancel")}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleAdd}
						activeOpacity={0.8}
						style={styles.confirmBtn}
					>
						<Text style={styles.confirmBtnText}>{t("common.add")}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
