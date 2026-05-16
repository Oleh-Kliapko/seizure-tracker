import { SkeletonBox } from "@/components/ui/SkeletonBox"
import { useAppTheme } from "@/hooks"
import { View } from "react-native"

export function DashboardSkeleton() {
	const { spacing, radius } = useAppTheme()

	return (
		<View style={{ padding: spacing.lg, paddingTop: spacing.sm, gap: spacing.md }}>
			{/* Hero card */}
			<SkeletonBox height={110} borderRadius={radius.lg} />

			{/* Stats 2x2 */}
			<View style={{ flexDirection: "row", gap: spacing.md }}>
				<SkeletonBox width="48%" height={80} borderRadius={radius.lg} />
				<SkeletonBox width="48%" height={80} borderRadius={radius.lg} />
			</View>
			<View style={{ flexDirection: "row", gap: spacing.md }}>
				<SkeletonBox width="48%" height={80} borderRadius={radius.lg} />
				<SkeletonBox width="48%" height={80} borderRadius={radius.lg} />
			</View>

			{/* Heatmap card */}
			<SkeletonBox height={120} borderRadius={radius.lg} />

			{/* Today section */}
			<SkeletonBox height={90} borderRadius={radius.lg} />
		</View>
	)
}
