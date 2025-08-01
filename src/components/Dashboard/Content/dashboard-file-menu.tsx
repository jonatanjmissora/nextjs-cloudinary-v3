"use client"

import { startTransition, useState } from "react"
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
} from "@/components/ui/alert-dialog"
import { CloudinaryAsset } from "@/lib/types"
import { deleteAction } from "@/app/actions/delete-file"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import SubmitBtn from "@/components/layout/submit-btn"

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
	const queryClient = useQueryClient()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		startTransition(async () => {
			toast.promise(deleteAction(asset.public_id), {
				loading: "borrando imagen...",
				success: "imagen borrada exitosamente",
				error: "Error al borrar imagen",
			})

			queryClient.invalidateQueries({ queryKey: ["assets"] })
			setOpen(false)
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
			<AlertDialogContent className="w-[600px]">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-6 p-12"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							¿ Seguro deseas eliminar la imagen ?
						</AlertDialogTitle>
					</AlertDialogHeader>

					<AlertModalImage asset={asset} />

					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel
							className="flex-1"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</AlertDialogCancel>
						<SubmitBtn label="Eliminar" className="flex-1" />
					</AlertDialogFooter>
				</form>
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
