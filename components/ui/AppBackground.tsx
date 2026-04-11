// components/ui/AppBackground.tsx

import { useAppTheme } from "@/hooks"
import { generateBackground } from "@/utils"
import { StyleSheet, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { BRAIN_SVG } from "./svg"

export function AppBackground() {
	const { colors } = useAppTheme()

	return (
		<View style={StyleSheet.absoluteFill} pointerEvents="none">
			{generateBackground().map(b => (
				<SvgXml
					key={b.id}
					xml={BRAIN_SVG}
					width={b.size}
					height={b.size}
					color={colors.primary}
					style={{
						position: "absolute",
						left: b.x,
						top: b.y,
						opacity: b.opacity,
						transform: [{ rotate: `${b.rotation}deg` }],
					}}
				/>
			))}
		</View>
	)
}
