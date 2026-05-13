// models/seizure.ts

export type SeizureType =
	| "tonic-clonic" // тоніко-клонічний
	| "absence" // абсанс
	| "myoclonic" // міоклонічний
	| "focal" // фокальний
	| "atonic" // атонічний
	| "custom" // власний тип

export type SeizureSeverity = 1 | 2 | 3 // 1 - легкий, 2 - середній, 3 - важкий

export type InternalTrigger =
	| "sleep-deprivation" // недосипання
	| "stress" // стрес
	| "alcohol" // алкоголь
	| "fever" // температура
	| "infection" // інфекція
	| "custom" // власний

export type ExternalTrigger =
	| "photosensitivity" // світлочутливість
	| "magnetic-storm" // магнітна буря
	| "pressure-change" // зміна атмосферного тиску
	| "weather-change" // зміна погоди
	| "custom" // власний

export type TriggerItem<T> = {
	type: T
	value?: number | string // для кількісних тригерів (наприклад, кількість годин сну), або для власних типів (custom)
}

export type Seizure = {
	id: string
	userId: string
	patientId: string //

	startedAt: number
	endedAt?: number

	types: SeizureType[] // типи судом (може бути декілька)
	severity?: SeizureSeverity // ступінь тяжкості
	customType?: string // якщо types включає "custom", то тут опис власного типу

	internalTriggers?: TriggerItem<InternalTrigger>[]
	externalTriggers?: TriggerItem<ExternalTrigger>[]

	sleepHoursBefore?: number // кількість годин сну перед судомами

	moodBefore?: number // 1-5 - настрій перед судомами
	moodAfter?: number // 1-5 - настрій після судом

	videoUrl?: string // посилання на відео з судомами (якщо є)
	cloudinaryPublicId?: string // public_id з Cloudinary для видалення
	description?: string // додаткові нотатки про судоми

	createdAt: number
	updatedAt: number
}
