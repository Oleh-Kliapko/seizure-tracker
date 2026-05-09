// components/tracking/TrackingCalendar.tsx

import { useAppTheme } from "@/hooks"
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
	const { t } = useTranslation()
	const { viewYear, viewMonth, filledDates, prevMonth, nextMonth, isCurrentMonth } =
		useTrackingCalendar()

	const today = new Date()
	const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
	const days = getDaysInMonth(viewYear, viewMonth)
	const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("uk-UA", {
		month: "long",
		year: "numeric",
	})

	return (
		<View
			style={{
				backgroundColor: colors.surface,
				borderRadius: radius.lg,
				padding: spacing.lg,
				shadowColor: "#000",
				shadowOpacity: 0.04,
				shadowRadius: 6,
				shadowOffset: { width: 0, height: 2 },
			}}
		>
			{/* Month switcher */}
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.md }}>
				<TouchableOpacity onPress={prevMonth} activeOpacity={0.7} hitSlop={8}>
					<ChevronLeft size={22} color={colors.onSurface} />
				</TouchableOpacity>
				<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.md, color: colors.onSurface, textTransform: "capitalize" }}>
					{monthLabel}
				</Text>
				<TouchableOpacity onPress={nextMonth} activeOpacity={isCurrentMonth ? 0.3 : 0.7} hitSlop={8}>
					<ChevronRight size={22} color={isCurrentMonth ? colors.border : colors.onSurface} />
				</TouchableOpacity>
			</View>

			{/* Day names */}
			<View style={{ flexDirection: "row", marginBottom: spacing.sm }}>
				{DAY_NAME_KEYS.map(key => (
					<Text key={key} style={{ flex: 1, textAlign: "center", fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary }}>
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

					return (
						<TouchableOpacity
							key={dateKey}
							disabled={isFuture}
							onPress={() => router.push(`/(tabs)/tracking/${dateKey}` as any)}
							activeOpacity={0.7}
							style={{ width: "14.28%", aspectRatio: 1, padding: 2 }}
						>
							<View style={{
								flex: 1,
								borderRadius: radius.sm,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: isFilled ? colors.primary + "20" : isToday ? colors.primary + "10" : "transparent",
								borderWidth: isToday ? 1.5 : 0,
								borderColor: colors.primary,
							}}>
								<Text style={{
									fontFamily: isFilled || isToday ? fonts.medium : fonts.regular,
									fontSize: fontSize.sm,
									color: isFuture ? colors.border : isFilled ? colors.primary : colors.onSurface,
								}}>
									{day}
								</Text>
								{isFilled && (
									<View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary, marginTop: 1 }} />
								)}
							</View>
						</TouchableOpacity>
					)
				})}
			</View>
		</View>
	)
}
