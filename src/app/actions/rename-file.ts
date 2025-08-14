"use server"

import { CloudinaryAsset } from "@/lib/types"
import { v2 as cloudinary } from "cloudinary"

export const renameAction = async (asset: CloudinaryAsset, newName: string) => {
	try {
		const result = await cloudinary.uploader.rename(asset.public_id, newName)
		console.log("Asset renombrado:", result)
	} catch (error) {
		console.error("Error renombrando asset:", error)
	}
}
