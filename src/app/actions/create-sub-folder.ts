"use server"

import { v2 as cloudinary } from "cloudinary"

export const createSubFolderAction = async (
	folderName: string,
	parentFolder: string
) => {
	try {
		const result = await cloudinary.api.create_folder(
			`${parentFolder}/${folderName}`
		)
		console.log("Carpeta creada:", result)
	} catch (error) {
		console.error("Error creando carpeta:", error)
	}
}
