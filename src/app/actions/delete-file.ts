"use server"

import { v2 as cloudinary } from "cloudinary"

export const deleteAction = async (public_id: string) => {
	try {
		const result = await cloudinary.uploader.destroy(public_id)
		console.log("Asset eliminado:", result)
		// Aquí podrías agregar lógica para actualizar el estado o mostrar una notificación
	} catch (error) {
		console.error("Error eliminando asset:", error)
		// Manejar el error apropiadamente
	}
}

export const deleteMultipleAction = async (public_ids: string[]) => {
	try {
		for (const public_id of public_ids) {
			const result = await cloudinary.uploader.destroy(public_id)
			if (result.result !== "ok") {
				throw new Error("Error eliminando asset")
			}
		}
	} catch (error) {
		console.error("Error eliminando asset:", error)
	}
}
