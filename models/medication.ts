// models/medication.ts

export type Medication = {
	id: string
	userId: string
	patientId: string

	name: string // назва ліків
	dose: string
	scheduledAt: number
	takenAt?: number
	isTaken: boolean

	sideEffects?: string
	notes?: string

	createdAt: number
	updatedAt: number
}
