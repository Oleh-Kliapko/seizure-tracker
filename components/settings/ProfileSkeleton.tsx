import { SkeletonBox } from "@/components/ui/SkeletonBox"
import { useAppTheme } from "@/hooks"
import { View } from "react-native"

export function ProfileSkeleton() {
	const { spacing, radius } = useAppTheme()

	return (
		<View style={{ padding: spacing.lg, paddingTop: 88, gap: spacing.lg }}>
			{/* Avatar + name */}
			<View style={{ alignItems: "center", gap: spacing.sm }}>
				<SkeletonBox width={88} height={88} borderRadius={radius.full} />
				<SkeletonBox width={160} height={20} borderRadius={radius.sm} />
				<SkeletonBox width={200} height={14} borderRadius={radius.sm} />
			</View>

			{/* Menu items */}
			<View style={{ gap: spacing.sm }}>
				{[1, 2, 3, 4, 5].map(i => (
					<SkeletonBox key={i} height={52} borderRadius={radius.lg} />
				))}
			</View>
		</View>
	)
}
