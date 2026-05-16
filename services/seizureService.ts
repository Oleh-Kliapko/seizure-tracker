// services/seizureService.ts

import { db } from "@/config/firebase"
import { Seizure } from "@/models"
import {
	QueryDocumentSnapshot,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	updateDoc,
	where,
} from "firebase/firestore"

const seizuresCol = (userId: string) =>
	collection(db, "users", userId, "seizures")

// Створити новий приступ
export async function createSeizure(
	userId: string,
	data: Omit<Seizure, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
	const now = Date.now()
	const ref = await addDoc(seizuresCol(userId), {
		...data,
		createdAt: now,
		updatedAt: now,
	})
	return ref.id
}

// Отримати один приступ по ID
export async function getSeizureById(
	userId: string,
	seizureId: string,
): Promise<Seizure | null> {
	const snap = await getDoc(doc(seizuresCol(userId), seizureId))
	if (!snap.exists()) return null
	return { id: snap.id, ...snap.data() } as Seizure
}

// Отримати всі приступи користувача
export async function getSeizures(userId: string): Promise<Seizure[]> {
	const q = query(seizuresCol(userId), orderBy("startedAt", "desc"))
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Seizure)
}

// Отримати приступи за пацієнтом
export async function getSeizuresByPatient(
	userId: string,
	patientId: string,
): Promise<Seizure[]> {
	const q = query(
		seizuresCol(userId),
		where("patientId", "==", patientId),
		orderBy("startedAt", "desc"),
	)
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Seizure)
}

// Отримати приступи за період
export async function getSeizuresByPeriod(
	userId: string,
	from: number,
	to: number,
): Promise<Seizure[]> {
	const q = query(
		seizuresCol(userId),
		where("startedAt", ">=", from),
		where("startedAt", "<=", to),
		orderBy("startedAt", "desc"),
	)
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Seizure)
}

// Оновити приступ
export async function updateSeizure(
	userId: string,
	seizureId: string,
	data: Partial<Seizure> & { videoUrl?: string | null },
): Promise<void> {
	await updateDoc(doc(seizuresCol(userId), seizureId), {
		...data,
		updatedAt: Date.now(),
	})
}

// Останній приступ (limit 1)
export async function getLastSeizure(userId: string): Promise<Seizure | null> {
	const q = query(seizuresCol(userId), orderBy("startedAt", "desc"), limit(1))
	const snap = await getDocs(q)
	if (snap.empty) return null
	return { id: snap.docs[0].id, ...snap.docs[0].data() } as Seizure
}

// Приступи з певного моменту (для дашборду)
export async function getSeizuresSince(userId: string, from: number): Promise<Seizure[]> {
	const q = query(
		seizuresCol(userId),
		where("startedAt", ">=", from),
		orderBy("startedAt", "desc"),
	)
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Seizure)
}

// Сторінкове завантаження (cursor-based)
export async function getSeizuresBatch(
	userId: string,
	batchSize: number,
	after?: QueryDocumentSnapshot,
): Promise<{ seizures: Seizure[]; cursor: QueryDocumentSnapshot | null }> {
	const q = after
		? query(seizuresCol(userId), orderBy("startedAt", "desc"), startAfter(after), limit(batchSize))
		: query(seizuresCol(userId), orderBy("startedAt", "desc"), limit(batchSize))
	const snap = await getDocs(q)
	const seizures = snap.docs.map(d => ({ id: d.id, ...d.data() }) as Seizure)
	const cursor = snap.docs.length === batchSize ? (snap.docs[snap.docs.length - 1] as QueryDocumentSnapshot) : null
	return { seizures, cursor }
}

// Видалити приступ
export async function deleteSeizure(
	userId: string,
	seizureId: string,
): Promise<void> {
	await deleteDoc(doc(seizuresCol(userId), seizureId))
}
