"use server"

import { v2 as cloudinary } from "cloudinary"

export const deleteFolderAction = async (folderName: string) => {
    try {
        const result = await cloudinary.api.delete_folder(folderName)
        console.log("Carpeta eliminada:", result)
    } catch (error) {
        console.error("Error eliminando carpeta:", error)
    }
}