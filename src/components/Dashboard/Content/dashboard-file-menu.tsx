"use client"

import { useState } from "react"
import Image from "next/image"
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
import { CloudinaryAsset } from "@/lib/types"
import { deleteAction } from "@/app/actions/delete-file"

export const DashboardFileMenu = ({
	view,
	asset,
}: {
	view: "grid" | "list"
	asset: CloudinaryAsset
}) => {
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
					<DeleteDialog asset={asset} setOpen={setOpen} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const DeleteDialog = ({
	asset,
	setOpen,
}: {
	asset: CloudinaryAsset
	setOpen: (open: boolean) => void
}) => {
	const handleDeleteAsset = async () => {
		setOpen(false)
		await deleteAction(asset.public_id)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!files.length) return toast.error("No ha seleccionado archivos")
		const formData = new FormData(e.currentTarget)

		startTransition(async () => {
			toast.promise(uploadAction(formData), {
				loading: "Subiendo archivos...",
				success: "Archivos subidos exitosamente",
				error: "Error al subir archivos",
			})
			queryClient.invalidateQueries({ queryKey: ["assets"] })
			setFiles([])
			//close AlertDialog
			setAlertDialog(false)
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					className="w-full flex items-center justify-between"
				>
					eliminar <Trash2 className="opacity-50" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[500px] flex flex-col gap-6 p-20 py-12">
				<AlertDialogHeader>
					<AlertDialogTitle>
						¿ Seguro deseas eliminar la imagen ?
					</AlertDialogTitle>
				</AlertDialogHeader>

				<AlertModalImage asset={asset} />

				<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
					<AlertDialogCancel className="flex-1" onClick={() => setOpen(false)}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						className="flex-1 bg-orange-500"
						onClick={handleDeleteAsset}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

const AlertModalImage = ({ asset }: { asset: CloudinaryAsset }) => {
	return (
		<div className="flex items-center gap-4">
			<div className="relative size-[50px]">
				<Image
					src={asset.secure_url}
					alt={asset.public_id}
					layout="fill"
					quality={100}
					priority
					className="w-full object-cover"
				/>
			</div>
			<span>{asset.display_name}</span>
		</div>
	)
}
