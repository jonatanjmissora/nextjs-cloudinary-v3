"use client"
import { CloudinaryAsset } from "@/lib/types"
import { useCallback } from "react"

export const downloadMultipleAction = async (
	selectedAssets: CloudinaryAsset[]
) => {
	const downloadURL = (assetURL: string) =>
		assetURL.replace(/upload\//, "upload/fl_attachment/")

	const urls = selectedAssets.map(asset => downloadURL(asset.secure_url))

	// const downloadFiles = useCallback(() => {
	// 	new Promise(resolve => {
	// 		const temporaryDownloadLink = document.createElement("a")
	// 		temporaryDownloadLink.style.display = "none"
	// 		document.body.appendChild(temporaryDownloadLink)
	// 		resolve(temporaryDownloadLink)
	// 	})
	// 		.then(temporaryDownloadLink => {
	// 			// return new Promise((resolve) => {});
	// 			const downloadPromises = []
	// 			for (const [index, downloadLink] of urls.entries()) {
	// 				const downloadPromise = new Promise(resolve => {
	// 					setTimeout(() => {
	// 						const fileName = downloadLink.split("/").pop()
	// 						temporaryDownloadLink.setAttribute("href", downloadLink)
	// 						temporaryDownloadLink.setAttribute("download", fileName)
	// 						temporaryDownloadLink.click()
	// 						resolve(temporaryDownloadLink)
	// 					}, 100 * index)
	// 				})
	// 				downloadPromises.push(downloadPromise)
	// 			}
	// 			return Promise.all(downloadPromises)
	// 		})
	// 		.then(([temporaryDownloadLink]) => {
	// 			document.body.removeChild(temporaryDownloadLink)
	// 		})
	// }, [])
}
