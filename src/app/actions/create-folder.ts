"use server"

import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

export const createFolderAction = async (folderName: string) => {
	try {
		const result = await cloudinary.api.create_folder(folderName)
		console.log("Carpeta creada:", result)
		revalidatePath("/")
	} catch (error) {
		console.error("Error creando carpeta:", error)
	}
}
