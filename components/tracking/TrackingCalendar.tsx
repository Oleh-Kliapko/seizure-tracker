// components/tracking/TrackingCalendar.tsx

import { useAppTheme, useIsDarkTheme } from "@/hooks"
import { useTrackingCalendar } from "@/hooks/tracking/useTrackingCalendar"
import { getDaysInMonth } from "@/utils/historyHelpers"
import { router } from "expo-router"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { Text, TouchableOpacity, View } from "react-native"

const DAY_NAME_KEYS = [
	"history.dayMon",
	"history.dayTue",
	"history.dayWed",
	"history.dayThu",
	"history.dayFri",
	"history.daySat",
	"history.daySun",
]

function toDateKey(year: number, month: number, day: number): string {
	return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function TrackingCalendar() {
	const { colors, fonts, fontSize, spacing, radius } = useAppTheme()
	const isDark = useIsDarkTheme()
	const { t } = useTranslation()
	const {
		viewYear,
		viewMonth,
		filledDates,
		seizureDates,
		prevMonth,
		nextMonth,
		isCurrentMonth,
	} = useTrackingCalendar()

	const today = new Date()
	const todayKey = toDateKey(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
	)
	const days = getDaysInMonth(viewYear, viewMonth)
	const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
		"uk-UA",
		{
			month: "long",
			year: "numeric",
		},
	)

	const cardBg = isDark ? colors.surface : "#F2F3F6"

	return (
		<View
			style={{
				backgroundColor: cardBg,
				borderRadius: radius.lg,
				borderWidth: 1,
				borderColor: colors.border,
				padding: spacing.lg,
				shadowColor: "#000",
				shadowOpacity: 0.04,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 2 },
			}}
		>
			{/* Legend */}
			<View
				style={{
					flexDirection: "row",
					gap: spacing.lg,
					marginBottom: spacing.md,
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
					<View
						style={{
							width: 18,
							height: 18,
							borderRadius: radius.sm,
							backgroundColor: colors.primary + "50",
						}}
					/>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: 11,
							color: colors.textSecondary,
						}}
					>
						{t("tracking.legendTracked")}
					</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
					<View
						style={{
							width: 6,
							height: 6,
							borderRadius: 3,
							backgroundColor: colors.error,
						}}
					/>
					<Text
						style={{
							fontFamily: fonts.regular,
							fontSize: 11,
							color: colors.textSecondary,
						}}
					>
						{t("tracking.legendSeizure")}
					</Text>
				</View>
			</View>

			{/* Month switcher */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: spacing.md,
				}}
			>
				<TouchableOpacity onPress={prevMonth} activeOpacity={0.7} hitSlop={8} accessibilityLabel="Попередній місяць" accessibilityRole="button">
					<ChevronLeft size={22} color={colors.onSurface} />
				</TouchableOpacity>
				<Text
					style={{
						fontFamily: fonts.medium,
						fontSize: fontSize.md,
						color: colors.onSurface,
						textTransform: "capitalize",
					}}
				>
					{monthLabel}
				</Text>
				<TouchableOpacity
					onPress={nextMonth}
					activeOpacity={isCurrentMonth ? 0.3 : 0.7}
					hitSlop={8}
					accessibilityLabel="Наступний місяць"
					accessibilityRole="button"
				>
					<ChevronRight
						size={22}
						color={isCurrentMonth ? colors.border : colors.onSurface}
					/>
				</TouchableOpacity>
			</View>

			{/* Day names */}
			<View style={{ flexDirection: "row", marginBottom: spacing.sm }}>
				{DAY_NAME_KEYS.map(key => (
					<Text
						key={key}
						style={{
							flex: 1,
							textAlign: "center",
							fontFamily: fonts.regular,
							fontSize: 11,
							color: colors.textSecondary,
						}}
					>
						{t(key)}
					</Text>
				))}
			</View>

			{/* Days grid */}
			<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
				{days.map((day, i) => {
					if (!day) return <View key={`e-${i}`} style={{ width: "14.28%" }} />

					const dateKey = toDateKey(viewYear, viewMonth, day)
					const isFuture = dateKey > todayKey
					const isToday = dateKey === todayKey
					const isFilled = filledDates.has(dateKey)
					const hasSeizure = seizureDates.has(dateKey)

					return (
						<TouchableOpacity
							key={dateKey}
							disabled={isFuture}
							onPress={() => router.push(`/(tabs)/tracking/${dateKey}` as any)}
							activeOpacity={0.7}
							style={{ width: "14.28%", aspectRatio: 1, padding: 2 }}
						>
							<View
								style={{
									flex: 1,
									borderRadius: radius.sm,
									alignItems: "center",
									justifyContent: "flex-start",
									paddingTop: 4,
									backgroundColor: isFilled
										? colors.primary + "20"
										: isToday
											? colors.primary + "10"
											: "transparent",
									borderWidth: isToday ? 1.5 : 1,
									borderColor: isToday ? colors.primary : colors.border,
								}}
							>
								<Text
									style={{
										fontFamily:
											isFilled || isToday ? fonts.medium : fonts.regular,
										fontSize: fontSize.sm,
										color: isFuture
											? colors.border
											: isFilled
												? colors.primary
												: colors.onSurface,
									}}
								>
									{day}
								</Text>
								{hasSeizure && (
									<View
										style={{
											position: "absolute",
											bottom: 5,
											width: 5,
											height: 5,
											borderRadius: 3,
											backgroundColor: colors.error,
										}}
									/>
								)}
							</View>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}
