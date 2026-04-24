// components/seizure/video/VideoPlayer.tsx

import { useAppTheme } from "@/hooks"
import { useVideoPlayer, VideoView } from "expo-video"
import { getStyles } from "./getStyles"

type Props = {
	url: string
}

export function VideoPlayer({ url }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const player = useVideoPlayer(url, p => {
		p.loop = false
	})

	return (
		<VideoView
			player={player}
			style={styles.videoView}
			allowsPictureInPicture
			nativeControls
		/>
	)
}
