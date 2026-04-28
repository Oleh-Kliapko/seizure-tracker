// config/cloudinary.ts

export const cloudinaryConfig = {
	cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
	uploadPreset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "",
}

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/video/upload`
export const CLOUDINARY_IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`
export const MAX_VIDEO_SIZE_MB = 10
export const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024
export const MAX_VIDEOS_PER_USER = 3
