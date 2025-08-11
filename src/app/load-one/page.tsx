"use client"
import { useGetAssets } from "@/lib/use-get-assets"
import Image from "next/image"
import { CldImage } from "next-cloudinary"

export default function page() {
	const { isFetching, assets, error } = useGetAssets()

	if (error) return <p>Hay un error</p>
	if (isFetching) return <p>Cargando...</p>

	const assetsData = [
		{ src: assets[0].secure_url, alt: assets[0].public_id },
		{ src: assets[1].secure_url, alt: assets[1].public_id },
		{ src: assets[2].secure_url, alt: assets[2].public_id },
		{ src: assets[3].secure_url, alt: assets[3].public_id },
	]

	return (
		<div className="w-full h-screen flex items-center justify-center bg-blue-900">
			<div className="w-full flex flex-wrap border h-full">
				<h2>Next Image</h2>

				<Image
					src={assetsData[0].src}
					alt={assetsData[0].alt}
					width={300}
					height={300}
					priority
					quality={100}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<Image
					src={assetsData[1].src}
					alt={assetsData[1].alt}
					width={300}
					height={300}
					priority
					quality={100}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<Image
					src={assetsData[2].src}
					alt={assetsData[2].alt}
					width={300}
					height={300}
					priority
					quality={100}
				/>
				<Image
					src={assetsData[3].src}
					alt={assetsData[3].alt}
					width={300}
					height={300}
					priority
					quality={100}
				/>
			</div>
			<div className="w-1/2 border h-full">
				<h2>CLDImage</h2>

				<CldImage
					src="samples/breakfast"
					alt={assetsData[0].alt}
					width={300}
					height={300}
					priority
					quality={100}
				/>

				<CldImage
					src={assetsData[1].alt}
					alt={assetsData[1].alt}
					width={300}
					height={300}
					priority
					quality={100}
				/>

				<CldImage
					src={assetsData[2].alt}
					alt={assetsData[2].alt}
					width={300}
					height={300}
					priority
					quality={100}
				/>
			</div>
		</div>
	)
}
