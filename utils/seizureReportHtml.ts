import { User } from "../models"

export const htmlReport = (
	user: User,
	from: number,
	to: number,
	formatDate: (date: number) => string,
	stats: any,
	rowsWithVideo: string,
	rowsWithoutVideo: string,
	patientName: string,
	calendarHtml: string,
) => `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Звіт про приступи</title>
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

    .calendar-page { page-break-before: always; padding-top: 50px; }
    .calendar-page h2 { font-size: 16px; color: #4A90E2; margin-bottom: 20px; }
    .legend { margin-bottom: 28px; font-size: 11px; color: #6B7280; }
    .legend-item { display: inline-block; margin-right: 16px; vertical-align: middle; }
    .legend-box { display: inline-block; width: 12px; height: 12px; border-radius: 3px; vertical-align: middle; margin-right: 5px; }

    .months-grid { width: 100%; }
    .month-block { display: inline-block; width: 48%; margin-bottom: 24px; margin-right: 1%; page-break-inside: avoid; vertical-align: top; }
    .month-title { font-size: 13px; color: #1F2937; margin-bottom: 4px; text-align: center; font-weight: bold; }

    table.calendar { width: 100%; border-collapse: separate; border-spacing: 1px; margin-bottom: 0; }
    table.calendar th { background: #F1F5F9; color: #9CA3AF; padding: 3px 0; text-align: center; font-size: 10px; font-weight: normal; border-radius: 3px; width: 14.28%; }

    .cal-num { font-size: 9px; color: #1F2937; text-align: center; padding: 0; margin: 0; line-height: 1; border: none; height: auto; }
    .cal-num-empty { border: none; padding: 0; margin: 0; height: auto; }

    .cal-cell { height: 22px; line-height: 22px; border: 1px solid #9CA3AF; border-radius: 4px; text-align: center; vertical-align: middle; background: #fff; padding: 0; }
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
  <div class="header">
    <h1>SeizureTracker — Звіт про приступи</h1>
    <p>Період: ${formatDate(from)} — ${formatDate(to)}</p>
    <p>Дата формування: ${formatDate(Date.now())}</p>
  </div>

  <div class="patient-info">
    <h2>Дані пацієнта</h2>
    <div class="patient-row">
      <div class="patient-field"><span>ПІБ: </span><strong>${patientName}</strong></div>
      ${user.birthDate ? `<div class="patient-field"><span>Дата народження: </span>${formatDate(user.birthDate)}</div>` : ""}
      <div class="patient-field"><span>Email: </span>${user.email}</div>
      ${user.phone ? `<div class="patient-field"><span>Телефон: </span>${user.phone}</div>` : ""}
      ${user.medicalInfo?.height ? `<div class="patient-field"><span>Зріст: </span>${user.medicalInfo.height} см</div>` : ""}
      ${user.medicalInfo?.weight ? `<div class="patient-field"><span>Вага: </span>${user.medicalInfo.weight} кг</div>` : ""}
      ${user.medicalInfo?.anamnesis ? `<div class="patient-field"><span>Анамнез: </span>${user.medicalInfo.anamnesis}</div>` : ""}
    </div>
  </div>

  <div class="stats">
    <div class="stat-card">
      <div class="value">${stats.total}</div>
      <div class="label">Всього приступів</div>
    </div>
    <div class="stat-card">
      <div class="value">${stats.avgDuration} хв</div>
      <div class="label">Середня тривалість</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #fddcde">${stats.light}</div>
      <div class="label">Легких</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #fdc1c8">${stats.medium}</div>
      <div class="label">Середніх</div>
    </div>
    <div class="stat-card">
      <div class="value" style="color: #f8a3ad">${stats.severe}</div>
      <div class="label">Важких</div>
    </div>
  </div>

  <div class="triggers-section">
    <h2>Найчастіші тригери</h2>
    <p>${stats.topTriggers}</p>
  </div>

  ${rowsWithVideo ? `
  <div class="table-section">
    <h3>🎥 Приступи з відеозаписом</h3>
    <div class="data-table">
      <div class="data-header cols-with-video">
        <div>Дата</div>
        <div>Час</div>
        <div>Тривалість</div>
        <div>Тип</div>
        <div>Сила</div>
        <div>Тригери</div>
        <div>Опис</div>
        <div>Відео</div>
      </div>
      ${rowsWithVideo}
    </div>
  </div>
  ` : ""}

  ${rowsWithoutVideo ? `
  <div class="table-section">
    <h3>Приступи без відеозаписів</h3>
    <div class="data-table">
      <div class="data-header cols-no-video">
        <div>Дата</div>
        <div>Час</div>
        <div>Тривалість</div>
        <div>Тип</div>
        <div>Сила</div>
        <div>Тригери</div>
        <div>Опис</div>
      </div>
      ${rowsWithoutVideo}
    </div>
  </div>
  ` : ""}

  ${calendarHtml ? `
  <div class="calendar-page">
    <h2>Календар приступів за період з ${formatDate(from)} по ${formatDate(to)}</h2>
    <div class="legend">
      <span class="legend-item"><span class="legend-box" style="background:#7B1FA2"></span>Важкий</span>
      <span class="legend-item"><span class="legend-box" style="background:#F06292"></span>Середній</span>
      <span class="legend-item"><span class="legend-box" style="background:#E6A817"></span>Легкий / не визначено</span>
      <span class="legend-item"><span style="font-size: 13px; font-weight: bold;">N</span> — кількість приступів за день</span>
    </div>
    <div class="months-grid">
      ${calendarHtml}
    </div>
  </div>
  ` : ""}

  <div class="footer">
    <p>Сформовано додатком SeizureTracker • ${new Date().toLocaleString("uk-UA")}</p>
  </div>
</body>
</html>
  `
