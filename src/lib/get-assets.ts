"use server"

import { CloudinaryAsset } from "./types"
import cloudinary from "cloudinary"

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
