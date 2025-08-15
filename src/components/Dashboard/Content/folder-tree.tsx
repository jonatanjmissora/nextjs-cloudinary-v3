"use client"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useGetAssets } from "@/lib/use-get-assets"
import { getFoldersTree } from "@/lib/utils"

export default function FolderTree({
	setSelectedMoveFolder,
}: {
	setSelectedMoveFolder: (folder: string | null) => void
}) {
	const { assets } = useGetAssets()

	const foldersTreeArray = getFoldersTree(assets)

	return (
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
	)
}
