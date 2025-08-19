"use server"

import { v2 as cloudinary } from "cloudinary"

export const getFolders = async (): Promise<{
	success: boolean
	response: string[]
	message: string
}> => {
	try {
		// obtengo las root folders
		const rootFolders = await cloudinary.api.root_folders()
		if (rootFolders.folders.length === 0) {
			console.error("error en getRootFolders - !res: ")
			return {
				success: false,
				response: [],
				message: "Problemas con la API de Cloudinary",
			}
		}

		// obtengo las sub folders
		const PromisesArray = []
		for (const folder of rootFolders.folders) {
			try {
				const subfoldersPromise = cloudinary.api.sub_folders(folder.path)
				PromisesArray.push(subfoldersPromise)
			} catch (error) {
				console.error("error en getSubFolders - catch: ", error)
			}
		}

		const subfolders = await Promise.all(PromisesArray)

		// armo el arbol de folders
		const foldersTree = getFoldersTree(rootFolders.folders, subfolders)

		return {
			success: true,
			response: foldersTree || [],
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

type RootFolderType = {
	name: string
	path: string
	external_id: string
}

type SubFolderType = {
	folders: RootFolderType[]
	next_cursor: string | null
	total_count: number
	rate_limit_allowed: number
	rate_limit_reset_at: string
	rate_limit_remaining: number
}

function getFoldersTree(
	rootFolders: RootFolderType[],
	subfolders: SubFolderType[]
): string[] {
	const folderTree = ["Todas"] as string[]
	for (let index = 0; index < rootFolders.length; index++) {
		folderTree.push(rootFolders[index].name)
		for (let j = 0; j < subfolders[index].folders.length; j++) {
			folderTree.push(
				`${rootFolders[index].name}/${subfolders[index].folders[j].name}`
			)
		}
	}
	return folderTree
}
