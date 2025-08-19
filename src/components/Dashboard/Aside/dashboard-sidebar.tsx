"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Folder } from "./folder"
import CreateRootFolder from "./create-root-folder"
import { useGetTreeFolders } from "@/lib/use-get-tree-folders"

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
	
	const {treeFolders} = useGetTreeFolders()

	return (
		<div>
			{treeFolders.map(folder => (
				<Folder
					key={folder.name}
					folderName={folder.name}
					assetsCount={folder.count}
				/>
			))}
		</div>
	)
}

