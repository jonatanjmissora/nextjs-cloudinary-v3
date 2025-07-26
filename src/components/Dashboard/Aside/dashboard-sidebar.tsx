"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Folder } from "./folder"
import useStore from "@/lib/zustand-coudinary"
import { useGetAssets } from "@/lib/use-get-assets"

const getUniqueFolders = (assets: any[]): string[] => {
	// Extract all folder names from assets and filter out undefined/null
	const allFolders = assets
	  .map(asset => asset.asset_folder)
	  .filter((folder): folder is string => folder != null)
	  .sort((a, b) => a.localeCompare(b))
	
	// Use Set to get unique values and convert back to array
	return ['Todas', ...new Set(allFolders)];
  };

export default function DashboardSidebar() {
	return (
		<aside className="w-[350px] 2xl:w-[400px] h-full">
			<Card className="w-full">
				<CardContent>
					<div className="flex justify-between items-center">
						<span className="sm:text-base 2xl:text-lg font-semibold tracking-wider">
							Carpetas
						</span>
						<Button variant="ghost" className="">
							<PlusIcon className="size-5" />
						</Button>
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
	const folders = getUniqueFolders(assets)

	return (
		<div>
			{folders.map(folder => (
				<Folder key={folder} label={folder} />
			))}
		</div>
	)
}
