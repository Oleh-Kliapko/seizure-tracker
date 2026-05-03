// services/userService.ts

import { db } from "@/config/firebase"
import { User } from "@/models"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export async function createUser(uid: string, email: string, isEmailVerified = false): Promise<void> {
	const displayName = email.split("@")[0]

	const user: User = {
		uid,
		email,
		displayName,
		isEmailVerified,
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	await setDoc(doc(db, "users", uid), user)
}

export async function getUser(uid: string): Promise<User | null> {
	const snap = await getDoc(doc(db, "users", uid))
	return snap.exists() ? (snap.data() as User) : null
}

export async function updateUser(
	uid: string,
	data: Partial<User>,
): Promise<void> {
	await updateDoc(doc(db, "users", uid), {
		...data,
		updatedAt: new Date(),
	})
}
