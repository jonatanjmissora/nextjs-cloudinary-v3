
import { CloudinaryAsset } from "./types"
import { useGetAssets } from "./use-get-assets"
import { useGetFolders } from "./use-get-folders"

export const useGetTreeFolders = () => {

const { assets } = useGetAssets()
const { foldersTree } = useGetFolders()
const assetsByFolders = getUniqueFolders(assets)
	
const treeFolders = foldersTree.map(folder => ({
	name: folder,
	count: assetsByFolders.find(f => f.name === folder)?.count || 0,
}))

function getUniqueFolders(
	assets: CloudinaryAsset[]
): { name: string; count: number }[] {
	// Extract all folder names from assets and filter out undefined/null
	const allFolders = assets
		.map(asset => asset.asset_folder)
		.filter((folder): folder is string => folder != null)
		.sort((a, b) => a.localeCompare(b))
	const allFoldersAndCounts = countArrayStrings(allFolders)
	return [{ name: "Todas", count: assets.length }, ...allFoldersAndCounts]
}

function countArrayStrings(arr: string[]): { name: string; count: number }[] {
	return arr.reduce(
		(prev, current) => {
			const existing = prev.find(item => item.name === current)
			if (existing) {
				existing.count += 1
			} else {
				prev.push({ name: current, count: 1 })
			}
			return prev
		},
		[] as { name: string; count: number }[]
	)
}
return { treeFolders }
}