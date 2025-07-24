"use client"

import { Edit2, FolderIcon, MoreHorizontal, Trash2 } from "lucide-react"

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

export function Folder({ label }: { label: string }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex w-full flex-col items-start justify-between sm:px-3 sm:py-2 2xl:px-4 2xl:py-3 sm:flex-row sm:items-center group hover:border-[var(--border)] border border-transparent rounded-lg">
			<div className="flex items-center gap-4">
				<FolderIcon className="size-5" />
				<span className="sm:text-sm 2xl:text-base">{label}</span>
			</div>
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
