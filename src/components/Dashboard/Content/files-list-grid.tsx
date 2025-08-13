import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"
import { useGetAssets } from "@/lib/use-get-assets"
import { sortedAssetsFn } from "@/lib/sorted-assets"
// import { Skeleton } from "@/components/ui/skeleton"
import useStore from "@/lib/zustand-coudinary"
import { CloudinaryAsset } from "@/lib/types"
// import MyImage from "@/components/my-image"
// import { useState } from "react"
import Image from "next/image"
import { LoaderCircle } from "lucide-react"

export const FilesListGrid = ({
	order,
	actualFolder,
}: {
	order: "name" | "size" | "date"
	actualFolder: string
}) => {
	const { isFetching, assets, error } = useGetAssets()
	const { selectedAssets, setSelectedAssets } = useStore()

	if (error) return <ErrorComponent error={error} />
	if (isFetching) return <SkeltonList />

	const sortedAssets = sortedAssetsFn(assets, order)
	const filteredAssets =
		actualFolder === "Todas"
			? sortedAssets
			: sortedAssets.filter(asset => asset.asset_folder === actualFolder)

	const selectedAssetsNames = selectedAssets.map(asset => asset.public_id)

	const handleSelectAsset = (asset: CloudinaryAsset) => {
		if (selectedAssetsNames.includes(asset.public_id)) {
			setSelectedAssets(
				selectedAssets.filter(
					assetElement => assetElement.public_id !== asset.public_id
				)
			)
		} else {
			setSelectedAssets([...selectedAssets, asset])
		}
	}

	return (
		<article
			className={`w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px] gap-x-1`}
		>
			{filteredAssets?.map(asset => (
				<div
					key={asset.public_id}
					className={`w-full h-auto relative group border-4 ${selectedAssetsNames.includes(asset.public_id) ? "border-orange-500/75" : "border-transparent hover:border-[var(--foreground)]/75"} mb-1`}
				>
					{/* <ThumbnailWithSkeleton
						asset={asset}
						handleSelectAsset={handleSelectAsset}
					/> */}
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						className={`w-full object-cover`}
						onClick={() => handleSelectAsset(asset)}
					/>
					<DashboardFileMenu view="grid" asset={asset} />
					<DashboardFileInfo asset={asset} view="grid" />
				</div>
			))}
		</article>
	)
}

const ErrorComponent = ({ error }: { error: string }) => {
	console.log("error en FilesListGrid - error: ", error)
	return (
		<article className="w-full h-[70dvh] flex justify-center items-center">
			<p className="text-red-700 text-xl font-semibold">{error}</p>
		</article>
	)
}

const SkeltonList = () => {
	return (
		<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px] gap-x-1">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div key={item} className="relative w-full h-full">
					<div className="sm:w-[230px] sm:h-[270px] 2xl:w-[310px] 2xl:h-[370px] my-3 bg-muted rounded-md animate-pulse flex items-center justify-center">
						<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/15" />
					</div>
				</div>
			))}
		</article>
	)
}

// function ThumbnailWithSkeleton({
// 	asset,
// 	handleSelectAsset,
// }: {
// 	asset: CloudinaryAsset
// 	handleSelectAsset: (asset: CloudinaryAsset) => void
// }) {
// 	const [isLoading, setIsLoading] = useState(true)

// 	return (
// 		<div className="relative w-full h-full">
// 			{isLoading && (
// 				<div className="absolute inset-0 bg-muted rounded-md animate-pulse flex items-center justify-center border">
// 					<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/25" />
// 				</div>
// 			)}
// 			<MyImage
// 				asset={asset}
// 				width={600}
// 				priority
// 				onClick={() => handleSelectAsset(asset)}
// 				onLoad={() => setIsLoading(false)}
// 			/>
// 		</div>
// 	)
// }
