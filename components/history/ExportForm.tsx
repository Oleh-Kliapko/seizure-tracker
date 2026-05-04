// components/history/ExportForm.tsx

import { Button } from "@/components/ui/Button"
import { REPORT_COOLDOWN_DAYS } from "@/constants/commonConstants"
import { useAppTheme, useAuth } from "@/hooks"
import { FileDown, Mail } from "lucide-react-native"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { ExportDateRange } from "./ExportDateRange"
import { ExportEmailModal } from "./ExportEmailModal"
import { getStyles } from "./getStyles"

type Props = {
	onExport: (from: number, to: number) => void
	onExportEmail: (from: number, to: number, email: string) => void
	isLoading: boolean
	error: string | null
}

export function ExportForm({ onExport, onExportEmail, isLoading, error }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const { user } = useAuth()

	const minFromDate = (() => {
		const d = new Date()
		d.setMonth(d.getMonth() - 5)
		d.setHours(0, 0, 0, 0)
		return d
	})()

	const [from, setFrom] = useState(() => minFromDate.getTime())
	const [to, setTo] = useState(() => {
		const d = new Date()
		d.setHours(23, 59, 59, 999)
		return d.getTime()
	})

	const [showEmailModal, setShowEmailModal] = useState(false)
	const [email, setEmail] = useState(user?.email || "")

	useEffect(() => {
		if (user?.email) setEmail(user.email)
	}, [user?.email])

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{t("history.exportTitle")}</Text>
			<View style={styles.rulesList}>
				<Text style={styles.subtitle}>{"• "}{t("history.exportRule1")}</Text>
				<Text style={styles.subtitle}>{"• "}{t("history.exportRule2", { days: REPORT_COOLDOWN_DAYS })}</Text>
			</View>

			<ExportDateRange
				from={from}
				to={to}
				minFromDate={minFromDate}
				onFromChange={setFrom}
				onToChange={setTo}
			/>

			<View style={styles.errorContainer}>
				{error && <Text style={styles.errorText}>{t(error)}</Text>}
			</View>

			<View style={styles.buttonsContainer}>
				<Button
					title={isLoading ? t("history.generating") : t("history.exportPdf")}
					icon={<FileDown size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => onExport(from, to)}
					disabled={isLoading}
				/>
				<Button
					title={isLoading ? t("history.sending") : t("history.sendEmail")}
					icon={<Mail size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => setShowEmailModal(true)}
					disabled={isLoading}
				/>
			</View>

			<ExportEmailModal
				visible={showEmailModal}
				isLoading={isLoading}
				initialEmail={email}
				onClose={() => setShowEmailModal(false)}
				onSend={(emailAddr) => {
					onExportEmail(from, to, emailAddr)
					setShowEmailModal(false)
				}}
			/>
		</View>
	)
}
