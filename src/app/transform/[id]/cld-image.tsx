import { useTransformUrl } from "@/lib/use-transform-url"
import { CldImage } from "next-cloudinary"

export const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {
	const { url, isFill, width, height } = useTransformUrl(id)

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
					className={`w-[${width}px] h-[${height}px] relative flex items-center justify-center border`}
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
		</div>
	)
}
