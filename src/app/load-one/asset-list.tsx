"use client"
import Image from "next/image"

import { useGetAssets } from "@/lib/use-get-assets"

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
		<div className="flex-1 flex flex-wrap gap-2">
			{assets?.slice(0, 7).map(asset => (
				<div
					key={`next-${asset.public_id}`}
					className="relative w-[200px] aspect-[3/2]"
				>
					<Image
						src={newSrc(asset.secure_url)}
						alt={asset.public_id}
						quality={90}
						width={600}
						height={600}
						priority
						className="object-cover w-full h-auto"
					/>
				</div>
			))}
		</div>
	)
}
