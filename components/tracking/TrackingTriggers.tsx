// components/tracking/TrackingTriggers.tsx

import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
} from "@/constants/commonConstants"
import { useAppTheme } from "@/hooks"
import { ExternalTrigger, InternalTrigger, TriggerItem } from "@/models"
import { useTranslation } from "react-i18next"
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
	const { t } = useTranslation()

	const isInternalActive = (v: InternalTrigger) =>
		internalTriggers.some(trigger => trigger.type === v)

	const isExternalActive = (v: ExternalTrigger) =>
		externalTriggers.some(trigger => trigger.type === v)

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("tracking.triggers")}</Text>

			<Text style={styles.label}>{t("tracking.internalTriggers")}</Text>
			<View style={[styles.triggerRow, { marginTop: theme.spacing.sm }]}>
				{INTERNAL_TRIGGERS.map(item => {
					const active = isInternalActive(item.value)
					return (
						<TouchableOpacity
							key={item.value}
							style={[styles.triggerChip, active && styles.triggerChipActive]}
							onPress={() => onToggleInternal(item.value)}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.triggerChipText,
									active && styles.triggerChipTextActive,
								]}
							>
								{t(item.labelKey)}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>

			<View style={styles.divider} />

			<Text style={styles.label}>{t("tracking.externalTriggers")}</Text>
			<View style={[styles.triggerRow, { marginTop: theme.spacing.sm }]}>
				{EXTERNAL_TRIGGERS.map(item => {
					const active = isExternalActive(item.value)
					return (
						<TouchableOpacity
							key={item.value}
							style={[styles.triggerChip, active && styles.triggerChipActive]}
							onPress={() => onToggleExternal(item.value)}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.triggerChipText,
									active && styles.triggerChipTextActive,
								]}
							>
								{t(item.labelKey)}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}
