// models/medication.ts

export type Medication = {
	id: string
	userId: string
	patientId: string
	name: string
	dose: string
	scheduledTimes?: string[] // ["HH:MM", ...]
	notes?: string
	createdAt: number
	updatedAt: number
}
