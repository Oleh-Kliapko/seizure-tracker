// hooks/useOnboarding.tsx

import { createContext, ReactNode, useContext, useState } from "react"

type OnboardingCtx = {
	hasSeenOnboarding: boolean
	completeOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingCtx>({
	hasSeenOnboarding: false,
	completeOnboarding: () => {},
})

export function OnboardingProvider({ children }: { children: ReactNode }) {
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

	const completeOnboarding = () => {
		setHasSeenOnboarding(true)
	}

	return (
		<OnboardingContext.Provider value={{ hasSeenOnboarding, completeOnboarding }}>
			{children}
		</OnboardingContext.Provider>
	)
}

export function useOnboarding() {
	return useContext(OnboardingContext)
}
