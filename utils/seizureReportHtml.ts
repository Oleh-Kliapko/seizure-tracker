import i18n from "@/config/i18n"
import { User } from "../models"
import { buildHeaderHtml, buildPatientHtml, formatReportDate as formatDate } from "./reportShared"

export const htmlReport = (
	user: User,
	from: number,
	to: number,
	_formatDate: (date: number) => string,
	stats: any,
	rowsWithVideo: string,
	rowsWithoutVideo: string,
	patientName: string,
	calendarHtml: string,
	medicationsHtml: string,
) => `<!DOCTYPE html>
<html lang="${i18n.language}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${i18n.t("report.title")}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #1F2937; padding: 48px 32px; }
    @page { margin: 24px; }

    .header { margin-bottom: 24px; border-bottom: 2px solid #4A90E2; padding-bottom: 16px; }
    .header h1 { font-size: 20px; color: #4A90E2; margin-bottom: 4px; }
    .header p { color: #6B7280; font-size: 11px; }

    .patient-info { margin-bottom: 24px; background: #F8FAFC; padding: 12px; border-radius: 8px; }
    .patient-info h2 { font-size: 14px; margin-bottom: 8px; color: #4A90E2; }
    .patient-row { display: flex; gap: 24px; flex-wrap: wrap; }
    .patient-field { margin-bottom: 4px; }
    .patient-field span { color: #6B7280; }

    .stats { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
    .stat-card { background: #F8FAFC; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 100px; text-align: center; }
    .stat-card .value { font-size: 24px; font-weight: bold; color: #4A90E2; }
    .stat-card .label { font-size: 10px; color: #6B7280; margin-top: 2px; }

    .triggers-section { margin-bottom: 24px; }
    .triggers-section h2 { font-size: 14px; margin-bottom: 8px; color: #4A90E2; }
    .triggers-section p { color: #6B7280; }

    .table-section { margin-bottom: 32px; }
    .table-section h3 { font-size: 13px; color: #4A90E2; margin-bottom: 12px; margin-top: 16px; }

    .data-table { width: 100%; margin-bottom: 24px; }
    .data-header, .data-row { display: grid; align-items: stretch; }
    .data-header { background: #4A90E2; color: white; font-size: 11px; }
    .data-header > div { padding: 8px; font-weight: bold; }
    .data-row {
      font-size: 11px;
      border-bottom: 1px solid #E5E7EB;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .data-row > div { padding: 7px 8px; word-wrap: break-word; overflow-wrap: break-word; }
    .data-row:nth-child(even) { background: #F8FAFC; }
    .data-row.with-qr-cell > div:last-child { text-align: center; }

    .cols-no-video { grid-template-columns: 75px 50px 75px 90px 75px 1.2fr 1.5fr; }
    .cols-with-video { grid-template-columns: 75px 50px 75px 90px 75px 1.2fr 1.5fr 70px; }

    .footer { text-align: center; color: #6B7280; font-size: 10px; border-top: 1px solid #E5E7EB; padding-top: 12px; }

    .medications-section { margin-bottom: 24px; }
    .medications-section h2 { font-size: 14px; margin-bottom: 10px; color: #4A90E2; }
    .med-table { width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; }
    .med-table thead tr { background: #4A90E2; }
    .med-table th { color: #fff; font-size: 11px; font-weight: bold; padding: 8px 10px; text-align: left; }
    .med-table td { font-size: 11px; padding: 7px 10px; border-bottom: 1px solid #E5E7EB; }
    .med-table td:first-child { min-width: 120px; }
    .med-none { color: #6B7280; font-size: 11px; }

    .calendar-page { page-break-before: always; padding-top: 50px; }
    .calendar-page h2 { font-size: 16px; color: #4A90E2; margin-bottom: 8px; }
    .legend { margin-bottom: 12px; font-size: 11px; color: #6B7280; }
    .legend-item { display: inline-block; margin-right: 16px; vertical-align: middle; }
    .legend-box { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 5px; }

    .months-grid { width: 100%; }
    .month-block { display: inline-block; width: 48%; margin-bottom: 24px; margin-right: 1%; page-break-inside: avoid; vertical-align: top; }
    .month-title { font-size: 13px; color: #1F2937; margin-bottom: 4px; text-align: center; font-weight: bold; }
    .month-stats { display: flex; gap: 4px; font-size: 9px; margin-bottom: 6px; flex-wrap: wrap; justify-content: space-between; }
    .month-stat { background: #F1F5F9; border-radius: 3px; padding: 2px 5px; color: #6B7280; }
    .pdf-trend-up { background: #FEE2E2; color: #EF4444; border-radius: 3px; padding: 2px 5px; }
    .pdf-trend-down { background: #D1FAE5; color: #10B981; border-radius: 3px; padding: 2px 5px; }

    table.calendar { width: 100%; border-collapse: separate; border-spacing: 1px; margin-bottom: 0; }
    table.calendar th { background: #F1F5F9; color: #9CA3AF; padding: 3px 0; text-align: center; font-size: 10px; font-weight: normal; border-radius: 3px; width: 14.28%; }

    .cal-num { font-size: 9px; color: #1F2937; text-align: center; padding: 0; margin: 0; line-height: 1; border: none; height: auto; }
    .cal-num-empty { border: none; padding: 0; margin: 0; height: auto; }

    .cal-cell { height: 20px; line-height: 20px; border: 1px solid #9CA3AF; border-radius: 4px; text-align: center; vertical-align: middle; background: #fff; padding: 0; }
    .cal-cell-empty { border: none; background: transparent; }

    .cal-count { font-size: 13px; font-weight: bold; line-height: 1; }

    .cal-severe { background: #7B1FA2 !important; border-color: #7B1FA2 !important; }
    .cal-severe .cal-count { color: #fff; }
    .cal-medium { background: #F06292 !important; border-color: #F06292 !important; }
    .cal-medium .cal-count { color: #fff; }
    .cal-light { background: #E6A817 !important; border-color: #E6A817 !important; }
    .cal-light .cal-count { color: #fff; }
  </style>
</head>
<body>
  ${buildHeaderHtml(i18n.t("report.title"), from, to)}
  ${buildPatientHtml(user, patientName)}

  <div class="medications-section">
    <h2>💊 ${i18n.t("report.medTitle")}</h2>
    ${medicationsHtml}
  </div>

  <div class="stats">
    <div class="stat-card">
      <div class="value">${stats.total}</div>
      <div class="label">${i18n.t("report.totalSeizures")}</div>
    </div>
    <div class="stat-card">
      <div class="value">${stats.avgDuration} ${i18n.t("report.minutes")}</div>
      <div class="label">${i18n.t("report.avgDuration")}</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #fddcde">${stats.light}</div>
      <div class="label">${i18n.t("report.light")}</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #fdc1c8">${stats.medium}</div>
      <div class="label">${i18n.t("report.medium")}</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #f8a3ad">${stats.severe}</div>
      <div class="label">${i18n.t("report.severe")}</div>
    </div>
  </div>

  <div class="triggers-section">
    <h2>${i18n.t("report.topTriggers")}</h2>
    <p>${stats.topTriggers}</p>
  </div>

  ${
		rowsWithVideo
			? `
  <div class="table-section">
    <h3>🎥 ${i18n.t("report.withVideo")}</h3>
    <div class="data-table">
      <div class="data-header cols-with-video">
        <div>${i18n.t("report.colDate")}</div>
        <div>${i18n.t("report.colTime")}</div>
        <div>${i18n.t("report.colDuration")}</div>
        <div>${i18n.t("report.colType")}</div>
        <div>${i18n.t("report.colSeverity")}</div>
        <div>${i18n.t("report.colTriggers")}</div>
        <div>${i18n.t("report.colDescription")}</div>
        <div>${i18n.t("report.colVideo")}</div>
      </div>
      ${rowsWithVideo}
    </div>
  </div>
  `
			: ""
	}

  ${
		rowsWithoutVideo
			? `
  <div class="table-section">
    <h3>${i18n.t("report.withoutVideo")}</h3>
    <div class="data-table">
      <div class="data-header cols-no-video">
        <div>${i18n.t("report.colDate")}</div>
        <div>${i18n.t("report.colTime")}</div>
        <div>${i18n.t("report.colDuration")}</div>
        <div>${i18n.t("report.colType")}</div>
        <div>${i18n.t("report.colSeverity")}</div>
        <div>${i18n.t("report.colTriggers")}</div>
        <div>${i18n.t("report.colDescription")}</div>
      </div>
      ${rowsWithoutVideo}
    </div>
  </div>
  `
			: ""
	}

  ${
		calendarHtml
			? `
  <div class="calendar-page">
    <h2>${i18n.t("report.calendarTitle", { from: formatDate(from), to: formatDate(to) })}</h2>
    <div class="legend">
      <span class="legend-item"><span class="legend-box" style="background:#7B1FA2"></span>${i18n.t("report.legendSevere")}</span>
      <span class="legend-item"><span class="legend-box" style="background:#F06292"></span>${i18n.t("report.legendMedium")}</span>
      <span class="legend-item"><span class="legend-box" style="background:#E6A817"></span>${i18n.t("report.legendLight")}</span>
      <span class="legend-item"><span style="font-size: 13px; font-weight: bold;">N</span> — ${i18n.t("report.legendCount")}</span>
    </div>
    <div class="months-grid">
      ${calendarHtml}
    </div>
  </div>
  `
			: ""
	}

</body>
</html>
  `
