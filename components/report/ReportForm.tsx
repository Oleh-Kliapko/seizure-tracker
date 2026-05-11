// components/report/ReportForm.tsx

import { Button } from "@/components/ui/Button"
import { useAppTheme, useAuth } from "@/hooks"
import { useReportForm } from "@/hooks/report/useReportForm"
import { FileDown, Mail } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Text, View } from "react-native"
import { getStyles } from "./getStyles"
import { ReportDateRange } from "./ReportDateRange"
import { ReportEmailModal } from "./ReportEmailModal"

type Props = {
	title: string
	rules: string[]
	onExport: (from: number, to: number) => void
	onExportEmail?: (from: number, to: number, email: string) => void
	isLoading: boolean
	error: string | null
	lastReportSentAt?: number
	showEmail?: boolean
}

export function ReportForm({
	title,
	rules,
	onExport,
	onExportEmail,
	isLoading,
	error,
	lastReportSentAt,
	showEmail = true,
}: Props) {
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
		daysUntilAvailable,
	} = useReportForm(user?.email, lastReportSentAt)

	const emailBtnTitle = isLoading ? t("report.sending") : t("report.sendEmail")

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.rulesList}>
				{rules.map((rule, i) => (
					<Text key={i} style={styles.subtitle}>
						{"• "}
						{rule}
					</Text>
				))}
			</View>

			<ReportDateRange
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
					title={isLoading ? t("report.generating") : t("report.exportPdf")}
					icon={<FileDown size={20} color="#fff" />}
					iconPosition="left"
					onPress={() => onExport(from, to)}
					disabled={isLoading}
				/>
				{showEmail && (
					<View>
						<Button
							title={emailBtnTitle}
							icon={<Mail size={20} color="#fff" />}
							iconPosition="left"
							onPress={() => setShowEmailModal(true)}
							disabled={isLoading || inCooldown}
						/>
						{inCooldown && (
							<Text style={styles.emailCooldownText}>
								{t("report.emailCooldownDays", { days: daysUntilAvailable })}
							</Text>
						)}
					</View>
				)}
			</View>

			{showEmail && (
				<ReportEmailModal
					visible={showEmailModal}
					isLoading={isLoading}
					initialEmail={email}
					onClose={() => setShowEmailModal(false)}
					onSend={emailAddr => {
						if (onExportEmail) onExportEmail(from, to, emailAddr)
						setShowEmailModal(false)
					}}
				/>
			)}
		</View>
	)
}
