// constants/theme.ts

import { FontFamily } from "./fonts"

type Theme = {
	colors: {
		primary: string
		secondary: string
		background: string
		surface: string
		onSurface: string
		onPrimary: string
		textSecondary: string
		border: string
		error: string
		success: string
		warning: string
	}
	spacing: {
		xs: number
		sm: number
		md: number
		lg: number
		xl: number
	}
	radius: {
		xs: number
		sm: number
		md: number
		lg: number
		full: number
	}
	fonts: typeof FontFamily
	fontSize: {
		xs: number
		sm: number
		md: number
		lg: number
		xl: number
	}
	iconSize: {
		sm: number
		md: number
		lg: number
	}
	seizureColors: {
		severe: string
		medium: string
		light: string
		unknown: string
	}
	calendarSeverityColors: Record<1 | 2 | 3, string>
	chartColors: {
		night: string
		morning: string
		afternoon: string
		evening: string
	}
	heatmapColors: {
		low: string
		medium: string
	}
}

export const lightTheme: Theme = {
	colors: {
		primary: "#4A90E2",
		secondary: "#50C878",
		background: "#F8FAFC",
		surface: "#FFFFFF",
		onSurface: "#1F2937",
		onPrimary: "#ffffff",
		textSecondary: "#6B7280",
		border: "#E5E7EB",
		error: "#EF4444",
		success: "#10B981",
		warning: "#F59E0B",
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	radius: {
		xs: 4,
		sm: 8,
		md: 12,
		lg: 16,
		full: 9999,
	},
	fonts: FontFamily,
	fontSize: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
	},
	iconSize: {
		sm: 20,
		md: 24,
		lg: 32,
	},
	seizureColors: {
		severe: "#f8a3ad",
		medium: "#fdc1c8",
		light: "#fddcde",
		unknown: "#3C5474",
	},
	calendarSeverityColors: {
		1: "#E6A817",
		2: "#F06292",
		3: "#7B1FA2",
	},
	chartColors: {
		night: "#5C6BC0",
		morning: "#FFA726",
		afternoon: "#26C6DA",
		evening: "#AB47BC",
	},
	heatmapColors: {
		low: "#FFA726",
		medium: "#FB8C00",
	},
} as const

const { spacing, radius, fontSize, iconSize } = lightTheme

export const darkTheme: Theme = {
	colors: {
		primary: "#60A5FA",
		secondary: "#4ADE80",
		background: "#0F172A",
		surface: "#1E2937",
		onSurface: "#F1F5F9",
		onPrimary: "#ffffff",
		textSecondary: "#94A3B8",
		border: "#334155",
		error: "#F87171",
		success: "#34D399",
		warning: "#FBBF24",
	},
	spacing,
	radius,
	fonts: FontFamily,
	fontSize,
	iconSize,
	seizureColors: {
		severe: "#326d9390",
		medium: "#326d9380",
		light: "#326d9370",
		unknown: "#243447",
	},
	calendarSeverityColors: {
		1: "#FFCA28",
		2: "#F06292",
		3: "#7B1FA2",
	},
	chartColors: {
		night: "#5C6BC0",
		morning: "#FFA726",
		afternoon: "#26C6DA",
		evening: "#AB47BC",
	},
	heatmapColors: {
		low: "#FFA726",
		medium: "#FB8C00",
	},
} as const

export type AppTheme = Theme
