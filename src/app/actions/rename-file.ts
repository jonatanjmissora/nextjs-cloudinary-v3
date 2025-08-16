"use server"

import { CloudinaryAsset } from "@/lib/types"
import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

export const renameAction = async (asset: CloudinaryAsset, newName: string) => {
	try {
		const result = await cloudinary.uploader.rename(asset.public_id, newName)
		console.log("Asset renombrado:", result)
		revalidatePath("/")
	} catch (error) {
		console.error("Error renombrando asset:", error)
	}
}
