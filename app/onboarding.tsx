// app/onboarding.tsx

import {
	IllustrationPatterns,
	IllustrationReport,
	IllustrationSeizureLog,
	IllustrationTracking,
} from "@/components/onboarding"
import { useAppTheme, useOnboarding } from "@/hooks"
import { router } from "expo-router"
import { useTranslation } from "react-i18next"
import { useRef, useState } from "react"
import {
	Dimensions,
	FlatList,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

type SlideData = {
	key: string
	titleKey: string
	descKey: string
}

const SLIDES: SlideData[] = [
	{ key: "log", titleKey: "onboarding.slide1Title", descKey: "onboarding.slide1Desc" },
	{ key: "patterns", titleKey: "onboarding.slide2Title", descKey: "onboarding.slide2Desc" },
	{ key: "tracking", titleKey: "onboarding.slide3Title", descKey: "onboarding.slide3Desc" },
	{ key: "report", titleKey: "onboarding.slide4Title", descKey: "onboarding.slide4Desc" },
]

export default function OnboardingScreen() {
	const { t } = useTranslation()
	const theme = useAppTheme()
	const { completeOnboarding } = useOnboarding()
	const insets = useSafeAreaInsets()
	const [activeIndex, setActiveIndex] = useState(0)
	const listRef = useRef<FlatList>(null)

	const c = {
		primary: theme.colors.primary,
		surface: theme.colors.surface,
		border: theme.colors.border,
		error: theme.colors.error,
		warning: theme.colors.warning,
		success: theme.colors.success,
		textSecondary: theme.colors.textSecondary,
		onPrimary: theme.colors.onPrimary,
		background: theme.colors.background,
	}

	const illustrations: Record<string, React.ReactNode> = {
		log: <IllustrationSeizureLog c={c} />,
		patterns: <IllustrationPatterns c={c} />,
		tracking: <IllustrationTracking c={c} />,
		report: <IllustrationReport c={c} />,
	}

	const handleNext = () => {
		if (activeIndex < SLIDES.length - 1) {
			listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
		} else {
			handleStart()
		}
	}

	const handleStart = async () => {
		await completeOnboarding()
		router.replace("/(auth)/login")
	}

	const isLast = activeIndex === SLIDES.length - 1

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
			<StatusBar barStyle="dark-content" />

			{/* Skip button */}
			{!isLast && (
				<TouchableOpacity
					onPress={handleStart}
					activeOpacity={0.7}
					style={{
						position: "absolute",
						top: insets.top + 12,
						right: theme.spacing.lg,
						zIndex: 10,
						paddingHorizontal: theme.spacing.md,
						paddingVertical: theme.spacing.sm,
					}}
				>
					<Text style={{
						fontFamily: theme.fonts.medium,
						fontSize: theme.fontSize.sm,
						color: theme.colors.textSecondary,
					}}>
						{t("onboarding.skip")}
					</Text>
				</TouchableOpacity>
			)}

			{/* Slides */}
			<FlatList
				ref={listRef}
				data={SLIDES}
				keyExtractor={item => item.key}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				onMomentumScrollEnd={e => {
					const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH)
					setActiveIndex(index)
				}}
				renderItem={({ item }) => (
					<View style={{ width: SCREEN_WIDTH, paddingHorizontal: theme.spacing.lg }}>
						{/* Illustration */}
						<View style={{ marginTop: insets.top + 48, width: "100%" }}>
							{illustrations[item.key]}
						</View>

						{/* Text */}
						<View style={{ marginTop: theme.spacing.xl, alignItems: "center" }}>
							<Text style={{
								fontFamily: theme.fonts.bold,
								fontSize: theme.fontSize.xl,
								color: theme.colors.onSurface,
								textAlign: "center",
								marginBottom: theme.spacing.sm,
							}}>
								{t(item.titleKey)}
							</Text>
							<Text style={{
								fontFamily: theme.fonts.regular,
								fontSize: theme.fontSize.md,
								color: theme.colors.textSecondary,
								textAlign: "center",
								lineHeight: 24,
								paddingHorizontal: theme.spacing.sm,
							}}>
								{t(item.descKey)}
							</Text>
						</View>
					</View>
				)}
			/>

			{/* Bottom area: dots + button */}
			<View style={{
				paddingHorizontal: theme.spacing.lg,
				paddingBottom: insets.bottom + theme.spacing.lg,
			}}>
				{/* Dots */}
				<View style={{ flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: theme.spacing.lg }}>
					{SLIDES.map((_, i) => (
						<View
							key={i}
							style={{
								width: i === activeIndex ? 20 : 8,
								height: 8,
								borderRadius: theme.radius.full,
								backgroundColor: i === activeIndex
									? theme.colors.primary
									: theme.colors.border,
							}}
						/>
					))}
				</View>

				{/* Next / Start button */}
				<TouchableOpacity
					onPress={handleNext}
					activeOpacity={0.85}
					style={{
						backgroundColor: theme.colors.primary,
						borderRadius: theme.radius.full,
						paddingVertical: 16,
						alignItems: "center",
					}}
				>
					<Text style={{
						fontFamily: theme.fonts.medium,
						fontSize: theme.fontSize.md,
						color: theme.colors.onPrimary,
					}}>
						{isLast ? t("onboarding.start") : t("onboarding.next")}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
