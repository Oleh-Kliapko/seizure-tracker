// components/seizure/datetime/DurationPicker.tsx

import { useAppTheme } from "@/hooks"
import { useEffect, useRef, useState } from "react"
import { FlatList, Text, View } from "react-native"

const ITEM_W = 72
const STEPS = Array.from({ length: 121 }, (_, i) => i * 5)

function formatStep(s: number): string {
	if (s === 0) return "—"
	const m = Math.floor(s / 60)
	const sec = s % 60
	return `${m}:${String(sec).padStart(2, "0")}`
}

type Props = {
	value: number | undefined
	onChange: (v: number | undefined) => void
}

export function DurationPicker({ value, onChange }: Props) {
	const theme = useAppTheme()
	const listRef = useRef<FlatList>(null)
	const [containerWidth, setContainerWidth] = useState(0)
	const [currentIndex, setCurrentIndex] = useState(() => Math.round((value ?? 0) / 5))

	const paddingH = containerWidth > 0 ? Math.floor((containerWidth - ITEM_W) / 2) : 0

	useEffect(() => {
		if (containerWidth > 0 && listRef.current) {
			listRef.current.scrollToOffset({
				offset: currentIndex * ITEM_W,
				animated: false,
			})
		}
	}, [containerWidth])

	return (
		<View
			onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
			style={{ height: 56, justifyContent: "center" }}
		>
			{containerWidth > 0 && (
				<>
					<View
						pointerEvents="none"
						style={{
							position: "absolute",
							left: paddingH,
							width: ITEM_W,
							height: 44,
							borderRadius: theme.radius.md,
							backgroundColor: theme.colors.primary + "18",
							borderWidth: 1.5,
							borderColor: theme.colors.primary + "40",
						}}
					/>
					<FlatList
						ref={listRef}
						horizontal
						data={STEPS}
						keyExtractor={s => String(s)}
						snapToInterval={ITEM_W}
						decelerationRate="fast"
						showsHorizontalScrollIndicator={false}
						getItemLayout={(_, i) => ({ length: ITEM_W, offset: paddingH + i * ITEM_W, index: i })}
						ListHeaderComponent={<View style={{ width: paddingH }} />}
						ListFooterComponent={<View style={{ width: paddingH }} />}
						onMomentumScrollEnd={e => {
							const idx = Math.max(0, Math.min(Math.round(e.nativeEvent.contentOffset.x / ITEM_W), STEPS.length - 1))
							setCurrentIndex(idx)
							onChange(STEPS[idx] === 0 ? undefined : STEPS[idx])
						}}
						renderItem={({ item, index }) => {
							const dist = Math.abs(index - currentIndex)
							const isSelected = dist === 0
							return (
								<View style={{ width: ITEM_W, height: 56, alignItems: "center", justifyContent: "center" }}>
									<Text
										style={{
											fontFamily: isSelected ? theme.fonts.bold : theme.fonts.regular,
											fontSize: isSelected ? theme.fontSize.md + 2 : theme.fontSize.sm,
											color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
											opacity: dist > 2 ? 0.25 : dist > 0 ? 0.55 : 1,
										}}
									>
										{formatStep(item)}
									</Text>
								</View>
							)
						}}
					/>
				</>
			)}
		</View>
	)
}
