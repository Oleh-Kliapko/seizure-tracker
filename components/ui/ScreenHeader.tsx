// components/ui/ScreenHeader.tsx

import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createScreenHeaderStyles } from "./ScreenHeader.styles"

type Props = {
	title: string
	subtitle?: string
	showBackButton?: boolean
	right?: React.ReactNode
}

export function ScreenHeader({
	title,
	subtitle,
	showBackButton = true,
	right,
}: Props) {
	const theme = useAppTheme()
	const insets = useSafeAreaInsets()
	const styles = createScreenHeaderStyles(theme, insets)

	return (
		<View style={styles.container}>
			{showBackButton ? (
				<TouchableOpacity
					onPress={() => router.back()}
					activeOpacity={0.7}
					style={styles.backBtn}
					accessibilityLabel="Назад"
					accessibilityRole="button"
				>
					<ArrowLeft size={24} color={theme.colors.primary} />
				</TouchableOpacity>
			) : (
				<View style={styles.placeholder} />
			)}

			<View style={{ alignItems: "center" }}>
				<Text style={styles.title}>{title}</Text>
				{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
			</View>

			<View style={styles.right}>{right ?? null}</View>
		</View>
	)
}
