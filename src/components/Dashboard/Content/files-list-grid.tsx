import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"
import { useGetAssets } from "@/lib/use-get-assets"
import { sortedAssetsFn } from "@/lib/sorted-assets"
// import { Skeleton } from "@/components/ui/skeleton"
import useStore from "@/lib/zustand-cloudinary"
import { CloudinaryAsset } from "@/lib/types"
// import MyImage from "@/components/my-image"
// import { useState } from "react"
import Image from "next/image"
import { LoaderCircle } from "lucide-react"
import { CldImage } from "next-cloudinary"

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
		<GridLayout>
			{filteredAssets?.map(asset => (
				<div
					key={asset.public_id}
					className={`w-full h-auto relative group border-4 ${selectedAssetsNames.includes(asset.public_id) ? "border-orange-500/75" : "border-transparent hover:border-[var(--foreground)]/75"} mb-1`}
				>
					<CldImage
						src={asset.secure_url}
						width={600}
						height={600}
						sizes="50vw"
						alt={asset.public_id}
						onClick={() => handleSelectAsset(asset)}
					/>
					{/* <Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={600}
						height={600}
						quality={90}
						priority
						className={`w-full object-cover`}
						onClick={() => handleSelectAsset(asset)}
					/> */}
					<DashboardFileMenu view="grid" asset={asset} />
					<DashboardFileInfo asset={asset} view="grid" />
				</div>
			))}
		</GridLayout>
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

const GridLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px] gap-x-1">
			{children}
		</article>
	)
}

const SkeltonList = () => {
	return (
		<GridLayout>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div key={item} className="relative w-full h-full">
					<div className="sm:w-[230px] sm:h-[270px] 2xl:w-[345px] 2xl:h-[370px] my-3 bg-muted rounded-md animate-pulse flex items-center justify-center">
						<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/15" />
					</div>
				</div>
			))}
		</GridLayout>
	)
}
