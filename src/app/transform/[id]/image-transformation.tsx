"use client"
import { CldImage } from "next-cloudinary"
import { useState } from "react"
import { LoaderCircle, Wand } from "lucide-react"
import { useGetAssets } from "@/lib/use-get-assets"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
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
				<Button variant="outline">
					<Wand />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="bg-[var(--background-two)]">
					<DrawerHeader>
						<DrawerTitle></DrawerTitle>
					</DrawerHeader>

					<div className="flex flex-col gap-3">
						<TransformMenu1 />
						<TransformMenu2 />
						<TransformMenu3 />
					</div>

					<DrawerFooter className="flex items-center justify-start h-[50dvh] flex-col gap-2 pt-30"></DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

const TransformMenu1 = () => {
	const {
		isGreyScale,
		setIsGreyScale,
		isBackWhite,
		setIsBackWhite,
		isSepia,
		setIsSepia,
	} = useTransformStore()

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

	const handleClear = () => {
		setIsGreyScale(false)
		setIsBackWhite(false)
		setIsSepia(false)
	}

	return (
		<ToggleGroup
			type="single"
			defaultValue="clear"
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="grayscale"
				aria-label="Toggle grayscale"
				onClick={handleGrayScale}
			>
				grayscale
			</ToggleGroupItem>
			<ToggleGroupItem
				value="backandwhite"
				aria-label="Toggle backandwhite"
				onClick={handleBackWhite}
			>
				back/white
			</ToggleGroupItem>
			<ToggleGroupItem
				value="sepia"
				aria-label="Toggle sepia"
				onClick={handleSepia}
			>
				sepia
			</ToggleGroupItem>
			<ToggleGroupItem
				value="clear"
				aria-label="Toggle clear"
				onClick={handleClear}
			>
				original
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

const TransformMenu2 = () => {
	const {
		isCartoonify,
		setIsCartoonify,
		isVectorize,
		setIsVectorize,
		isVignette,
		setIsVignette,
	} = useTransformStore()

	const handleCartoonify = () => {
		setIsCartoonify(!isCartoonify)
		setIsVectorize(false)
		setIsVignette(false)
	}

	const handleVectorize = () => {
		setIsVectorize(!isVectorize)
		setIsCartoonify(false)
		setIsVignette(false)
	}

	const handleVignette = () => {
		setIsVignette(!isVignette)
		setIsCartoonify(false)
		setIsVectorize(false)
	}

	const handleClear = () => {
		setIsCartoonify(false)
		setIsVectorize(false)
		setIsVignette(false)
	}

	return (
		<ToggleGroup
			type="single"
			defaultValue="clear"
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="cartoonify"
				aria-label="Toggle grayscale"
				onClick={handleCartoonify}
			>
				cartoon
			</ToggleGroupItem>
			<ToggleGroupItem
				value="vectorize"
				aria-label="Toggle backandwhite"
				onClick={handleVectorize}
			>
				vector
			</ToggleGroupItem>
			<ToggleGroupItem
				value="vignette"
				aria-label="Toggle sepia"
				onClick={handleVignette}
			>
				viñeta
			</ToggleGroupItem>
			<ToggleGroupItem
				value="clear"
				aria-label="Toggle clear"
				onClick={handleClear}
			>
				original
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

const TransformMenu3 = () => {
	const { setIsOpacity, setIsBrightness, isRestore, setIsRestore } =
		useTransformStore()

	const handleOpacity = () => {
		setIsOpacity("50")
		setIsBrightness("0")
		setIsRestore(false)
	}

	const handleBrightness = () => {
		setIsBrightness("10")
		setIsOpacity("100")
		setIsRestore(false)
	}

	const handleRestore = () => {
		setIsRestore(!isRestore)
		setIsOpacity("100")
		setIsBrightness("0")
	}

	const handleClear = () => {
		setIsOpacity("100")
		setIsBrightness("0")
		setIsRestore(false)
	}

	return (
		<ToggleGroup
			type="single"
			defaultValue="clear"
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="opacity"
				aria-label="Toggle grayscale"
				onClick={handleOpacity}
			>
				opacity
			</ToggleGroupItem>
			<ToggleGroupItem
				value="brightness"
				aria-label="Toggle backandwhite"
				onClick={handleBrightness}
			>
				brillo
			</ToggleGroupItem>
			<ToggleGroupItem
				value="restore"
				aria-label="Toggle sepia"
				onClick={handleRestore}
			>
				mejorar
			</ToggleGroupItem>
			<ToggleGroupItem
				value="clear"
				aria-label="Toggle clear"
				onClick={handleClear}
			>
				original
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

const ImageElement = ({
	id,
	setIsLoading,
}: {
	id: string
	setIsLoading: (isLoading: boolean) => void
}) => {
	const {
		isGreyScale,
		isBackWhite,
		isSepia,
		isCartoonify,
		isVectorize,
		isVignette,
		isOpacity,
		isBrightness,
		isRestore,
		isAspectRatio,
	} = useTransformStore()

	return (
		<div className="w-full aspect-[3:2] flex-1 relative flex">
			<CldImage
				sizes="100vw"
				className="object-contain"
				alt="image"
				src={id}
				fill
				onLoad={() => setIsLoading(false)}
				sepia={isSepia}
				blackwhite={isBackWhite}
				grayscale={isGreyScale}
				cartoonify={isCartoonify}
				vectorize={isVectorize}
				vignette={isVignette}
				opacity={isOpacity}
				brightness={isBrightness}
				restore={isRestore}
				aspectRatio={isAspectRatio}

				// removeBackground={true}
				// background="blueviolet"
				// underlay="cld-sample-2"

				// width="600"
				// height="300"
				// crop="fill"

				// crop="fill"
				// fill={true}

				// width="800" //Original width 900
				// height="300"
				// crop="pad" // Returns the given size with padding
				// fillBackground

				// recolor={["hair", "green"]}

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
