import Image from "next/image"
import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"
import { useGetAssets } from "@/lib/use-get-assets"
// import { Skeleton } from "@/components/ui/skeleton"
import { sortedAssetsFn } from "@/lib/sorted-assets"
import useStore from "@/lib/zustand-cloudinary"
import { CloudinaryAsset } from "@/lib/types"
import { LoaderCircle } from "lucide-react"

export const FilesListList = ({
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
			className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 m-3`}
		>
			{filteredAssets?.map(asset => (
				<button
					key={asset.public_id}
					className={`w-full h-full relative group border-2 flex items-center justify-center rounded-lg overflow-hidden ${selectedAssetsNames.includes(asset.public_id) ? "bg-orange-500/30" : "bg-transparent hover:bg-[var(--foreground)]/10"}`}
					onClick={() => handleSelectAsset(asset)}
				>
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						className={`w-[150px] h-[150px] object-cover`}
					/>
					<DashboardFileMenu view="list" asset={asset} />
					<DashboardFileInfo asset={asset} view="list" />
				</button>
			))}
		</article>
	)
}

const ErrorComponent = ({ error }: { error: string }) => {
	console.log("error en FilesListList - error: ", error)
	return (
		<article className="w-full h-[70dvh] flex justify-center items-center">
			<p className="text-red-700 text-xl font-semibold">{error}</p>
		</article>
	)
}

const SkeltonList = () => {
	return (
		<article
			className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 m-3`}
		>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div
					key={item}
					className={`w-full h-full relative group border-2 flex items-center justify-start rounded-lg overflow-hidden`}
				>
					{/* <Skeleton className={`w-[150px] h-[150px] object-cover mr-auto`} /> */}
					<div className="w-[150px] h-[150px] bg-muted rounded-md animate-pulse flex items-center justify-center">
						<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/15" />
					</div>
				</div>
			))}
		</article>
	)
}
