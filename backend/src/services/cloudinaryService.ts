import crypto from "crypto"
import axios from "axios"

function getCloudinaryConfig() {
	const cloudName = process.env.CLOUDINARY_CLOUD_NAME
	const apiKey = process.env.CLOUDINARY_API_KEY
	const apiSecret = process.env.CLOUDINARY_API_SECRET

	if (!cloudName || !apiKey || !apiSecret) {
		throw new Error("Missing Cloudinary configuration")
	}

	return { cloudName, apiKey, apiSecret }
}

function generateSignature(
	params: Record<string, string>,
	apiSecret: string,
): string {
	const sortedParams = Object.keys(params)
		.sort()
		.map(key => `${key}=${params[key]}`)
		.join("&")

	const signature = crypto
		.createHash("sha1")
		.update(sortedParams + apiSecret)
		.digest("hex")

	return signature
}

export async function deleteVideoFromCloudinary(
	userId: string,
	publicId: string,
): Promise<void> {
	const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()
	const timestamp = Math.floor(Date.now() / 1000).toString()

	const params: Record<string, string> = {
		public_id: publicId,
		api_key: apiKey,
		timestamp,
	}

	const signature = generateSignature(params, apiSecret)

	const formData = new URLSearchParams()
	formData.append("public_id", publicId)
	formData.append("api_key", apiKey)
	formData.append("timestamp", timestamp)
	formData.append("signature", signature)

	const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/destroy`

	try {
		await axios.post(url, formData, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
	} catch (error: any) {
		console.error("Cloudinary API error:", error.response?.data || error.message)
		throw new Error(
			error.response?.data?.error?.message ||
				"Failed to delete video from Cloudinary",
		)
	}
}
