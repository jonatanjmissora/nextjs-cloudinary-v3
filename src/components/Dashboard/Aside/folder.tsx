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
import { startTransition, useState } from "react"
import useStore from "@/lib/zustand-cloudinary"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { AlertDialogContent } from "@radix-ui/react-alert-dialog"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import SubmitBtn from "@/components/layout/submit-btn"
import {
	AlertDialogFooter,
	AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { renameFolderAction } from "@/app/actions/rename-folder"

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
					{simpleFolderName === "" ? "Sin nombre" : simpleFolderName}{" "}
					<span className="text-[var(--foreground)]/30 text-xs">
						{" "}
						({assetsCount})
					</span>
				</p>
			</button>

			{folderName !== "Todas" && <DropdownMenuFolder folderName={folderName} />}
		</div>
	)
}

const DropdownMenuFolder = ({ folderName }: { folderName: string }) => {
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
					{/* 				RENAME							 */}
					<RenameFolder folderName={folderName} setOpen={setOpen} />
					<DropdownMenuSeparator />

					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-red-600 flex items-center justify-between p-3">
						eliminar <Trash2 />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const RenameFolder = ({
	folderName,
	setOpen,
}: {
	folderName: string
	setOpen: (open: boolean) => void
}) => {
	const queryClient = useQueryClient()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const newName = e.currentTarget.newName.value.trim()
		if (newName === folderName || newName === "") {
			return
		}
		startTransition(async () => {
			toast.promise(renameFolderAction(folderName, newName), {
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
					className="w-full flex items-center justify-between"
				>
					renombrar <Edit2 className="opacity-50" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[600px]">
				<AlertDialogDescription></AlertDialogDescription>
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
							defaultValue={folderName}
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
