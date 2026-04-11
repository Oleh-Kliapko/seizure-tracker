// utils/generateBackground.ts

import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("screen")

type Item = {
	id: number
	x: number
	y: number
	size: number
	rotation: number
	opacity: number
}

export function generateBackground(): Item[] {
	const size = 160
	const opacity = 0.3

	return [
		{
			id: 0,
			x: 0,
			y: size * 0.1,
			size,
			rotation: -15,
			opacity,
		},
		{
			id: 1,
			x: width - size,
			y: size * 0.1,
			size,
			rotation: 15,
			opacity,
		},
		{
			id: 2,
			x: size * 0.1,
			y: height - size * 1.1,
			size,
			rotation: 20,
			opacity,
		},
		{
			id: 3,
			x: width - size * 1.1,
			y: height - size * 1.1,
			size,
			rotation: -20,
			opacity,
		},
	]
}
