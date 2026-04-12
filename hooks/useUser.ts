// hooks/useUser.ts

import { User } from "@/models/user"
import { getUser } from "@/services"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

export function useUser() {
	const { user } = useAuth()
	const [profile, setProfile] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!user) {
			setIsLoading(false)
			return
		}

		getUser(user.uid)
			.then(setProfile)
			.finally(() => setIsLoading(false))
	}, [user])

	return { profile, isLoading }
}
