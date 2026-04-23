// services/seizureService.ts

import { db } from "@/config/firebase"
import { Seizure } from "@/models"
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

// Видалити приступ
export async function deleteSeizure(
	userId: string,
	seizureId: string,
): Promise<void> {
	await deleteDoc(doc(seizuresCol(userId), seizureId))
}
