import { SkeletonBox } from "@/components/ui/SkeletonBox"
import { useAppTheme } from "@/hooks"
import { View } from "react-native"

function SeizureCardSkeleton() {
	const { spacing, radius } = useAppTheme()
	return (
		<View style={{ gap: spacing.sm }}>
			<SkeletonBox height={100} borderRadius={radius.lg} />
		</View>
	)
}

export function SeizureListSkeleton() {
	const { spacing } = useAppTheme()
	return (
		<View style={{ padding: spacing.lg, gap: spacing.md }}>
			<SeizureCardSkeleton />
			<SeizureCardSkeleton />
			<SeizureCardSkeleton />
			<SeizureCardSkeleton />
		</View>
	)
}
