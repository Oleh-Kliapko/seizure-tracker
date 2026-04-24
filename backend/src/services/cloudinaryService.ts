import crypto from "crypto"
import axios from "axios"

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || ""
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || ""
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ""

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
	throw new Error("Missing Cloudinary configuration")
}

function generateSignature(params: Record<string, string>): string {
	const sortedParams = Object.keys(params)
		.sort()
		.map(key => `${key}=${params[key]}`)
		.join("&")

	const signature = crypto
		.createHash("sha1")
		.update(sortedParams + CLOUDINARY_API_SECRET)
		.digest("hex")

	return signature
}

export async function deleteVideoFromCloudinary(publicId: string): Promise<void> {
	const timestamp = Math.floor(Date.now() / 1000).toString()

	const params: Record<string, string> = {
		public_id: publicId,
		api_key: CLOUDINARY_API_KEY,
		timestamp,
	}

	const signature = generateSignature(params)

	const formData = new URLSearchParams()
	formData.append("public_id", publicId)
	formData.append("api_key", CLOUDINARY_API_KEY)
	formData.append("timestamp", timestamp)
	formData.append("signature", signature)

	const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/destroy`

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
