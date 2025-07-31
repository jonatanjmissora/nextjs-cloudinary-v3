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
import { MoreHorizontal, Trash2, Download, Wand } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog"

export const DashboardFileMenu = ({ view }: { view: "grid" | "list" }) => {
	const [open, setOpen] = useState(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<MoreHorizontal
					className={`size-8 group right-0 absolute top-0 text-[var(--foreground)]/75 group-hover:opacity-100 opacity-0 bg-[var(--background)]/50 p-1 ${view === "list" && "top-2 right-2 bg-transparent"}`}
				/>
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
						<DeleteDialog />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const DeleteDialog = () => {
	const deleteImage = async e => {
		e.preventDefault()
		cloudinary.v2.uploader
			.destroy(imageData.public_id, function (error, result) {
				console.log(result, error)
			})
			.then(resp => console.log(resp))
			.catch(_err =>
				console.log("Something went wrong, please try again later.")
			)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">
					eliminar <Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿ Seguro deseas eliminar la imagen ?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction>Eliminar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
