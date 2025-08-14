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
import { LoaderCircle, DownloadIcon } from "lucide-react"
import { toast } from "sonner"
import useStore from "@/lib/zustand-cloudinary"
import MyImage from "@/components/my-image"
import { useState } from "react"
import { useCallback } from "react"

export function HeaderAssetsDownload() {
	const [open, setOpen] = useState(false)
	const { selectedAssets, setSelectedAssets } = useStore()

	// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault()

	// 	await downloadMultipleAction(selectedAssets)
	// startTransition(async () => {
	// 	toast.promise(downloadMultipleAction(selectedAssets), {
	// 		loading: "descargando imagen(es)...",
	// 		success: "imagen(es) descargada exitosamente",
	// 		error: "Error al descargar imagen(es)",
	// 	})
	// 	setOpen(false)
	// 	await sleep()
	// 	setSelectedAssets([])
	// })
	// }

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			const downloadURL = (assetURL: string) =>
				assetURL.replace(/upload\//, "upload/fl_attachment/")

			const urls = selectedAssets.map(asset => downloadURL(asset.secure_url))

			try {
				// Create and append the download link
				const temporaryDownloadLink = document.createElement("a")
				temporaryDownloadLink.style.display = "none"
				document.body.appendChild(temporaryDownloadLink)

				// Process downloads sequentially with delay
				for (let i = 0; i < urls.length; i++) {
					await new Promise<void>(resolve => {
						temporaryDownloadLink.href = urls[i]
						temporaryDownloadLink.download =
							urls[i].split("/").pop() || "download"
						temporaryDownloadLink.click()

						// Small delay between downloads
						setTimeout(
							() => {
								resolve()
							},
							300 + i * 100
						)
					})
				}

				// Show success message
				toast.success("Files downloaded successfully")
				setSelectedAssets([])
			} catch (error) {
				console.error("Download error:", error)
				toast.error("Error downloading files")
			} finally {
				// Clean up the temporary link if it exists
				const links = document.querySelectorAll('a[style*="display: none"]')
				links.forEach(link => {
					if (link?.parentNode) {
						document.body.removeChild(link)
					}
				})

				// Close the dialog after download
				setOpen(false)
			}
		},
		[selectedAssets, setSelectedAssets]
	)

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer">
					<DownloadIcon />
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
							¿ Seguro deseas descargar la(s) imagen(es) ?
						</AlertDialogTitle>
					</AlertDialogHeader>

					<AlertModalImage selectedAssets={selectedAssets} />

					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
						<SubmitBtn label="Descargar" className="flex-1" />
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
	// const downloadURL = (assetURL: string) =>
	// 	assetURL.replace(/upload\//, "upload/fl_attachment/")

	return (
		<div className="flex flex-col gap-1 overflow-y-auto h-max max-h-[300px] px-1">
			{selectedAssets.map(asset => (
				<div
					key={asset.public_id}
					className="flex items-center gap-4 rounded-md bg-muted/20"
				>
					<ThumbnailWithSkeleton asset={asset} />
					<span className="truncate max-w-[200px]">
						{asset.display_name || asset.public_id.split("/").pop()}
					</span>
					{/* <a
						className=""
						id={asset.public_id}
						href={downloadURL(asset.secure_url)}
					>
						download
					</a> */}
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
