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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export const DashboardFileMenu = ({
	asset,
	view,
}: {
	asset: CloudinaryAsset
	view: "grid" | "list"
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={`absolute top-0 right-0 ${view === "list" && "top-2 right-2"}`}>
			
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" className={`${view === "grid" && "group-hover:opacity-100 opacity-0 text-black bg-[var(--foreground)]/50"}`}>
						<MoreHorizontal className="size-5 " />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[200px]">
					<DropdownMenuGroup>
						<Ampliar asset={asset}/>
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


const Ampliar = ({asset}: {asset: CloudinaryAsset}) => {
	return (
		<Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-between w-full gap-2 p-3">
			<span>ampliar</span>
			<Expand className="size-4 text-[var(--foreground)]/50"/>
		</div>
        </DialogTrigger>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle className="text-center">{asset.display_name}</DialogTitle>
          </DialogHeader>
		  <div className="relative w-full h-[80dvh]">

          	<Image src={asset.secure_url} alt={asset.public_id} fill quality={100} priority objectFit="contain" className="" />
		  </div>
        </DialogContent>
    </Dialog>
	)
}