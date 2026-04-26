// components/tracking/TrackingTriggers.tsx

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
} from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { ExternalTrigger, InternalTrigger, TriggerItem } from "@/models"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	internalTriggers: TriggerItem<InternalTrigger>[]
	externalTriggers: TriggerItem<ExternalTrigger>[]
	onToggleInternal: (v: InternalTrigger) => void
	onToggleExternal: (v: ExternalTrigger) => void
}

export function TrackingTriggers({
	internalTriggers,
	externalTriggers,
	onToggleInternal,
	onToggleExternal,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const isInternalActive = (v: InternalTrigger) =>
		internalTriggers.some(t => t.type === v)

	const isExternalActive = (v: ExternalTrigger) =>
		externalTriggers.some(t => t.type === v)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Тригери</Text>

			<Text style={styles.label}>Внутрішні</Text>
			<View style={[styles.triggerRow, { marginTop: theme.spacing.sm }]}>
				{INTERNAL_TRIGGERS.map(t => {
					const active = isInternalActive(t.value)
					return (
						<TouchableOpacity
							key={t.value}
							style={[styles.triggerChip, active && styles.triggerChipActive]}
							onPress={() => onToggleInternal(t.value)}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.triggerChipText,
									active && styles.triggerChipTextActive,
								]}
							>
								{t.label}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>

			<View style={styles.divider} />

			<Text style={styles.label}>Зовнішні</Text>
			<View style={[styles.triggerRow, { marginTop: theme.spacing.sm }]}>
				{EXTERNAL_TRIGGERS.map(t => {
					const active = isExternalActive(t.value)
					return (
						<TouchableOpacity
							key={t.value}
							style={[styles.triggerChip, active && styles.triggerChipActive]}
							onPress={() => onToggleExternal(t.value)}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.triggerChipText,
									active && styles.triggerChipTextActive,
								]}
							>
								{t.label}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}
