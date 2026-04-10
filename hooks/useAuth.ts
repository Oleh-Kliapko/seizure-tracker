// hooks/useAuth.ts

import { auth } from "@/config/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"

type AuthState = {
	user: User | null
	isLoading: boolean
}

export function useAuth(): AuthState {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUser(user)
			setIsLoading(false)
		})

		return unsubscribe
	}, [])

	return { user, isLoading }
}
