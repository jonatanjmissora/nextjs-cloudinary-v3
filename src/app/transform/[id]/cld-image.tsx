import { useTransformUrl } from "@/lib/use-transform-url"
import { CldImage } from "next-cloudinary"

export const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {
	const url = useTransformUrl(id)

	return (
		<div className="w-full aspect-[3:2] flex-1 relative flex">
			<span className="absolute top-0 left-0 z-100">{url}</span>
			<CldImage
				sizes="100vw"
				className="object-contain"
				alt="image"
				src={url}
				fill
				preserveTransformations
				onLoad={() => setIsLoading(false)}
				// aspectRatio={isAspectRatio}

				// width="600"
				// height="300"
				// crop="fill"

				// crop="fill"
				// fill={true}

				// width="800" //Original width 900
				// height="300"
				// crop="pad" // Returns the given size with padding
				// fillBackground

				// recolor={["hair", "814343"]}

				// replaceBackground={"forrest"}
				// replace={["dog", "cat"]}

				// remove={{
				// 	prompt: "dog",
				// 	removeShadow: true,
				// }}

				// fillBackground={{
				// 	gravity: "south",
				// 	prompt: "cupcakes",
				// }}

				// zoompan="loop" // Will loop twice
			/>
		</div>
	)
}
