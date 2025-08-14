import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CloudinaryAsset, Folder } from "./types"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const setFileDate = (date: string) => {
	const newDate = new Date(date)
	return new Intl.DateTimeFormat("es-ES", {
		year: "numeric",
		month: "short",
		day: "2-digit",
	}).format(newDate)
}

export const setFileSize = (bits: number, decimalPlaces = 1) => {
	if (bits < 0) {
		return "Invalid input"
	}

	if (bits < 1024) return `${bits} B`
	if (bits < 1024 * 1024) return `${(bits / 1024).toFixed(decimalPlaces)} KB`
	if (bits < 1024 * 1024 * 1024)
		return `${(bits / (1024 * 1024)).toFixed(decimalPlaces)} MB`
}

export const sleep = (delay?: number) =>
	new Promise(resolve => setTimeout(resolve, delay || 1000))

export const getFoldersTree = (assets: CloudinaryAsset[]) => {
	const foldersMap: Record<string, Folder> = {}
	const folders: Folder[] = []

	assets.forEach(asset => {
		const path = asset.asset_folder
		const folderNames = path.split("/")
		const parentFolderName =
			folderNames.length > 1 ? folderNames[folderNames.length - 2] : null
		const folder = folderNames[folderNames.length - 1]

		if (!foldersMap[folder]) {
			const folderObj: Folder = {
				name: folder,
				parent: parentFolderName,
			}
			foldersMap[folder] = folderObj
			folders.push(folderObj)
		}
	})
	return folders
}
