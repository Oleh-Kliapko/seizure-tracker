// backend/src/migrate.ts
// One-time migration: remove obsolete fields from Firestore documents
// Run: node --loader ts-node/esm src/migrate.ts

import dotenv from "dotenv"
dotenv.config()

import { cert, initializeApp } from "firebase-admin/app"
import { FieldValue, getFirestore } from "firebase-admin/firestore"

initializeApp({
	credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
})

const db = getFirestore()

async function removeFieldFromCollection(
	collectionPath: string,
	fields: string[],
): Promise<number> {
	const snapshot = await db.collection(collectionPath).get()
	if (snapshot.empty) return 0

	const batch = db.batch()
	const update = Object.fromEntries(fields.map(f => [f, FieldValue.delete()]))

	snapshot.docs.forEach(doc => {
		const data = doc.data()
		const hasAny = fields.some(f => f in data)
		if (hasAny) batch.update(doc.ref, update)
	})

	await batch.commit()
	return snapshot.docs.filter(d => fields.some(f => f in d.data())).length
}

async function run() {
	console.log("Starting migration...")

	// Get all user IDs
	const usersSnap = await db.collection("users").get()
	const userIds = usersSnap.docs.map(d => d.id)
	console.log(`Found ${userIds.length} user(s)`)

	let totalSeizures = 0
	let totalTracking = 0

	for (const uid of userIds) {
		// Remove isMedicationTaken from seizures
		const seizureCount = await removeFieldFromCollection(
			`users/${uid}/seizures`,
			["isMedicationTaken"],
		)
		totalSeizures += seizureCount

		// Remove triggers from tracking records
		const trackingCount = await removeFieldFromCollection(
			`users/${uid}/tracking`,
			["internalTriggers", "externalTriggers"],
		)
		totalTracking += trackingCount

		console.log(`  uid=${uid}: ${seizureCount} seizures, ${trackingCount} tracking records updated`)
	}

	console.log(`\nDone. Seizure docs updated: ${totalSeizures}, Tracking docs updated: ${totalTracking}`)
}

run().catch(err => {
	console.error("Migration failed:", err)
	process.exit(1)
})
