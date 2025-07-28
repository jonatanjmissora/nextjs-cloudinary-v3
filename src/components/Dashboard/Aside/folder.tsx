"use client"

import {
	Edit2,
	FolderIcon,
	FolderOpenIcon,
	MoreHorizontal,
	Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import useStore from "@/lib/zustand-coudinary"

export function Folder({
	folderName,
	assetsCount,
}: {
	folderName: string
	assetsCount: number
}) {
	const { setActualFolder, actualFolder, setSelectedAssets } = useStore()
	const simpleFolderName =
		folderName.split("/").length > 1 ? folderName.split("/").pop() : folderName
	const isSubFolderName = folderName.split("/").length > 1

	const handleSelect = () => {
		setActualFolder(folderName)
		setSelectedAssets([])
	}

	return (
		<div
			className={`flex w-full items-center justify-between sm:flex-row sm:items-center group hover:border-[var(--border)] border border-transparent rounded-lg ${folderName === actualFolder && "bg-[var(--border)]"} my-[2px]`}
		>
			<button
				className={`flex gap-3 items-center cursor-pointer flex-1 h-[3rem] px-2 ${isSubFolderName && "pl-8"}`}
				onClick={handleSelect}
			>
				{folderName === actualFolder ? (
					<FolderOpenIcon className="size-5 text-orange-500" />
				) : (
					<FolderIcon className="size-5" />
				)}
				<p
					className={`${folderName === actualFolder && "text-orange-500"} sm:text-sm 2xl:text-base`}
				>
					{simpleFolderName}{" "}
					<span className="text-[var(--foreground)]/30 text-xs">
						{" "}
						({assetsCount})
					</span>
				</p>
			</button>

			<DropdownMenuFolder />
		</div>
	)
}

const DropdownMenuFolder = () => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="group-hover:opacity-100 opacity-0"
				>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				<DropdownMenuGroup>
					<DropdownMenuItem className="flex items-center justify-between p-3">
						renombrar <Edit2 />
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-red-600 flex items-center justify-between p-3">
						eliminar <Trash2 />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
