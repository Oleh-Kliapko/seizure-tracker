// hooks/useAvatarUpload.ts

import { auth, db } from "@/config/firebase"
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/services/cloudinary"
import { updateUser } from "@/services"
import * as ImagePicker from "expo-image-picker"
import { deleteField, doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { ActionSheetIOS } from "react-native"

function extractPublicIdFromUrl(url?: string): string | undefined {
	if (!url) return undefined
	// https://res.cloudinary.com/{cloud}/image/upload/v123/{publicId}.ext
	const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
	return match?.[1]
}

export function useAvatarUpload() {
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const pickAndUpload = () => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				options: ["Скасувати", "Зробити фото", "Вибрати з галереї"],
				cancelButtonIndex: 0,
			},
			async buttonIndex => {
				if (buttonIndex === 0) return

				let result: ImagePicker.ImagePickerResult

				if (buttonIndex === 1) {
					const { status } = await ImagePicker.requestCameraPermissionsAsync()
					if (status !== "granted") {
						setError("Немає доступу до камери")
						return
					}
					try {
						result = await ImagePicker.launchCameraAsync({
							mediaTypes: ["images"],
							allowsEditing: true,
							aspect: [1, 1],
							quality: 0.8,
						})
					} catch {
						setError("Камера недоступна на цьому пристрої")
						return
					}
				} else {
					const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
					if (status !== "granted") {
						setError("Немає доступу до галереї")
						return
					}
					result = await ImagePicker.launchImageLibraryAsync({
						mediaTypes: ["images"],
						allowsEditing: true,
						aspect: [1, 1],
						quality: 0.8,
					})
				}

				if (result.canceled || !result.assets[0]?.uri) return

				try {
					setIsUploading(true)
					setError(null)
					const { url, publicId } = await uploadImageToCloudinary(result.assets[0].uri)
					const uid = auth.currentUser?.uid
					if (uid) await updateUser(uid, { avatarUrl: url, avatarPublicId: publicId })
				} catch (e: any) {
					setError(e.message ?? "Помилка завантаження")
				} finally {
					setIsUploading(false)
				}
			},
		)
	}

	const removeAvatar = async (publicId?: string, avatarUrl?: string) => {
		const uid = auth.currentUser?.uid
		if (!uid) return
		try {
			setIsUploading(true)
			setError(null)
			const resolvedPublicId = publicId ?? extractPublicIdFromUrl(avatarUrl)
			if (resolvedPublicId) await deleteImageFromCloudinary(resolvedPublicId)
			await updateDoc(doc(db, "users", uid), {
				avatarUrl: deleteField(),
				avatarPublicId: deleteField(),
				updatedAt: new Date(),
			})
		} catch (e: any) {
			setError(e.message ?? "Помилка видалення")
		} finally {
			setIsUploading(false)
		}
	}

	return { pickAndUpload, removeAvatar, isUploading, error }
}
