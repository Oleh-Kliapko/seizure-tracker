// services/trackingService.ts

import { db } from "@/config/firebase"
import { DailyTracking } from "@/models"
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore"

const trackingCol = (userId: string) =>
	collection(db, "users", userId, "tracking")

// Початок дня (00:00:00) для timestamp
export function startOfDay(timestamp: number): number {
	const d = new Date(timestamp)
	d.setHours(0, 0, 0, 0)
	return d.getTime()
}

function stripUndefined<T extends object>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(([, v]) => v !== undefined),
	) as Partial<T>
}

// Створити або оновити запис за день
export async function upsertTracking(
	userId: string,
	data: Omit<DailyTracking, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
	const now = Date.now()
	const dayStart = startOfDay(data.date)
	const cleanData = stripUndefined(data)

	// Перевіряємо чи є вже запис за цей день
	const q = query(
		trackingCol(userId),
		where("date", "==", dayStart),
		where("patientId", "==", data.patientId),
	)
	const snap = await getDocs(q)

	if (!snap.empty) {
		// Оновлюємо існуючий
		const existingId = snap.docs[0].id
		await updateDoc(doc(trackingCol(userId), existingId), {
			...cleanData,
			date: dayStart,
			updatedAt: now,
		})
		return existingId
	}

	// Створюємо новий
	const ref = await addDoc(trackingCol(userId), {
		...cleanData,
		date: dayStart,
		createdAt: now,
		updatedAt: now,
	})
	return ref.id
}

// Отримати всі записи
export async function getTrackingRecords(
	userId: string,
): Promise<DailyTracking[]> {
	const q = query(trackingCol(userId), orderBy("date", "desc"))
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as DailyTracking)
}

// Отримати запис за конкретний день
export async function getTrackingByDate(
	userId: string,
	patientId: string,
	date: number,
): Promise<DailyTracking | null> {
	const q = query(
		trackingCol(userId),
		where("date", "==", startOfDay(date)),
		where("patientId", "==", patientId),
	)
	const snap = await getDocs(q)
	if (snap.empty) return null
	const d = snap.docs[0]
	return { id: d.id, ...d.data() } as DailyTracking
}

// Отримати записи за період
export async function getTrackingByPeriod(
	userId: string,
	from: number,
	to: number,
): Promise<DailyTracking[]> {
	const q = query(
		trackingCol(userId),
		where("date", ">=", startOfDay(from)),
		where("date", "<=", startOfDay(to)),
		orderBy("date", "desc"),
	)
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as DailyTracking)
}

// Видалити запис
export async function deleteTracking(
	userId: string,
	trackingId: string,
): Promise<void> {
	await deleteDoc(doc(trackingCol(userId), trackingId))
}
