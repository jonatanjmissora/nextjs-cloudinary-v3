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
import { MoreHorizontal, Trash2, Download, Wand } from "lucide-react"
import { CloudinaryAsset } from "@/lib/types"

export default function DashboardFileMenu({
	asset,
}: {
	asset: CloudinaryAsset
}) {
	const [open, setOpen] = useState(false)

	return (
		<div className="absolute top-1 right-1 left-1">
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<div className="group-hover:opacity-100 opacity-0 bg-[var(--foreground)]/50 w-full flex items-center justify-between">
						<span className="text-black truncate w-3/4 p-2">
							{asset.filename}
						</span>
						<Button variant="ghost" size="sm">
							<MoreHorizontal className="size-5 text-black" />
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuGroup>
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
