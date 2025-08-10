"use client"
import SubmitBtn from "@/components/layout/submit-btn"
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CloudinaryAsset } from "@/lib/types"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { deleteMultipleAction } from "@/app/actions/delete-file"
import { useQueryClient } from "@tanstack/react-query"
import useStore from "@/lib/zustand-coudinary"
import { startTransition, useState } from "react"

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))

export function HeaderAssetsDelete() {
	const [open, setOpen] = useState(false)
	const { selectedAssets, setSelectedAssets } = useStore()

	const queryClient = useQueryClient()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const selectedAssetsIds = selectedAssets.map(asset => asset.public_id)
		startTransition(async () => {
			toast.promise(deleteMultipleAction(selectedAssetsIds), {
				loading: "borrando imagen(es)...",
				success: "imagen(es) borrada exitosamente",
				error: "Error al borrar imagen(es)",
			})
			setOpen(false)
			queryClient.invalidateQueries({ queryKey: ["assets"] })
			await sleep()
			setSelectedAssets([])
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="">
					<Trash2 className="" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[600px]">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-6 p-12"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							¿ Seguro deseas eliminar la(s) imagen(es) ?
						</AlertDialogTitle>
					</AlertDialogHeader>

					<AlertModalImage selectedAssets={selectedAssets} />

					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
						<SubmitBtn label="Eliminar" className="flex-1" />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}

const AlertModalImage = ({
	selectedAssets,
}: {
	selectedAssets: CloudinaryAsset[]
}) => {
	return (
		<div className="flex flex-col gap-1 overflow-y-auto h-max max-h-[300px]">
			{selectedAssets.map(asset => (
				<div key={asset.public_id} className="flex items-center gap-4">
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
			))}
		</div>
	)
}
