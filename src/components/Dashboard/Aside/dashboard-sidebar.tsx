"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Folder } from "./folder"
import { useGetAssets } from "@/lib/use-get-assets"
import { CloudinaryAsset } from "@/lib/types"
import CreateRootFolder from "./create-root-folder"
import { useGetFolders } from "@/lib/use-get-folders"

export default function DashboardSidebar() {
	return (
		<aside className="w-[350px] 2xl:w-[400px] h-full">
			<Card>
				<CardContent>
					<div className="flex justify-between items-center">
						<span className="sm:text-base 2xl:text-lg font-semibold tracking-wider py-4">
							Carpetas
						</span>
						<CreateRootFolder />
					</div>
					<Separator />
					<FolderList />
				</CardContent>
			</Card>
		</aside>
	)
}

const FolderList = () => {
	const { assets } = useGetAssets()
	const { folders: rootfolders } = useGetFolders()
	const folders = getUniqueFolders(assets)

	return (
		<div>
			{folders.map(folder => (
				<Folder
					key={folder.name}
					folderName={folder.name}
					assetsCount={folder.count}
				/>
			))}
		</div>
	)
}

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
