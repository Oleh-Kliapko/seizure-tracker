// utils/trackingReport.ts

import i18n from "@/config/i18n"
import { EXTERNAL_TRIGGERS, INTERNAL_TRIGGERS } from "@/constants/commonConstants"
import { DailyTracking } from "@/models"
import { User } from "@/models/user"
import { buildHeaderHtml, buildPatientHtml, getPatientName } from "./reportShared"

// ─── Label helpers ────────────────────────────────────────────────────────────

function moodLabel(avg: number | null): string {
	if (avg === null) return "—"
	const rounded = Math.round(avg)
	return i18n.t(`report.mood${Math.min(Math.max(rounded, 1), 5)}`)
}

function activityLabel(val: number | null): string {
	if (val === null) return "—"
	return i18n.t(`report.activity${Math.min(Math.max(val, 1), 5)}`)
}

function sleepQLabel(avg: number | null): string {
	if (avg === null) return "—"
	const rounded = Math.round(avg)
	return i18n.t(`report.sleepQ${Math.min(Math.max(rounded, 1), 5)}`)
}

function triggerLabel(type: string, list: { labelKey: string; value: string }[]): string {
	const found = list.find(t => t.value === type)
	return found ? i18n.t(found.labelKey) : type
}

function pct(count: number, total: number): string {
	if (total === 0) return "—"
	return `${count} (${Math.round((count / total) * 100)}%)`
}

// ─── Stats computation ────────────────────────────────────────────────────────

function computeStats(records: DailyTracking[]) {
	const totalDays = records.length

	// Wellbeing
	const moodRecs = records.filter(r => r.mood !== undefined)
	const avgMood = moodRecs.length
		? moodRecs.reduce((s, r) => s + r.mood!, 0) / moodRecs.length
		: null

	const actRecs = records.filter(r => r.activityLevel !== undefined)
	const actFreq: Record<number, number> = {}
	actRecs.forEach(r => {
		actFreq[r.activityLevel!] = (actFreq[r.activityLevel!] ?? 0) + 1
	})
	const mostFreqActivity =
		Object.entries(actFreq).sort((a, b) => Number(b[1]) - Number(a[1]))[0]?.[0] ?? null

	// Vitals
	const tempRecs = records.filter(r => r.temperature !== undefined)
	const elevatedTemp = tempRecs.filter(r => r.temperature! > 37).length

	const pulseRecs = records.filter(r => r.pulse !== undefined)
	const elevatedPulse = pulseRecs.filter(r => r.pulse! > 100).length

	const bpRecs = records.filter(
		r => r.systolicPressure !== undefined || r.diastolicPressure !== undefined,
	)
	const elevatedBP = bpRecs.filter(
		r => (r.systolicPressure ?? 0) > 130 || (r.diastolicPressure ?? 0) > 85,
	).length

	const o2Recs = records.filter(r => r.oxygenSaturation !== undefined)
	const lowO2 = o2Recs.filter(r => r.oxygenSaturation! < 95).length

	// Sleep
	const sleepRecs = records.filter(r => r.sleepDuration !== undefined)
	const sleepDeprivation = sleepRecs.filter(r => r.sleepDuration! < 7).length

	const sleepQRecs = records.filter(r => r.sleepQuality !== undefined)
	const avgSleepQ = sleepQRecs.length
		? sleepQRecs.reduce((s, r) => s + r.sleepQuality!, 0) / sleepQRecs.length
		: null

	// Physiology — a day counts only if at least one of the two values is > 0
	const physiologyRecs = records.filter(
		r => (r.urinationCount ?? 0) > 0 || (r.bowelMovements ?? 0) > 0,
	)
	const insufficientUrination = physiologyRecs.filter(r => (r.urinationCount ?? 0) < 4).length
	const noBowels = physiologyRecs.filter(r => (r.bowelMovements ?? 0) === 0).length

	// Triggers
	const internalFreq: Record<string, number> = {}
	const externalFreq: Record<string, number> = {}
	records.forEach(r => {
		;(r.internalTriggers ?? []).forEach(t => {
			internalFreq[t.type] = (internalFreq[t.type] ?? 0) + 1
		})
		;(r.externalTriggers ?? []).forEach(t => {
			externalFreq[t.type] = (externalFreq[t.type] ?? 0) + 1
		})
	})
	const totalInternal = Object.values(internalFreq).reduce((s, v) => s + v, 0)
	const totalExternal = Object.values(externalFreq).reduce((s, v) => s + v, 0)
	const topInternal = Object.entries(internalFreq)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)
	const topExternal = Object.entries(externalFreq)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)

	return {
		totalDays,
		avgMood,
		mostFreqActivity: mostFreqActivity !== null ? Number(mostFreqActivity) : null,
		tempRecs: tempRecs.length,
		elevatedTemp,
		pulseRecs: pulseRecs.length,
		elevatedPulse,
		bpRecs: bpRecs.length,
		elevatedBP,
		o2Recs: o2Recs.length,
		lowO2,
		sleepRecs: sleepRecs.length,
		sleepDeprivation,
		sleepQRecs: sleepQRecs.length,
		avgSleepQ,
		physiologyRecs: physiologyRecs.length,
		insufficientUrination,
		noBowels,
		topInternal,
		topExternal,
		totalInternal,
		totalExternal,
	}
}

