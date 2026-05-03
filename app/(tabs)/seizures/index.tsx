// app/(tabs)/seizures/index.tsx

import {
	SeizureCard,
	SeizureFilters,
	SeizurePagination,
	SeizureStatsHeader,
} from "@/components/seizure/list"
import { getStyles } from "@/components/seizure/list/getStyles"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { useAppTheme, useSeizureList } from "@/hooks"
import { Seizure } from "@/models"
import { router } from "expo-router"
import { Plus } from "lucide-react-native"
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useTranslation } from "react-i18next"

export default function SeizuresScreen() {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const {
		seizures,
		paginated,
		filter,
		page,
		totalPages,
		isLoading,
		handleFilterChange,
		setPage,
	} = useSeizureList()

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
							borderRadius: 18,
							backgroundColor: theme.colors.primary,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Plus size={22} color="#fff" />
					</TouchableOpacity>
				}
			/>

			{isLoading ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator color={theme.colors.primary} size="large" />
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{ padding: theme.spacing.lg }}
					showsVerticalScrollIndicator={false}
				>
					<SeizureStatsHeader seizures={seizures} />
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
							/>
						))
					)}

					<SeizurePagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={setPage}
					/>
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}
