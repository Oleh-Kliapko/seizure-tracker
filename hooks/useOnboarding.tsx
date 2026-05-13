// hooks/useOnboarding.tsx

import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const ONBOARDING_KEY = "@seizure_tracker:onboarding_done"

type OnboardingCtx = {
	hasSeenOnboarding: boolean
	isChecking: boolean
	completeOnboarding: () => Promise<void>
}

const OnboardingContext = createContext<OnboardingCtx>({
	hasSeenOnboarding: false,
	isChecking: true,
	completeOnboarding: async () => {},
})

export function OnboardingProvider({ children }: { children: ReactNode }) {
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
	const [isChecking, setIsChecking] = useState(true)

	useEffect(() => {
		AsyncStorage.getItem(ONBOARDING_KEY)
			.then(v => setHasSeenOnboarding(v === "true"))
			.catch(() => setHasSeenOnboarding(true))
			.finally(() => setIsChecking(false))
	}, [])

	const completeOnboarding = async () => {
		await AsyncStorage.setItem(ONBOARDING_KEY, "true")
		setHasSeenOnboarding(true)
	}

	return (
		<OnboardingContext.Provider value={{ hasSeenOnboarding, isChecking, completeOnboarding }}>
			{children}
		</OnboardingContext.Provider>
	)
}

export function useOnboarding() {
	return useContext(OnboardingContext)
}
