"use client"

import { Edit2, FolderIcon, FolderOpenIcon, MoreHorizontal, Trash2 } from "lucide-react"

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

export function Folder({ label }: { label: string }) {
	const [open, setOpen] = useState<boolean>(false)
	const { setActualFolder, actualFolder } = useStore()
	const folderName = label === "" 
		? "Sin nombre" 
		: label.split("/").length > 1
			? label.split("/").pop()
			: label
	const isSubFolderName = label.split("/").length > 1

	return ( 
		<div className={`flex w-full items-center justify-between sm:flex-row sm:items-center group hover:border-[var(--border)] border border-transparent rounded-lg ${label === actualFolder && "bg-[var(--border)]"} my-[2px]`}>
			<button className={`flex gap-3 items-center cursor-pointer flex-1 h-[3rem] px-2 ${isSubFolderName && "pl-8"}`}  onClick={() => setActualFolder(label)}>
				{label === actualFolder ? <FolderOpenIcon className="size-5 text-orange-500" /> : <FolderIcon className="size-5" />}
				<span className={`${label === actualFolder && "text-orange-500"} sm:text-sm 2xl:text-base`}>{folderName}</span>
			</button>
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
		</div>
	)
}
