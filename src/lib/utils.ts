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

export const getFileUri = async (file: File) => {
	const fileBuffer = Buffer.from(await file.arrayBuffer())
	const mimeType = file.type
	const encoding = "base64"
	const base64Data = fileBuffer.toString(encoding)
	return `data:${mimeType};${encoding},${base64Data}`
}

