"use client"

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
import { TransformMenu1 } from "./transform-menu1"
import { TransformMenu2 } from "./transform-menu2"
import { TransformMenu3 } from "./transform-menu3"
import { ImageElement } from "./cld-image"
import { TransformMenu4 } from "./transform-menu4"
import { TransformMenu5 } from "./transform-menu5"
import { Separator } from "@/components/ui/separator"
import { TransformMenu6 } from "./transform-menu6"
import { TransformMenu7 } from "./transform-menu7"
import { TransformMenu8 } from "./transform-menu8"

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
				<DrawerHeader>
					<DrawerTitle className="text-xl font-bold w-full text-center">
						Transformaciones
					</DrawerTitle>
				</DrawerHeader>

				<div className="flex flex-col gap-3">
					{/* <TransformMenu1 />
					<Separator />
					<TransformMenu2 />
					<Separator />
					<TransformMenu3 />
					<Separator />
					<TransformMenu4 />
					<Separator />
					<TransformMenu5 />
					<Separator /> */}
					<TransformMenu6 />
					<Separator />
					<TransformMenu7 />
					<Separator />
					<TransformMenu8 />
				</div>

				<DrawerFooter></DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
