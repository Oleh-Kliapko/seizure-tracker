import React from "react"
import { Text, View } from "react-native"

function recordError(error: Error) {
	try {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const crashlytics = require("@react-native-firebase/crashlytics").default
		crashlytics().recordError(error)
	} catch {}
}

type Props = { children: React.ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
	state: State = { hasError: false }

	static getDerivedStateFromError(): State {
		return { hasError: true }
	}

	componentDidCatch(error: Error) {
		recordError(error)
	}

	render() {
		if (this.state.hasError) {
			return (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Text>Something went wrong. Please restart the app.</Text>
				</View>
			)
		}
		return this.props.children
	}
}
