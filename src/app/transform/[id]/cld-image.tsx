import { useTransformUrl } from "@/lib/use-transform-url"
import { CldImage } from "next-cloudinary"
import { useEffect } from "react"
import useTransformStore from "@/lib/zustand-transform"

export const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {
	const { url, isFill, width, height } = useTransformUrl(id)
	const { setResetAll } = useTransformStore()

	useEffect(() => {
		setResetAll()
	}, [setResetAll])

	return (
		<div className="w-full flex-1 flex flex-col gap-2 items-center justify-center">
			{isFill ? (
				<div className="w-full h-auto flex-1 relative flex items-center justify-center">
					<CldImage
						sizes="100vw"
						quality="90"
						priority
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
						priority
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
		</div>
	)
}
