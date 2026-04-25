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
) => `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Звіт про приступи</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12px; color: #1F2937; padding: 24px; }

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

    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { background: #4A90E2; color: white; padding: 8px; text-align: left; font-size: 11px; }
    td { padding: 7px 8px; border-bottom: 1px solid #E5E7EB; font-size: 11px; vertical-align: top; }
    tr:nth-child(even) { background: #F8FAFC; }

    .footer { text-align: center; color: #6B7280; font-size: 10px; border-top: 1px solid #E5E7EB; padding-top: 12px; }
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
      <div class="patient-field"><span>Email: </span>${user.email}</div>
      ${user.phone ? `<div class="patient-field"><span>Телефон: </span>${user.phone}</div>` : ""}
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
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Час</th>
          <th>Тривалість</th>
          <th>Тип</th>
          <th>Сила</th>
          <th>Тригери</th>
          <th>Опис</th>
          <th>Відео</th>
        </tr>
      </thead>
      <tbody>
        ${rowsWithVideo}
      </tbody>
    </table>
  </div>
  ` : ""}

  ${rowsWithoutVideo ? `
  <div class="table-section">
    <h3>Приступи без відеозаписів</h3>
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Час</th>
          <th>Тривалість</th>
          <th>Тип</th>
          <th>Сила</th>
          <th>Тригери</th>
          <th>Опис</th>
        </tr>
      </thead>
      <tbody>
        ${rowsWithoutVideo}
      </tbody>
    </table>
  </div>
  ` : ""}

  <div class="footer">
    <p>Сформовано додатком SeizureTracker • ${new Date().toLocaleString("uk-UA")}</p>
  </div>
</body>
</html>
  `
