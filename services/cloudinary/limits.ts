import { MAX_VIDEO_SIZE_BYTES, MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import { getSeizures } from "@/services/seizureService"
import i18n from "@/config/i18n"

export async function checkVideoLimits(
	userId: string,
	fileSize: number,
): Promise<string | null> {
	if (fileSize > MAX_VIDEO_SIZE_BYTES) {
		return i18n.t("error.videoSizeExceeded", { size: MAX_VIDEO_SIZE_MB })
	}

	const seizures = await getSeizures(userId)
	const videoCount = seizures.filter(s => s.videoUrl?.startsWith("http")).length

	if (videoCount >= MAX_VIDEOS_PER_USER) {
		return i18n.t("error.videoLimitReached", { count: MAX_VIDEOS_PER_USER })
	}

	return null
}
