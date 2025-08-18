"use server"

import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

export const renameFolderAction = async (
	folderName: string,
	newName: string
) => {
	try {
		const result = await cloudinary.api.rename_folder(folderName, newName)
		console.log("Carpeta renombrada:", result)
		revalidatePath("/")
	} catch (error) {
		console.error("Error renombrando carpeta:", error)
	}
}
