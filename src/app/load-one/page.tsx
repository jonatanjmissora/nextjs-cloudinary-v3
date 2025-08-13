"use client"
import Image from "next/image"
import { CldImage } from "next-cloudinary"
import pic001 from "../assets/pic001.jpg"
import pic002 from "../assets/pic002.jpg"
import { useGetAssets } from "@/lib/use-get-assets"

export default function LoadOnePage() {
	const { isFetching, assets, error } = useGetAssets()
	// const assetsData = [
	// 	{
	// 		secure_url:
	// 			"https://res.cloudinary.com/dfvzvdpfa/image/upload/zdu9flifeccyo3nyto9e.jpg",
	// 		public_id: "zdu9flifeccyo3nyto9e",
	// 	},
	// 	{
	// 		secure_url:
	// 			"https://res.cloudinary.com/dfvzvdpfa/image/upload/ac0e2oqzhxrc4cb83jdl.jpg",
	// 		public_id: "ac0e2oqzhxrc4cb83jdl",
	// 	},
	// ]

	if (isFetching) return <p>Cargando...</p>
	if (error) return <p>Error: {error}</p>

	const newSrc = (oldSrc: string) => {
		return oldSrc.replace(/upload\//, "upload/c_scale,w_200/")
	}

	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-blue-900 p-4">
			<a href="https://res.cloudinary.com/dfvzvdpfa/image/upload/e_grayscale/fl_attachment/v1748820180/cld-sample-4.jpg ">
				Download
			</a>
			<div className="w-full flex gap-1">
				<div className="flex-1 flex flex-wrap gap-2">
					<h2>Next.js Image with Cloudinary</h2>
					{assets?.map(asset => (
						<div
							key={`next-${asset.public_id}`}
							className="relative w-[200px] aspect-[3/2]"
						>
							<Image
								src={newSrc(asset.secure_url)}
								alt={asset.public_id}
								fill
								priority
								className="object-cover w-full h-auto"
							/>
						</div>
					))}
				</div>

				{/* <div className="flex-1 flex flex-col gap-2">
					<h2>CldImage</h2>
					{assetsData.map(asset => (
						<div
							key={`cld-${asset.public_id}`}
							className="relative w-full aspect-[3/2]"
						>
							<CldImage
								src={asset.public_id}
								alt={asset.public_id}
								fill
								priority
							/>
						</div>
					))}
				</div> */}

				{/* <div className="flex-1 flex flex-col gap-2">
					<h2>Next.js Image local</h2>
					<div className="relative w-full aspect-[3/2]">
						<Image src="/001.jpg" alt="001.jpg" fill priority />
					</div>
					<div className="relative w-full aspect-[3/2]">
						<Image src="/002.jpg" alt="002.jpg" fill priority />
					</div>
				</div> */}

				{/* <div className="flex-1 flex flex-col gap-2">
					<h2>Next.js Image static</h2>
					<div className="relative w-full aspect-[3/2]">
						<Image src={pic001} alt="001.jpg" priority placeholder="blur" />
					</div>
					<div className="relative w-full aspect-[3/2]">
						<Image src={pic002} alt="002.jpg" priority placeholder="blur" />
					</div>
				</div> */}
			</div>
		</div>
	)
}
