// app/(tabs)/seizures/view.tsx

import { CardVideoUpload } from "@/components/seizure/list/cards/CardVideoUpload"
import { ScreenHeader, ScreenWrapper } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import {
	EXTERNAL_TRIGGERS,
	INTERNAL_TRIGGERS,
	MOOD_EMOJI,
	SEIZURE_TYPES,
	SEVERITY_LABELS,
} from "@/constants/commonConstants"
import { useAppTheme, useSeizureView } from "@/hooks"
import { Seizure, SeizureSeverity } from "@/models"
import { formatDate, formatDurationSeconds, formatTime } from "@/utils/seizureFormatters"
import { Pencil, Trash2 } from "lucide-react-native"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"

export default function SeizureViewScreen() {
	const theme = useAppTheme()
	const { t } = useTranslation()
	const { seizure, isFetching, isDeleting, handleEdit, handleDelete, updateSeizure } =
		useSeizureView()

	const { colors, spacing, fontSize, fonts, radius } = theme

	const getTypeLabel = (s: Seizure): string => {
		const types = s.types?.length ? s.types : [(s as any).type ?? "tonic-clonic"]
		return types
			.map(type => {
				if (type === "custom") return s.customType ?? t("seizureType.custom")
				const found = SEIZURE_TYPES.find(item => item.value === type)
				return found ? t(found.labelKey) : type
			})
			.join(" + ")
	}

	const getTriggerLabel = (
		type: string,
		list: { labelKey: string; value: string }[],
	): string => {
		const found = list.find(item => item.value === type)
		return found ? t(found.labelKey) : type
	}

	const severityColor = (s: SeizureSeverity) => {
		if (s === 1) return colors.success
		if (s === 2) return colors.warning
		return colors.error
	}

	return (
		<ScreenWrapper>
			<ScreenHeader
				title={t("seizure.viewTitle")}
				right={
					<Button
						title=""
						icon={
							isDeleting
								? <ActivityIndicator size={spacing.lg} color={colors.error} />
								: <Trash2 size={spacing.lg} color={colors.error} />
						}
						onPress={handleDelete}
						disabled={isDeleting}
						variant="secondary"
						style={{ backgroundColor: "transparent", borderColor: "transparent", paddingHorizontal: spacing.sm }}
					/>
				}
			/>

			{isFetching || !seizure ? (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator color={colors.primary} size="large" />
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}
					showsVerticalScrollIndicator={false}
				>
					{/* Date & Duration */}
					<View style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, gap: spacing.xs }}>
						<Row label={t("seizure.startTime")} value={`${formatDate(seizure.startedAt)}, ${formatTime(seizure.startedAt)}`} theme={theme} />
						{!!seizure.durationSeconds && (
							<Row label={t("seizure.duration")} value={formatDurationSeconds(seizure.durationSeconds)} theme={theme} />
						)}
					</View>

					{/* Type */}
					<Section label={t("seizure.type")} theme={theme}>
						<Text style={{ fontFamily: fonts.bold, fontSize: fontSize.md, color: colors.onSurface }}>
							{getTypeLabel(seizure)}
						</Text>
					</Section>

					{/* Severity */}
					{seizure.severity !== undefined && (
						<Section label={t("seizure.severity")} theme={theme}>
							<View style={{
								alignSelf: "flex-start",
								backgroundColor: severityColor(seizure.severity) + "22",
								borderRadius: radius.full,
								paddingHorizontal: spacing.md,
								paddingVertical: spacing.xs,
							}}>
								<Text style={{ fontFamily: fonts.bold, fontSize: fontSize.sm, color: severityColor(seizure.severity) }}>
									{t(SEVERITY_LABELS[seizure.severity])}
								</Text>
							</View>
						</Section>
					)}

					{/* Mood */}
					{(seizure.moodBefore !== undefined || seizure.moodAfter !== undefined) && (
						<Section label={t("seizure.mood")} theme={theme}>
							<View style={{ flexDirection: "row", gap: spacing.md }}>
								{seizure.moodBefore !== undefined && (
									<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.lg, color: colors.onSurface }}>
										{MOOD_EMOJI[seizure.moodBefore]} {t("seizure.before")}
									</Text>
								)}
								{seizure.moodAfter !== undefined && (
									<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.lg, color: colors.onSurface }}>
										{MOOD_EMOJI[seizure.moodAfter]} {t("seizure.after")}
									</Text>
								)}
							</View>
						</Section>
					)}

					{/* Triggers */}
					{((seizure.internalTriggers?.length ?? 0) > 0 || (seizure.externalTriggers?.length ?? 0) > 0) && (
						<Section label={t("seizure.triggers")} theme={theme}>
							<View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
								{seizure.internalTriggers?.map((item, i) => (
									<Chip key={`int-${i}`} label={getTriggerLabel(item.type, INTERNAL_TRIGGERS)} theme={theme} />
								))}
								{seizure.externalTriggers?.map((item, i) => (
									<Chip key={`ext-${i}`} label={getTriggerLabel(item.type, EXTERNAL_TRIGGERS)} theme={theme} />
								))}
							</View>
						</Section>
					)}

					{/* Sleep */}
					{seizure.sleepHoursBefore !== undefined && (
						<Section label={t("seizure.sleepHours")} theme={theme}>
							<Text style={{ fontFamily: fonts.bold, fontSize: fontSize.md, color: colors.onSurface }}>
								{seizure.sleepHoursBefore} {t("common.hoursShort")}
							</Text>
						</Section>
					)}

					{/* Description */}
					{!!seizure.description && (
						<Section label={t("seizure.description")} theme={theme}>
							<Text style={{ fontFamily: fonts.regular, fontSize: fontSize.md, color: colors.onSurface, lineHeight: fontSize.md * 1.5 }}>
								{seizure.description}
							</Text>
						</Section>
					)}

					{/* Video */}
					<View style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md }}>
						<CardVideoUpload seizure={seizure} onVideoUpdated={updateSeizure} />
					</View>

					{/* Edit button */}
					<Button
						title={t("common.edit")}
						icon={<Pencil size={18} color={colors.onPrimary} />}
						onPress={handleEdit}
						variant="primary"
						style={{ marginTop: spacing.xs }}
					/>
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}

function Section({ label, children, theme }: { label: string; children: React.ReactNode; theme: ReturnType<typeof useAppTheme> }) {
	const { colors, spacing, fontSize, fonts, radius } = theme
	return (
		<View style={{ backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, gap: spacing.xs }}>
			<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.xs, color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 }}>
				{label}
			</Text>
			{children}
		</View>
	)
}

function Row({ label, value, theme }: { label: string; value: string; theme: ReturnType<typeof useAppTheme> }) {
	const { colors, fontSize, fonts, spacing } = theme
	return (
		<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.xs / 2 }}>
			<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.sm, color: colors.textSecondary }}>{label}</Text>
			<Text style={{ fontFamily: fonts.bold, fontSize: fontSize.sm, color: colors.onSurface }}>{value}</Text>
		</View>
	)
}

function Chip({ label, theme }: { label: string; theme: ReturnType<typeof useAppTheme> }) {
	const { colors, spacing, fontSize, fonts, radius } = theme
	return (
		<View style={{
			backgroundColor: colors.primary + "18",
			borderRadius: radius.full,
			paddingHorizontal: spacing.sm,
			paddingVertical: spacing.xs / 2,
		}}>
			<Text style={{ fontFamily: fonts.medium, fontSize: fontSize.xs, color: colors.primary }}>{label}</Text>
		</View>
	)
}
