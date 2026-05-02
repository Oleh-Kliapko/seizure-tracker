// config/firebase.ts

import AsyncStorage from "@react-native-async-storage/async-storage"
import { getApp, getApps, initializeApp } from "firebase/app"
import { CustomProvider, initializeAppCheck } from "firebase/app-check"
import { getFirestore } from "firebase/firestore"
import { Platform } from "react-native"

// @ts-expect-error - getReactNativePersistence існує в runtime але не в типах цієї версії
import { getReactNativePersistence, initializeAuth } from "firebase/auth"

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app)

// App Check — тільки на нативних платформах
if (Platform.OS !== "web") {
	const rnAppCheck = require("@react-native-firebase/app-check").default

	// Налаштовуємо нативний провайдер
	// На симуляторі/dev — debug (токен виводиться в консоль при першому запуску)
	// На реальному девайсі в production — App Attest (iOS) / Play Integrity (Android)
	const rnfbProvider = rnAppCheck().newReactNativeFirebaseAppCheckProvider()
	rnfbProvider.configure({
		apple: {
			provider: __DEV__ ? "debug" : "appAttest",
			isTokenAutoRefreshEnabled: true,
		},
		android: {
			provider: __DEV__ ? "debug" : "playIntegrity",
			isTokenAutoRefreshEnabled: true,
		},
	})
	rnAppCheck().initializeAppCheck({
		provider: rnfbProvider,
		isTokenAutoRefreshEnabled: true,
	})

	// Передаємо токени від RNFirebase в Firebase JS SDK
	const provider = new CustomProvider({
		getToken: async () => {
			const { token, expireTimeMillis } = await rnAppCheck().getToken(false)
			return { token, expireTimeMillis }
		},
	})

	initializeAppCheck(app, { provider, isTokenAutoRefreshEnabled: true })
}
