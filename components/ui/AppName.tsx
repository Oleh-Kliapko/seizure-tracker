// components/ui/AppSlogan.tsx

import { useAppTheme } from "@/hooks"
import { Text } from "react-native"

type Props = {
	fontSize?: number
	marginTop?: number
	color?: string
}

export function AppName({
	fontSize = 28,
	marginTop = 0,
	color = "#4A90E2",
}: Props) {
	const { fonts, colors } = useAppTheme()

	return (
		<Text
			style={{
				fontSize,
				marginTop,
				fontFamily: fonts.bold,
				color: color ?? colors.primary,
			}}
		>
			SeizureTracker
		</Text>
	)
}
