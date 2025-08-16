"use client"

import { useGetAssets } from "@/lib/use-get-assets"
import MyImage from "@/components/my-image"
import AssetList from "./asset-list"

export default function LoadOnePage() {
	const { isFetching, assets } = useGetAssets()

	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-blue-900 p-4">
			<div className="w-full flex flex-col gap-1">
				<AssetList />

				{isFetching ? (
					<LoadingList />
				) : (
					<div className="flex-1 flex flex-wrap gap-2">
						{assets?.slice(0, 7).map(asset => (
							<div
								key={asset.public_id}
								className="relative w-[200px] h-[150px]"
							>
								<MyImage asset={asset} width={600} priority />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const LoadingList = () => {
	return (
		<div className="flex-1 flex flex-wrap gap-2">
			{[1, 2, 3, 4, 5, 6, 7].map(item => (
				<div
					key={item}
					className="relative w-[200px] aspect-[3/2] bg-muted animate-pulse"
				></div>
			))}
		</div>
	)
}
