// components/ui/AppLogo.tsx

import { useAppTheme } from "@/hooks"
import { SvgXml } from "react-native-svg"
import { getBrainLogoSvg } from "./svg"

type Props = {
	size?: number
	color?: string
	accentColor?: string
	opacity?: number
}

export function AppLogo({ size = 64, color, accentColor, opacity = 1 }: Props) {
	const { colors } = useAppTheme()

	const svg = getBrainLogoSvg({
		color: color ?? colors.primary,
		accentColor: accentColor ?? "#e83a2a",
	})

	return <SvgXml xml={svg} width={size} height={size} style={{ opacity }} />
}