// ─── HTML row helpers ─────────────────────────────────────────────────────────

function statRow(label: string, value: string, warn = false): string {
	return `
  <div class="stat-row">
    <span class="stat-label">${label}</span>
    <span class="stat-value${warn ? " warn" : ""}">${value}</span>
  </div>`
}

function triggerRows(
	titleKey: string,
	entries: [string, number][],
	triggerList: { labelKey: string; value: string }[],
	total: number,
): string {
	if (entries.length === 0) {
		return `
  <div class="trigger-row">
    <div class="trigger-title">${i18n.t(titleKey)}</div>
    <div class="trigger-items">${i18n.t("report.noTriggers")}</div>
  </div>`
	}
	const items = entries
		.map(([type, count]) => {
			const p = total > 0 ? Math.round((count / total) * 100) : 0
			return `${triggerLabel(type, triggerList)} — ${count} (${p}%)`
		})
		.join(", ")
	return `
  <div class="trigger-row">
    <div class="trigger-title">${i18n.t(titleKey)}</div>
    <div class="trigger-items">${items}</div>
  </div>`
}

// ─── Main HTML template ───────────────────────────────────────────────────────

function buildTrackingHtml(
	user: User,
	patientName: string,
	records: DailyTracking[],
	from: number,
	to: number,
): string {
	const s = computeStats(records)
	const t = (key: string, opts?: Record<string, unknown>) => i18n.t(key, opts)

	return `<!DOCTYPE html>
<html lang="${i18n.language}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${t("tracking.reportTitle")}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Arial, sans-serif; font-size: 13px; color: #1F2937; padding: 32px 24px; }
    @page { margin: 16px; }

    .header { margin-bottom: 14px; border-bottom: 2px solid #0D9488; padding-bottom: 10px; }
    .header h1 { font-size: 18px; color: #0D9488; margin-bottom: 3px; }
    .header p { color: #6B7280; font-size: 11px; }

    .patient-info { margin-bottom: 14px; background: #F0FDFA; padding: 10px 12px; border-radius: 8px; }
    .patient-info h2 { font-size: 13px; margin-bottom: 6px; color: #0D9488; }
    .patient-row { display: flex; column-gap: 20px; row-gap: 3px; flex-wrap: wrap; }
    .patient-field { margin-bottom: 3px; }
    .patient-field span { color: #6B7280; }

    .section { margin-bottom: 12px; }
    .section-title { font-size: 13px; font-weight: bold; color: #0D9488; margin-bottom: 5px; padding-bottom: 3px; border-bottom: 1px solid #CCFBF1; }
    .section-subtitle { font-size: 11px; color: #9CA3AF; margin-bottom: 5px; }
    .stat-rows { display: flex; flex-direction: column; gap: 2px; }
    .stat-row { display: flex; justify-content: space-between; align-items: center; font-size: 12px; padding: 4px 10px; background: #F8FAFC; border-radius: 4px; }
    .stat-label { color: #374151; }
    .stat-value { color: #0D9488; font-weight: bold; }
    .stat-value.warn { color: #EF4444; }

    .trigger-row { font-size: 12px; padding: 4px 10px; background: #F8FAFC; border-radius: 4px; margin-bottom: 2px; }
    .trigger-title { color: #6B7280; font-size: 10px; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.4px; }
    .trigger-items { color: #374151; }

    .footer { text-align: center; color: #6B7280; font-size: 10px; border-top: 1px solid #E5E7EB; padding-top: 10px; margin-top: 16px; }
  </style>
</head>
<body>

  ${buildHeaderHtml(t("tracking.reportTitle"), from, to)}
  ${buildPatientHtml(user, patientName)}

  <!-- Wellbeing -->
  <div class="section">
    <div class="section-title">🧠 ${t("tracking.wellbeing")}</div>
    <div class="stat-rows">
      ${statRow(t("report.avgMood"), `${moodLabel(s.avgMood)}${s.avgMood !== null ? ` (${s.avgMood.toFixed(1)}/5)` : ""}`)}
      ${statRow(t("report.frequentActivity"), activityLabel(s.mostFreqActivity))}
    </div>
  </div>

  <!-- Physical indicators -->
  <div class="section">
    <div class="section-title">❤️ ${t("tracking.vitals")}</div>
    <div class="section-subtitle">${t("report.daysWithData")}: ${t("tracking.temperature")} — ${s.tempRecs} | ${t("tracking.pulse")} — ${s.pulseRecs} | ${t("report.pressure")} — ${s.bpRecs} | ${t("tracking.oxygen")} — ${s.o2Recs}</div>
    <div class="stat-rows">
      ${statRow(t("report.elevatedTemp"), pct(s.elevatedTemp, s.tempRecs), s.elevatedTemp > 0)}
      ${statRow(t("report.elevatedPulse"), pct(s.elevatedPulse, s.pulseRecs), s.elevatedPulse > 0)}
      ${statRow(t("report.elevatedBP"), pct(s.elevatedBP, s.bpRecs), s.elevatedBP > 0)}
      ${statRow(t("report.lowSaturation"), pct(s.lowO2, s.o2Recs), s.lowO2 > 0)}
    </div>
  </div>

  <!-- Sleep -->
  <div class="section">
    <div class="section-title">😴 ${t("tracking.sleep")}</div>
    <div class="section-subtitle">${t("report.daysWithData")}: ${s.sleepRecs}</div>
    <div class="stat-rows">
      ${statRow(t("report.sleepDeprivation"), pct(s.sleepDeprivation, s.sleepRecs), s.sleepDeprivation > 0)}
      ${statRow(t("report.avgSleepQuality"), `${sleepQLabel(s.avgSleepQ)}${s.avgSleepQ !== null ? ` (${s.avgSleepQ.toFixed(1)}/5)` : ""}`)}
    </div>
  </div>

  <!-- Physiology -->
  <div class="section">
    <div class="section-title">🚿 ${t("tracking.physiology")}</div>
    <div class="section-subtitle">${t("report.daysWithData")}: ${s.physiologyRecs}</div>
    <div class="stat-rows">
      ${statRow(t("report.insufficientUrination"), pct(s.insufficientUrination, s.physiologyRecs), s.insufficientUrination > 0)}
      ${statRow(t("report.noBowels"), pct(s.noBowels, s.physiologyRecs), s.noBowels > 0)}
    </div>
  </div>

  <!-- Triggers -->
  <div class="section">
    <div class="section-title">⚡ ${t("tracking.triggers")}</div>
    ${triggerRows("report.top3internal", s.topInternal, INTERNAL_TRIGGERS, s.totalInternal)}
    ${triggerRows("report.top3external", s.topExternal, EXTERNAL_TRIGGERS, s.totalExternal)}
  </div>

  <!-- Daily log placeholder -->
  <div class="section">
    <div class="section-title">📋 ${t("report.detailLog")}</div>
  </div>

  <div class="footer">
    <p>${t("report.footer")} • ${new Date().toLocaleString(i18n.language === "uk" ? "uk-UA" : "en-US")}</p>
  </div>
</body>
</html>`
}

export function generateTrackingReportHtml(
	user: User,
	records: DailyTracking[],
	from: number,
	to: number,
): string {
	const patientName = getPatientName(user)
	return buildTrackingHtml(user, patientName, records, from, to)
}
