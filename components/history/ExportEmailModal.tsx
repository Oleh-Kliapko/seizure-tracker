// components/history/ExportEmailModal.tsx

import { Button } from "@/components/ui/Button"
import { useAppTheme } from "@/hooks"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Modal, Text, TextInput, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	visible: boolean
	isLoading: boolean
	initialEmail: string
	onClose: () => void
	onSend: (email: string) => void
}

export function ExportEmailModal({ visible, isLoading, initialEmail, onClose, onSend }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()

	const [email, setEmail] = useState(initialEmail)

	useEffect(() => {
		setEmail(initialEmail)
	}, [initialEmail])

	return (
		<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalCard}>
					<Text style={styles.modalTitle}>{t("history.emailModalTitle")}</Text>
					<Text style={styles.modalDescription}>{t("history.emailModalDescription")}</Text>

					<TextInput
						style={styles.modalInput}
						placeholder={t("history.emailPlaceholder")}
						placeholderTextColor={theme.colors.textSecondary}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						editable={!isLoading}
					/>

					<View style={styles.modalButtonRow}>
						<Button
							title={t("common.cancel")}
							onPress={onClose}
							disabled={isLoading}
							style={{ flex: 1, paddingHorizontal: theme.spacing.sm }}
						/>
						<Button
							title={isLoading ? t("history.sending") : t("history.send")}
							onPress={() => {
								if (email.trim()) onSend(email)
							}}
							disabled={isLoading || !email.trim()}
							style={{ flex: 1, paddingHorizontal: theme.spacing.sm }}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}
