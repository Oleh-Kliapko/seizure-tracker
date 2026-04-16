// components/ui/ScreenHeader.tsx
import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createScreenHeaderStyles } from "./ScreenHeader.styles"

type Props = {
	title: string
	showBackButton?: boolean
}

export function ScreenHeader({ title, showBackButton = true }: Props) {
	const theme = useAppTheme()
	const styles = createScreenHeaderStyles(theme)
	const insets = useSafeAreaInsets()

	return (
		<View
			style={[
				styles.container,
				{
					paddingHorizontal: theme.spacing.lg,
					paddingVertical: theme.spacing.md,
					paddingTop: insets.top + theme.spacing.sm,
				},
			]}
		>
			{showBackButton ? (
				<TouchableOpacity
					onPress={() => router.back()}
					activeOpacity={0.7}
					style={styles.backBtn}
				>
					<ArrowLeft size={24} color={theme.colors.primary} />
				</TouchableOpacity>
			) : (
				<View style={styles.placeholder} />
			)}

			<Text style={styles.title}>{title}</Text>

			<View style={styles.placeholder} />
		</View>
	)
}
