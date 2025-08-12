import { CloudinaryAsset } from "@/lib/types"
import Image from "next/image"

interface ImageProps {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	priority?: boolean
	quality?: number
	fill?: boolean
	onClick?: () => void
	onLoad?: () => void
}

interface MyImageProps
	extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
	asset: CloudinaryAsset
	width?: number
	className?: string
}

export default function MyImage({
	asset,
	width,
	onLoad,
	className,
	...props
}: MyImageProps) {
	const newSrc = (oldSrc: string, width?: number) => {
		return oldSrc.replace(/upload\//, `upload/c_scale,w_${width}/`)
	}

	if (width) {
		return (
			<Image
				src={newSrc(asset.secure_url, width)}
				alt={asset.public_id}
				width={width}
				height={width}
				quality={90}
				className={`w-full h-auto ${className}`}
				onLoad={onLoad}
				{...props}
			/>
		)
	}

	return (
		<Image
			src={asset.secure_url}
			alt={asset.public_id}
			fill
			quality={90}
			className={`w-full h-auto ${className}`}
			onLoad={onLoad}
			{...props}
		/>
	)
}
