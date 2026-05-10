// utils/reportShared.ts

import i18n from "@/config/i18n"
import { DOSE_UNIT_LABEL_KEYS, Medication } from "@/models/medication"
import { User } from "@/models/user"

export function formatReportDate(ts: number): string {
	const locale = i18n.language === "uk" ? "uk-UA" : "en-US"
	return new Date(ts).toLocaleDateString(locale, {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	})
}

export function getPatientName(user: User): string {
	return (
		[user.lastName, user.firstName, user.middleName].filter(Boolean).join(" ") ||
		user.displayName ||
		""
	)
}

export function buildHeaderHtml(title: string, from: number, to: number): string {
	return `
  <div class="header">
    <h1>SeizureTracker — ${title}</h1>
    <p>${i18n.t("report.period")}: ${formatReportDate(from)} — ${formatReportDate(to)}</p>
    <p>${i18n.t("report.generated")}: ${formatReportDate(Date.now())}</p>
  </div>`
}

export function buildPatientHtml(user: User, patientName: string): string {
	return `
  <div class="patient-info">
    <h2>${i18n.t("report.patientData")}</h2>
    <div class="patient-row">
      <div class="patient-field"><span>${i18n.t("report.fullName")}: </span><strong>${patientName}</strong></div>
      ${user.birthDate ? `<div class="patient-field"><span>${i18n.t("report.birthDate")}: </span>${formatReportDate(user.birthDate)}</div>` : ""}
      <div class="patient-field"><span>Email: </span>${user.email}</div>
      ${user.phone ? `<div class="patient-field"><span>${i18n.t("report.phone")}: </span>${user.phone}</div>` : ""}
      ${user.medicalInfo?.height ? `<div class="patient-field"><span>${i18n.t("report.height")}: </span>${user.medicalInfo.height} ${i18n.t("report.cm")}</div>` : ""}
      ${user.medicalInfo?.weight ? `<div class="patient-field"><span>${i18n.t("report.weight")}: </span>${user.medicalInfo.weight} ${i18n.t("report.kg")}</div>` : ""}
      ${user.medicalInfo?.anamnesis ? `<div class="patient-field"><span>${i18n.t("report.anamnesis")}: </span>${user.medicalInfo.anamnesis}</div>` : ""}
    </div>
  </div>`
}

export function buildMedicationsHtml(medications: Medication[]): string {
	if (medications.length === 0) {
		return `<p class="med-none">${i18n.t("report.medNone")}</p>`
	}
	const rows = medications
		.map((m, i) => {
			const dose = `${m.doseAmount} ${i18n.t(DOSE_UNIT_LABEL_KEYS[m.doseUnit])}`
			const schedule = m.scheduledTimes?.length ? m.scheduledTimes.join(", ") : "—"
			const started =
				m.startedAt && m.startedAt.month > 0 && m.startedAt.year > 0
					? `${i18n.t(`month.${m.startedAt.month}`)} ${m.startedAt.year}`
					: "—"
			const notes = m.notes?.trim() || "—"
			const rowBg = i % 2 === 1 ? ' style="background:#F8FAFC"' : ""
			return `
      <tr${rowBg}>
        <td><strong>${m.name}</strong></td>
        <td>${dose}</td>
        <td>${schedule}</td>
        <td>${started}</td>
        <td style="color:#6B7280">${notes}</td>
      </tr>`
		})
		.join("")

	return `
  <table class="med-table">
    <thead><tr>
      <th>${i18n.t("report.medColName")}</th>
      <th>${i18n.t("report.medColDose")}</th>
      <th>${i18n.t("report.medColSchedule")}</th>
      <th>${i18n.t("report.medColStarted")}</th>
      <th>${i18n.t("report.medColNotes")}</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`
}
