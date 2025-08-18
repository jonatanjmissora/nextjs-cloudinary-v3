"use server"

import { CloudinaryAsset } from "../../lib/types"
import { v2 as cloudinary } from "cloudinary"

export const getAssets = async (): Promise<{
	success: boolean
	response: CloudinaryAsset[]
	message: string
}> => {
	try {
		const res = await cloudinary.search
			.expression("resource_type:image")
			.sort_by("public_id", "desc")
			.max_results(30)
			.execute()

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
