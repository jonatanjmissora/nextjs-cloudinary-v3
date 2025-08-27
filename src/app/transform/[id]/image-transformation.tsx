"use client"

import { useState } from "react"
import { LoaderCircle, Wand } from "lucide-react"
import { useGetAssets } from "@/lib/use-get-assets"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { TransformMenu02 } from "./transform-menu-02"
import { ImageElement } from "./cld-image"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { CloudinaryAsset } from "@/lib/types"
import TransformMenu01 from "./transform-menu-01"
import useTransformStore from "@/lib/zustand-transform"
import TransformMenu00 from "./transform-menu-00"
import TransformMenu03 from "./transform-menu-03"
import TransformMenu04 from "./transform-menu-04"
import TransformMenu05 from "./transform-menu-05"
import TransformMenu06 from "./transform-menu-06"
import TransformMenu07 from "./transform-menu-07"
import TransformMenu08 from "./transform-menu-08"
import { useTransformUrl } from "@/lib/use-transform-url"
import { toast } from "sonner"

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
				<Link href="/">
					<Button variant="outline" className="cursor-pointer">
						Volver
					</Button>
				</Link>
				<span className="text-2xl font-bold">{actualAsset?.display_name}</span>
				<DrawerElement id={id} />
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

const DrawerElement = ({ id }: { id: string }) => {
	const { setResetAll } = useTransformStore()
	const { url } = useTransformUrl(id)

	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<Button variant="outline" className="cursor-pointer">
					<Wand />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="h-full flex flex-col overflow-y-auto">
					<DrawerHeader>
						<DrawerDescription></DrawerDescription>
						<DrawerTitle className="w-full flex justify-between items-center">
							<span className="text-xl font-bold">Transformaciones</span>
							<Button
								onClick={setResetAll}
								variant="outline"
								className="text-xs"
							>
								Reset
							</Button>
						</DrawerTitle>
					</DrawerHeader>
					<Accordion type="single" collapsible className="w-full px-4">
						{/* 					TAMAÑO 								*/}
						<AccordionItem value="menu-0">
							<AccordionTrigger>Tamaño</AccordionTrigger>
							<AccordionContent>
								<TransformMenu00 />
							</AccordionContent>
						</AccordionItem>

						{/* 					EFECTOS 								*/}
						<AccordionItem value="menu-1">
							<AccordionTrigger>Efectos</AccordionTrigger>
							<AccordionContent>
								<TransformMenu01 />
								<TransformMenu02 />
							</AccordionContent>
						</AccordionItem>

						{/* 					BACKGROUND 								*/}
						<AccordionItem value="menu-2">
							<AccordionTrigger>Background</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-3">
								<Accordion
									type="single"
									collapsible
									className="px-4 bg-muted/30 border"
								>
									<AccordionItem value="submenu-1-1">
										<AccordionTrigger>Remover background</AccordionTrigger>
										<AccordionContent>
											<TransformMenu03 />
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="submenu-1-2">
										<AccordionTrigger>
											Reemplazar background con IA
										</AccordionTrigger>
										<AccordionContent>
											<TransformMenu04 />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</AccordionContent>
						</AccordionItem>

						{/* 					OBJECT 								*/}
						<AccordionItem value="menu-3">
							<AccordionTrigger>Objetos</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-3">
								<Accordion
									type="single"
									collapsible
									className="px-4 bg-muted/30 border"
								>
									<AccordionItem value="submenu-2-1">
										<AccordionTrigger>
											Cambiar color del objeto
										</AccordionTrigger>
										<AccordionContent>
											<TransformMenu05 />
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="submenu-2-2">
										<AccordionTrigger>Reemplazar objeto</AccordionTrigger>
										<AccordionContent>
											<TransformMenu06 />
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="submenu-2-3">
										<AccordionTrigger>Remover objeto</AccordionTrigger>
										<AccordionContent>
											<TransformMenu07 />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</AccordionContent>
						</AccordionItem>

						{/* 						FORMATO 							*/}
						<AccordionItem value="menu-4">
							<AccordionTrigger>Formato</AccordionTrigger>
							<AccordionContent className="flex flex-col gap-3">
								<TransformMenu08 />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<DrawerFooter>
						<DownloadButton url={url} />
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

const DownloadButton = ({ url }: { url: string }) => {
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
		<>
			<Button
				variant="outline"
				onClick={handleDownload}
				className="cursor-pointer"
			>
				descargar
			</Button>
			<p className="text-xs w-full wrap-anywhere text-foreground/40">{url}</p>
		</>
	)
}
