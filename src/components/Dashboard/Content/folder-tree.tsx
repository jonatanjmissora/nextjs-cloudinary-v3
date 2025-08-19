"use client"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useGetTreeFolders } from "@/lib/use-get-tree-folders"
import useStore from "@/lib/zustand-cloudinary"

export default function FolderTree({
	selectedMoveFolder,
	setSelectedMoveFolder,
}: {
	selectedMoveFolder: string | null
	setSelectedMoveFolder: (folder: string | null) => void
}) {
	
	const { actualFolder } = useStore()
	const { treeFolders } = useGetTreeFolders()
	const foldersTreeArray = treeFolders.filter(folder => folder.name !== "Todas" && folder.name !== actualFolder)

	return (
	<>
		{selectedMoveFolder}
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selecciona una carpeta" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{foldersTreeArray.map(folder => (
						<SelectItem
						key={folder.name}
							value={folder.name}
							onChange={() => setSelectedMoveFolder(folder.name)}
						>
							{folder.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
						</>
	)
}
