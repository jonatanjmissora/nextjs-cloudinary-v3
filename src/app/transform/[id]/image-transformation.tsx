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
import { TransformMenu02 } from "./transform-menu02"
import { ImageElement } from "./cld-image"
import { TransformMenu4 } from "./transform-menu4"
import { TransformMenu5 } from "./transform-menu5"
import { Separator } from "@/components/ui/separator"
import { TransformMenu6 } from "./transform-menu6"
import { TransformMenu7 } from "./transform-menu7"
import { TransformMenu8 } from "./transform-menu8"
import { TransformMenu9 } from "./transform-menu9"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import TransformMenu10 from "../transform-menu10"
import { CloudinaryAsset } from "@/lib/types"
import TransformMenu01 from "./transform-menu-01"
import useTransformStore from "@/lib/zustand-transform"
import TransformMenu00 from "./transform-menu-00"

export default function ImageTransformation({ id }: { id: string }) {
	const [isLoading, setIsLoading] = useState(true)
	const { assets } = useGetAssets()
	const actualAsset = assets?.find(
		asset => asset.public_id === id
	) as CloudinaryAsset

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
	const { setResetAll } = useTransformStore()
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="outline">
					<Wand />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="w-full flex justify-between items-center">
						<span className="text-xl font-bold">Transformaciones</span>
						<Button onClick={setResetAll} variant="outline" className="text-xs">
							Reset
						</Button>
					</DrawerTitle>
				</DrawerHeader>
				<Accordion type="single" collapsible className="w-full px-4">
					<AccordionItem value="menu-0">
						<AccordionTrigger>Tamaño</AccordionTrigger>
						<AccordionContent>
							<TransformMenu00 />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="menu-1">
						<AccordionTrigger>Efectos</AccordionTrigger>
						<AccordionContent>
							<TransformMenu01 />
							<TransformMenu02 />
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="menu-2">
						<AccordionTrigger>Background</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-3">
							{/* <TransformMenu4 /> */}
							<Separator />
							{/* <TransformMenu6 /> */}
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="menu-3">
						<AccordionTrigger>Objetos</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-3">
							<Accordion type="single" collapsible className="px-4">
								<AccordionItem value="submenu-1">
									<AccordionTrigger>Cambiar color del objeto</AccordionTrigger>
									<AccordionContent>
										{/* <TransformMenu5 /> */}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="submenu-2">
									<AccordionTrigger>Reemplazar objeto</AccordionTrigger>
									<AccordionContent>
										{/* <TransformMenu7 /> */}
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="submenu-3">
									<AccordionTrigger>Remover objeto</AccordionTrigger>
									<AccordionContent>
										{/* <TransformMenu8 /> */}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="menu-4">
						<AccordionTrigger>Formato</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-3">
							{/* <TransformMenu10 /> */}
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<DrawerFooter></DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
