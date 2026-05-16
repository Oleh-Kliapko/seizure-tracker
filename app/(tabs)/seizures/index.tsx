// app/(tabs)/seizures/index.tsx

import {
	SeizureCard,
	SeizureFilters,
	SeizureListSkeleton,
	SeizurePagination,
} from "@/components/seizure/list"
import { getStyles } from "@/components/seizure/list/getStyles"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useSeizureList } from "@/hooks"
import { Seizure } from "@/models"
import { router, useLocalSearchParams } from "expo-router"
import { Plus, X } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { useCallback, useState } from "react"
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"

export default function SeizuresScreen() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const { date: dateParam } = useLocalSearchParams<{ date?: string }>()
	const dateFilter = dateParam || undefined
	const {
		paginated,
		filter,
		page,
		totalPages,
		isLoading,
		isLoadingMore,
		hasMore,
		handleFilterChange,
		setPage,
		updateSeizureInList,
		reload,
		loadMore,
	} = useSeizureList(dateFilter)

	const dateLabel = (() => {
		if (!dateFilter) return null
		const [yearStr, monthStr, dayStr] = dateFilter.split("-")
		return `${Number(dayStr)} ${t(`month.${Number(monthStr)}`)} ${yearStr}`
	})()

	const [refreshing, setRefreshing] = useState(false)
	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await reload()
		setRefreshing(false)
	}, [reload])

	const handleSeizurePress = (s: Seizure) => {
		// TODO: перейти на екран деталей
	}

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={t("seizure.listTitle")}
				showBackButton={false}
				right={
					<TouchableOpacity
						onPress={() => router.push("/(tabs)/seizures/add")}
						activeOpacity={0.7}
						style={{
							width: 36,
							height: 36,
							borderRadius: theme.radius.full,
							backgroundColor: theme.colors.primary,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Plus size={22} color={theme.colors.onPrimary} />
					</TouchableOpacity>
				}
			/>

			{isLoading && !refreshing ? (
				<SeizureListSkeleton />
			) : (
				<ScrollView
					contentContainerStyle={{ padding: theme.spacing.lg }}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
					}
				>
					{dateLabel && (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								backgroundColor: theme.colors.primary + "18",
								borderRadius: theme.radius.md,
								paddingHorizontal: theme.spacing.md,
								paddingVertical: theme.spacing.xs + 2,
								marginBottom: theme.spacing.sm,
							}}
						>
							<Text style={{ fontFamily: theme.fonts.medium, fontSize: theme.fontSize.sm, color: theme.colors.primary }}>
								{t("seizure.filteredByDate", { date: dateLabel })}
							</Text>
							<TouchableOpacity onPress={() => router.setParams({ date: "" })} activeOpacity={0.7} hitSlop={8}>
								<X size={16} color={theme.colors.primary} />
							</TouchableOpacity>
						</View>
					)}

					<SeizureFilters active={filter} onChange={handleFilterChange} />

					{paginated.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>{t("seizure.emptyTitle")}</Text>
							<Text style={styles.emptySubtext}>{t("seizure.emptyHint")}</Text>
						</View>
					) : (
						paginated.map(s => (
							<SeizureCard
								key={s.id}
								seizure={s}
								onPress={handleSeizurePress}
								onVideoUpdated={updateSeizureInList}
							/>
						))
					)}

					<SeizurePagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={setPage}
					/>

					{hasMore && page === totalPages && (
						<TouchableOpacity
							onPress={loadMore}
							disabled={isLoadingMore}
							activeOpacity={0.7}
							style={{
								marginTop: theme.spacing.sm,
								paddingVertical: theme.spacing.sm,
								borderRadius: theme.radius.md,
								borderWidth: 1,
								borderColor: theme.colors.border,
								alignItems: "center",
							}}
						>
							{isLoadingMore
								? <ActivityIndicator size="small" color={theme.colors.primary} />
								: <Text style={{ fontFamily: theme.fonts.medium, fontSize: theme.fontSize.sm, color: theme.colors.primary }}>
									{t("seizure.loadMore")}
								</Text>
							}
						</TouchableOpacity>
					)}
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}
