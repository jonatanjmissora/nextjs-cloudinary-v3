"use server"

import { v2 as cloudinary } from "cloudinary"

export const renameFolderAction = async (
	folderName: string,
	newName: string
) => {
	try {
		const result = await cloudinary.api.rename_folder(folderName, newName)
		console.log("Carpeta renombrada:", result)
	} catch (error) {
		console.error("Error renombrando carpeta:", error)
	}
}
