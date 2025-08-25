import { useTransformUrl } from "@/lib/use-transform-url"
import { CldImage } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {
	const { url, isFill, width, height } = useTransformUrl(id)

	const handleDownload = async () => {
		try {
			// Create and append the download link
			const temporaryDownloadLink = document.createElement("a")
			temporaryDownloadLink.style.display = "none"
			document.body.appendChild(temporaryDownloadLink)

			await new Promise<void>(resolve => {
				temporaryDownloadLink.href = url.replace(
					/upload\//,
					"upload/fl_attachment/"
				)
				temporaryDownloadLink.download = "image"
				temporaryDownloadLink.click()
				toast.success("Files downloaded successfully")
				resolve()
			})
		} catch (error) {
			console.error("Download error:", error)
			toast.error("Error downloading file")
		} finally {
			const link = document.querySelector('a[style*="display: none"]')
			if (link?.parentNode) {
				document.body.removeChild(link)
			}
		}
	}

	return (
		<div className="w-full flex-1 flex flex-col gap-2 items-center justify-center">
			{isFill ? (
				<div className="w-full aspect-[3:2] flex-1 relative flex items-center justify-center">
					<CldImage
						sizes="100vw"
						quality="90"
						className="object-contain"
						alt="image"
						src={url}
						preserveTransformations
						onLoad={() => setIsLoading(false)}
						fill={true}
					/>
				</div>
			) : (
				<div
					className={`w-[${width}px] h-[${height}px] relative flex items-center justify-center bg-foreground/10`}
				>
					<CldImage
						quality="90"
						className="object-contain"
						alt="image"
						src={url}
						preserveTransformations
						onLoad={() => setIsLoading(false)}
						width={width}
						height={height}
					/>
				</div>
			)}
			<span className="text-foreground/25">{url}</span>
			<Button variant="outline" onClick={handleDownload}>
				descargar
			</Button>
		</div>
	)
}
