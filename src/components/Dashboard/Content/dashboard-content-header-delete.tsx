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
import { CloudinaryAsset } from "@/lib/types"
import { LoaderCircle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteMultipleAction } from "@/app/actions/delete-file"
import { useQueryClient } from "@tanstack/react-query"
import useStore from "@/lib/zustand-cloudinary"
import { startTransition, useState } from "react"
import MyImage from "@/components/my-image"

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
			startTransition(() => {
				setOpen(false)
				queryClient.invalidateQueries()
				setSelectedAssets([])
			})
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					<Trash2 className="" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-[600px]">
				<AlertDialogDescription className="hidden">
					Eliminacion de imagenes
				</AlertDialogDescription>
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-6 p-12"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							¿ Seguro deseas eliminar la{selectedAssets.length > 1 ? "s" : ""}{" "}
							imagen{selectedAssets.length > 1 ? "es" : ""} ?
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
		<div className="flex flex-col gap-1 overflow-y-auto h-max max-h-[300px] px-1">
			{selectedAssets.map(asset => (
				<div key={asset.public_id} className="flex items-center gap-4">
					<ThumbnailWithSkeleton asset={asset} />
					<span className="truncate max-w-[200px]">
						{asset.display_name || asset.public_id.split("/").pop()}
					</span>
				</div>
			))}
		</div>
	)
}

function ThumbnailWithSkeleton({ asset }: { asset: CloudinaryAsset }) {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className="relative size-[75px]">
			{isLoading && (
				<div className="absolute inset-0 bg-muted rounded-md animate-pulse flex items-center justify-center border">
					<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/25" />
				</div>
			)}
			<MyImage
				asset={asset}
				width={150}
				className={"h-full w-full border rounded-md object-cover"}
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	)
}
