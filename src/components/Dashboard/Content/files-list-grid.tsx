import Image from "next/image"
import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"
import { useGetAssets } from "@/lib/use-get-assets"
import { sortedAssetsFn } from "@/lib/sorted-assets"
import { Skeleton } from "@/components/ui/skeleton"
import useStore from "@/lib/zustand-coudinary"
import { CloudinaryAsset } from "@/lib/types"

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
			className={`w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px] gap-2`}
		>
			{filteredAssets?.map(asset => (
				<div
					key={asset.public_id}
					className={`w-full h-auto relative group border-4 ${selectedAssetsNames.includes(asset.public_id) ? "border-orange-500/75" : "border-transparent hover:border-[var(--foreground)]/75"}`}
				>
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
		<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px]">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div key={item} className="w-full h-full relative group">
					<Skeleton className="sm:w-[220px] sm:h-[270px] 2xl:w-[310px] 2xl:h-[370px] my-2" />
				</div>
			))}
		</article>
	)
}
