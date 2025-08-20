"use client"
import { CldImage } from "next-cloudinary"
import { useState } from "react"
import { LoaderCircle, Wand } from "lucide-react"
import { useGetAssets } from "@/lib/use-get-assets"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useTransformStore } from "@/lib/zustand-transform"

export default function ImageTransformation({ id }: { id: string }) {
	const [isLoading, setIsLoading] = useState(true)
	const { assets } = useGetAssets()
	const actualAsset = assets?.find(asset => asset.public_id === id)
 
	return (
		<article
			className={`flex flex-col items-center justify-start w-full min-h-[80dvh] flex-1 sm:px-3 2xl:px-10`}
		>
			<div className="w-full pb-5 flex items-center justify-between">
                <Link href="/" className="cursor-pointer">
                    <Button variant="outline">Volver</Button>
                </Link>
				<span className="text-2xl font-bold">{actualAsset?.display_name}</span>
                <DrawerElement />
			</div>
			{isLoading && (
				<div className="bg-muted rounded-md animate-pulse flex items-center justify-center w-[50dvh] min-h-[75dvh] flex-1 sm:px-3 2xl:px-10">
					<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/25" />
				</div>
			)}
			<ImageElement id={id} setIsLoading={setIsLoading} />
			
		</article>
	)
}

const DrawerElement = () => {
    return (
        <Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="outline"><Wand /></Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="bg-[var(--background-two)]">
					<DrawerHeader>
						<DrawerTitle></DrawerTitle>
					</DrawerHeader>
                    <TransformMenu />

					<DrawerFooter className="flex items-center justify-start h-[50dvh] flex-col gap-2 pt-30">
						
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
    )
}

const TransformMenu = () => {
    const {isGreyScale, setIsGreyScale, isBackWhite, setIsBackWhite, isSepia, setIsSepia} = useTransformStore()

    const handleGrayScale = () => {
        setIsGreyScale(!isGreyScale)
        setIsBackWhite(false)
        setIsSepia(false)
    }

    const handleBackWhite = () => {
        setIsBackWhite(!isBackWhite)
        setIsGreyScale(false)
        setIsSepia(false)
    }

    const handleSepia = () => {
        setIsSepia(!isSepia)
        setIsGreyScale(false)
        setIsBackWhite(false)
    }

    return (
        <>
            <ToggleGroup type="single">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={handleGrayScale}>
                grayscale
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={handleBackWhite}>
                back/white
            </ToggleGroupItem>
            <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={handleSepia}>
                sepia
            </ToggleGroupItem>
            </ToggleGroup>
        </>
    )
}

const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {

    const {isGreyScale, setIsGreyScale, isBackWhite, setIsBackWhite, isSepia, setIsSepia} = useTransformStore()

	return (
		<div className="w-full flex-1 relative flex">
			<CldImage
				sizes="100vw"
				className="object-contain"
				alt="image"
				src={id}
				fill
				onLoad={() => setIsLoading(false)}
				// removeBackground={true}
				// background="blueviolet"
				// underlay="cld-sample-2"

				// width="600"
				// height="300"
				// crop="fill"

				// aspectRatio="2:3"
				// crop="fill"
				// fill={true}

				// width="800" //Original width 900
				// height="300"
				// crop="pad" // Returns the given size with padding
				// fillBackground

				// recolor={["hair", "green"]}

				// restore={true}
				// brightness="20"
				// cartoonify
				// pixelateFaces
				// vectorize={true}
				// blur="500"
				// vignette={true}
                
				// opacity={50}
				sepia={isSepia}
				blackwhite={isBackWhite}
				grayscale={isGreyScale}

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
