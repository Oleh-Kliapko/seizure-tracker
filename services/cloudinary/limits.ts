import { MAX_VIDEO_SIZE_BYTES, MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import { getSeizures } from "@/services"

export async function checkVideoLimits(
	userId: string,
	fileSize: number,
): Promise<string | null> {
	if (fileSize > MAX_VIDEO_SIZE_BYTES) {
		return `Відео перевищує ліміт ${MAX_VIDEO_SIZE_MB}MB`
	}

	const seizures = await getSeizures(userId)
	const videoCount = seizures.filter(s => s.videoUrl?.startsWith("http")).length

	if (videoCount >= MAX_VIDEOS_PER_USER) {
		return `Досягнуто ліміт відео (${MAX_VIDEOS_PER_USER} шт). Видаліть старі відео`
	}

	return null
}
