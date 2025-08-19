"use server"

import { v2 as cloudinary } from "cloudinary"

export const moveMultipleAction = async (
	assetIds: string[],
	newFolder: string
) => {
	try {
		for (const public_id of assetIds) {
			const result = await cloudinary.uploader.explicit(public_id, {
				type: "upload",
				asset_folder: newFolder,
			})
			if (!result.asset_id) {
				throw new Error("Error moviendo asset(s)")
			}
			console.log("Asset movido:", result.public_id)
		}
	} catch (error) {
		console.error("Error moviendo asset(s):", error)
	}
}
