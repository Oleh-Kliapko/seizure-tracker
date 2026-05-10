// components/history/ExportForm.tsx

import { ReportForm } from "@/components/report"
import { REPORT_COOLDOWN_DAYS } from "@/constants/commonConstants"
import { useTranslation } from "react-i18next"

type Props = {
	onExport: (from: number, to: number) => void
	onExportEmail: (from: number, to: number, email: string) => void
	isLoading: boolean
	error: string | null
	lastReportSentAt?: number
}

export function ExportForm(props: Props) {
	const { t } = useTranslation()
	return (
		<ReportForm
			title={t("history.exportTitle")}
			rules={[
				t("history.exportRule1"),
				t("history.exportRule2", { days: REPORT_COOLDOWN_DAYS }),
			]}
			{...props}
		/>
	)
}
