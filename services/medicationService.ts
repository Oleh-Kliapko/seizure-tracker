// services/medicationService.ts

import { db } from "@/config/firebase"
import { Medication } from "@/models"
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

const medicationsCol = (userId: string) =>
	collection(db, "users", userId, "medications")

// Створити ліки
export async function createMedication(
	userId: string,
	data: Omit<Medication, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
	const now = Date.now()
	const ref = await addDoc(medicationsCol(userId), {
		...data,
		createdAt: now,
		updatedAt: now,
	})
	return ref.id
}

// Отримати всі ліки користувача
export async function getMedications(userId: string): Promise<Medication[]> {
	const q = query(medicationsCol(userId), orderBy("createdAt", "asc"))
	const snap = await getDocs(q)
	return snap.docs.map(d => ({ id: d.id, ...d.data() }) as Medication)
}

// Отримати ліки за пацієнтом
export async function getMedicationsByPatient(
	userId: string,
	patientId: string,
): Promise<Medication[]> {
	const q = query(medicationsCol(userId), where("patientId", "==", patientId))
	const snap = await getDocs(q)
	return snap.docs
		.map(d => ({ id: d.id, ...d.data() }) as Medication)
		.sort((a, b) => a.createdAt - b.createdAt)
}

// Оновити ліки
export async function updateMedication(
	userId: string,
	medicationId: string,
	data: Partial<Medication>,
): Promise<void> {
	await updateDoc(doc(medicationsCol(userId), medicationId), {
		...data,
		updatedAt: Date.now(),
	})
}

// Видалити ліки
export async function deleteMedication(
	userId: string,
	medicationId: string,
): Promise<void> {
	await deleteDoc(doc(medicationsCol(userId), medicationId))
}
