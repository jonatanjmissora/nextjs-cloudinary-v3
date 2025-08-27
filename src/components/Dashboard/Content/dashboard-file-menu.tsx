"use client"

import { startTransition, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	MoreHorizontal,
	Trash2,
	Download,
	Wand,
	Edit2,
	Link as LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { CloudinaryAsset } from "@/lib/types"
import { deleteAction } from "@/app/actions/delete-file"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import SubmitBtn from "@/components/layout/submit-btn"
import { renameFileAction } from "@/app/actions/rename-file"

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
					{/* 				RENAME							 */}
					<RenameAsset asset={asset} setOpen={setOpen} />
					<DropdownMenuSeparator />

					{/* 				COPY URL							 */}
					<CopyURL assetURL={asset.secure_url} />
					<DropdownMenuSeparator />

					{/* 				DOWNLOAD							 */}
					<DownloadFile assetURL={asset.secure_url} />
					<DropdownMenuSeparator />

					{/* 				TRANSFORM							 */}
					<DropdownMenuItem className="min-h-12">
						<Link
							href={`/transform/${asset.public_id}`}
							className="flex items-center justify-between w-full px-1"
						>
							transformar <Wand />
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />

					{/* 				DELETE							 */}
					<DeleteDialog asset={asset} setOpen={setOpen} />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const RenameAsset = ({
	asset,
	setOpen,
}: {
	asset: CloudinaryAsset
	setOpen: (open: boolean) => void
}) => {
	const queryClient = useQueryClient()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newName = e.currentTarget.newName.value.trim()
		if (newName === asset.public_id || newName === "") {
			return
		}
		startTransition(async () => {
			toast.promise(renameFileAction(asset, newName), {
				loading: "renombrando imagen...",
				success: "imagen renombrada exitosamente",
				error: "Error al renombrar imagen",
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
					className="w-full flex items-center justify-between min-h-12"
				>
					renombrar <Edit2 className="opacity-50" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[600px]">
				<AlertDialogDescription className="hidden">
					Cambio el nombre de la imagen
				</AlertDialogDescription>
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-6 p-12"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							Cambio de nombre:
						</AlertDialogTitle>
					</AlertDialogHeader>

					<div className="flex flex-col gap-1">
						<input
							defaultValue={asset.public_id}
							type="text"
							name="newName"
							required
							placeholder="Nuevo nombre"
							className="bg-muted/50 px-6 py-3 rounded-md"
						/>
						<p className="text-xs text-orange-500/30">
							* controle que el nombre lleve caracteres permitidos
						</p>
					</div>

					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel
							className="flex-1"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</AlertDialogCancel>
						<SubmitBtn label="Renombrar" className="flex-1" />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}

const CopyURL = ({ assetURL }: { assetURL: string }) => {
	const handleClick = () => {
		navigator.clipboard.writeText(assetURL)
		toast.success("URL copiada exitosamente")
	}

	return (
		<DropdownMenuItem
			className="flex items-center justify-between p-3 min-h-12"
			onClick={handleClick}
		>
			copiar url <LinkIcon />
		</DropdownMenuItem>
	)
}

const DownloadFile = ({ assetURL }: { assetURL: string }) => {
	const downloadURL = assetURL.replace(/upload\//, "upload/fl_attachment/")

	return (
		<DropdownMenuItem className="min-h-12">
			<a
				className="flex items-center justify-between w-full py-2 px-1"
				href={downloadURL}
			>
				descargar
				<Download />
			</a>
		</DropdownMenuItem>
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

			queryClient.invalidateQueries()
			setOpen(false)
		})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="ghost"
					className="w-full flex items-center justify-between min-h-12"
				>
					eliminar <Trash2 className="text-red-700 opacity-50" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[600px]">
				<AlertDialogDescription className="hidden">
					Eliminacion de imagen
				</AlertDialogDescription>
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
