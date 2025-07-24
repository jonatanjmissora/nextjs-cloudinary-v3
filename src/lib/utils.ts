import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
	const bytes = bits / 8
	const kilobytes = bytes / 1024
	if (kilobytes >= 1024)
		return (kilobytes / 1024).toFixed(decimalPlaces) + " MB"
	return kilobytes.toFixed(decimalPlaces) + " KB"
}

// const formatFileSize = (size: number): string => {
//     if (size < 1024) return `${size} B`
//     if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
//     if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
//     return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
//   }
