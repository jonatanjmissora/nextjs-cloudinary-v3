"use client"
import SubmitBtn from "@/components/layout/submit-btn"
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FolderInput } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import useStore from "@/lib/zustand-cloudinary"
import { startTransition, useState } from "react"
import { sleep } from "@/lib/utils"
import { moveMultipleAction } from "@/app/actions/move-files"
import FolderTree from "./folder-tree"

export function HeaderAssetsMove() {
	const [open, setOpen] = useState(false)
	const { selectedAssets, setSelectedAssets } = useStore()
	const [selectedMoveFolder, setSelectedMoveFolder] = useState<string | null>(
		null
	)

	const queryClient = useQueryClient()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!selectedMoveFolder) {
			toast.error("Por favor, selecciona una carpeta")
			return
		}
		const selectedAssetsIds = selectedAssets.map(asset => asset.public_id)
		startTransition(async () => {
			toast.promise(moveMultipleAction(selectedAssetsIds, selectedMoveFolder), {
				loading: "moviendo imagen(es)...",
				success: "imagen(es) movida(s) exitosamente",
				error: "Error al mover imagen(es)",
			})
			setOpen(false)
			queryClient.invalidateQueries()
			await sleep()
			setSelectedAssets([])
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					<FolderInput className="" />
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
							¿ Seguro deseas mover {selectedAssets.length} imagen
							{selectedAssets.length > 1 ? "es" : ""} a ?
						</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="flex flex-wrap gap-2">
						{selectedAssets.map(asset => (
							<p
								key={asset.public_id}
								className="px-2 py-1 bg-muted/50 rounded-md"
							>
								{asset.display_name}.{asset.format}
							</p>
						))}
					</div>

					<FolderTree setSelectedMoveFolder={setSelectedMoveFolder} />
					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
						<SubmitBtn label="Mover" className="flex-1" />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
