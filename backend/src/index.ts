import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express"
import cors from "cors"
import { deleteVideoFromCloudinary } from "./services/cloudinaryService.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" })
})

// Delete video endpoint
app.post("/api/videos/delete", async (req: Request, res: Response) => {
	try {
		const { publicId, userId } = req.body

		// Validation
		if (!publicId || typeof publicId !== "string") {
			res.status(400).json({ error: "Missing or invalid publicId" })
			return
		}

		if (!userId || typeof userId !== "string") {
			res.status(400).json({ error: "Missing or invalid userId" })
			return
		}

		// Verify the API key (simple validation to prevent abuse)
		const apiKey = req.headers["x-api-key"]
		const expectedKey = process.env.API_KEY
		if (!expectedKey || apiKey !== expectedKey) {
			res.status(401).json({ error: "Unauthorized" })
			return
		}

		// Delete from Cloudinary
		await deleteVideoFromCloudinary(userId, publicId)

		res.json({ success: true, message: "Video deleted successfully" })
	} catch (error: any) {
		console.error("Error deleting video:", error.message)
		res.status(500).json({ error: error.message || "Failed to delete video" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
