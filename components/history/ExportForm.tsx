// components/history/ExportForm.tsx

import { Button } from "@/components/ui/Button"
import { REPORT_COOLDOWN_DAYS } from "@/constants/commonConstants"
import { useAppTheme, useAuth } from "@/hooks"
import { useExportForm } from "@/hooks/useExportForm"
import { FileDown, Mail } from "lucide-react-native"
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
	lastReportSentAt?: number
}

export function ExportForm({ onExport, onExportEmail, isLoading, error, lastReportSentAt }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const { user } = useAuth()

	const {
		minFromDate,
		from,
		to,
		setFrom,
		setTo,
		email,
		showEmailModal,
		setShowEmailModal,
		inCooldown,
		sentDateLabel,
	} = useExportForm(user?.email, lastReportSentAt)

	const emailBtnTitle = isLoading
		? t("history.sending")
		: inCooldown
			? t("history.emailSentOn", { date: sentDateLabel })
			: t("history.sendEmail")

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
					title={emailBtnTitle}
					icon={<Mail size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => setShowEmailModal(true)}
					disabled={isLoading || inCooldown}
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
