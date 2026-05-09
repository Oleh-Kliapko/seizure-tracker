// hooks/useUser.ts

import { db } from "@/config/firebase"
import { User } from "@/models/user"
import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useAuth } from "./auth/useAuth"

export function useUser() {
	const { user } = useAuth()
	const [profile, setProfile] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!user) {
			setIsLoading(false)
			return
		}

		const unsubscribe = onSnapshot(doc(db, "users", user.uid), snap => {
			setProfile(snap.exists() ? (snap.data() as User) : null)
			setIsLoading(false)
		})

		return unsubscribe
	}, [user])

	return { profile, isLoading }
}
