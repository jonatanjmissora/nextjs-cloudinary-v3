"use server"

import { Folder } from "../../lib/types"
import { v2 as cloudinary } from "cloudinary"

export const getFolders = async (): Promise<{
	success: boolean
	response: Folder[]
	message: string
}> => {
	try {
		const rootFolders = await cloudinary.api.root_folders()

		if (rootFolders.folders.length === 0) {
			console.error("error en getRootFolders - !res: ")
			return {
				success: false,
				response: [],
				message: "Problemas con la API de Cloudinary",
			}
		}
		const PromisesArray = []
		for (const folder of rootFolders.folders) {
			const subfoldersPromise = cloudinary.api.sub_folders(folder.path)
			PromisesArray.push(subfoldersPromise)
		}
		const subfolders = await Promise.all(PromisesArray)
		console.log(`subfolder - ${JSON.stringify(subfolders)}`)
		return {
			success: true,
			response: rootFolders.folders || [],
			message: "Folders obtenidos correctamente",
		}
	} catch (error: unknown) {
		console.error("error en getRootFolders - catch: ", error)
		return {
			success: false,
			response: [],
			message:
				error instanceof Error ? error.message : "Error al obtener folders",
		}
	}
}
