"use client"

import { useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Download, Wand, Expand } from "lucide-react"
import { CloudinaryAsset } from "@/lib/types"

export const DashboardFileMenu = ({
	asset,
	view,
}: {
	asset: CloudinaryAsset
	view: "grid" | "list"
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={`absolute top-0 right-0`}>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className={`${view === "grid" && "group-hover:opacity-100 opacity-0 text-black bg-[var(--foreground)]/50"}`}>
						<MoreHorizontal className="size-5 " />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuGroup>
						<DropdownMenuItem className="flex items-center justify-between p-3">
							ampliar <Expand />
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center justify-between p-3">
							descargar <Download />
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="flex items-center justify-between p-3">
							transformar <Wand />
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
