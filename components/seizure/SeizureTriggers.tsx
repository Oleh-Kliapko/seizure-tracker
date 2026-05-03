// components/seizure/SeizureTriggers.tsx

import { useAppTheme } from "@/hooks"
import { ExternalTrigger, InternalTrigger, TriggerItem } from "@/models"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { getStyles } from "./getStyles"
import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
} from "../../constants/commonConstants"
import { Divider } from "../ui"

type Props = {
	internalTriggers: TriggerItem<InternalTrigger>[]
	externalTriggers: TriggerItem<ExternalTrigger>[]
	onToggleInternal: (v: InternalTrigger) => void
	onToggleExternal: (v: ExternalTrigger) => void
}

export function SeizureTriggers({
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
			<Text style={styles.sectionTitle}>{t('seizure.triggers')}</Text>

			<Text style={styles.label}>{t('seizure.internalTriggers')}</Text>
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

			<Divider label="" />

			<Text style={styles.label}>{t('seizure.externalTriggers')}</Text>
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
