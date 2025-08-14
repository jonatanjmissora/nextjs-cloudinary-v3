"use server"

import { CloudinaryAsset } from "../../lib/types"
import cloudinary from "cloudinary"

export const getAssets = async (): Promise<{
	success: boolean
	response: CloudinaryAsset[]
	message: string
}> => {
	try {
		const res = await cloudinary.v2.search
			.expression("resource_type:image")
			.sort_by("public_id", "desc")
			.max_results(30)
			.execute()

		// demora de 2 segundos
		// await sleep(1000)
		// console.log("Ya estoy aca")
		// const rootFolders = await cloudinary.v2.api.root_folders()
		// console.log("rootFolders: ", rootFolders)
		// const subFolder = await cloudinary.v2.api.sub_folders("")
		// console.log("subfolder", subFolder)

		if (!res) {
			console.error("error en getAssets - !res: ")
			return {
				success: false,
				response: [],
				message: "Problemas con la API de Cloudinary",
			}
		}

		return {
			success: true,
			response: res.resources || [],
			message: "Assets obtenidos correctamente",
		}
	} catch (error: unknown) {
		console.error("error en getAssets - catch: ", error)
		return {
			success: false,
			response: [],
			message:
				error instanceof Error ? error.message : "Error al obtener assets",
		}
	}
}
