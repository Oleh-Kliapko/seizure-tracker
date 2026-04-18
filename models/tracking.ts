// models/tracking.ts

import { ExternalTrigger, InternalTrigger, TriggerItem } from "./seizure"

export type DailyTracking = {
	id: string
	userId: string
	patientId: string
	date: number // timestamp початку дня (00:00:00) - але треба правило: date = startOfDayTimestamp

	// Фізичні показники
	temperature?: number // температура тіла
	pulse?: number // пульс
	systolicPressure?: number // систолічний тиск
	diastolicPressure?: number // діастолічний тиск
	oxygenSaturation?: number // сатурація кисню

	// Сон
	sleepDuration?: number // тривалість сну в годинах
	sleepQuality?: number // 1-5 - якість сну

	// Туалет
	lastUrination?: number // timestamp останнього сечовипускання
	urinationCount?: number // кількість сечовипускань
	lastBowelMovement?: number // timestamp останнього випорожнення
	bowelMovements?: number // кількість випорожнення

	// Тригери
	internalTriggers?: TriggerItem<InternalTrigger>[]
	externalTriggers?: TriggerItem<ExternalTrigger>[]

	// Ліки
	medications?: {
		medicationId: string
		takenAt?: number // timestamp приймання ліків
		isTaken: boolean // чи прийняті ліки
	}[]

	// Коментарі
	patientNotes?: string // нотатки пацієнта
	doctorNotes?: string // нотатки лікаря

	createdAt: number
	updatedAt: number
}
