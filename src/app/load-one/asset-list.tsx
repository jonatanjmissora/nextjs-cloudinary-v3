"use client"
import Image from "next/image"

import { useGetAssets } from "@/lib/use-get-assets"
import { CldImage } from "next-cloudinary"

export default function AssetList() {
	const { isFetching, assets, error } = useGetAssets()

	const newSrc = (oldSrc: string) => {
		return oldSrc.replace(/upload\//, "upload/c_scale,w_200/")
	}

	if (error) return <p>Error: {error}</p>
	if (isFetching)
		return (
			<div className="flex-1 flex flex-wrap gap-2">
				{[1, 2, 3, 4, 5, 6, 7].map(item => (
					<div
						key={item}
						className="relative w-[200px] h-[300px] bg-muted animate-pulse"
					></div>
				))}
			</div>
		)

	return (
		<div className="w-full border">
			<div className="flex-1 flex flex-wrap gap-2">
				<div className="relative w-[300px] h-[400px]">
					<CldImage
						src={assets?.[0].public_id}
						sizes="50vw"
						fill={true}
						alt={assets?.[0].public_id}
					/>
				</div>
				<CldImage
					src={assets?.[0].public_id}
					width={300}
					height={300}
					sizes="50vw"
					alt={assets?.[0].public_id}
				/>
				<div className="relative w-[300px] h-auto border flex items-center">
					<CldImage
						src={assets?.[6].public_id}
						width={300}
						height={450}
						sizes="50vw"
						alt={assets?.[6].public_id}
					/>
				</div>
			</div>
		</div>
	)
}
