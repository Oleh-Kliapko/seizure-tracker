// hooks/useOnboarding.tsx

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react"

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

	const completeOnboarding = useCallback(() => {
		setHasSeenOnboarding(true)
	}, [])

	const value = useMemo(
		() => ({ hasSeenOnboarding, completeOnboarding }),
		[hasSeenOnboarding, completeOnboarding],
	)

	return (
		<OnboardingContext.Provider value={value}>
			{children}
		</OnboardingContext.Provider>
	)
}

export function useOnboarding() {
	return useContext(OnboardingContext)
}
