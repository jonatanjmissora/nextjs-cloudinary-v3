import Image from "next/image"
import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"
import { useGetAssets } from "@/lib/use-get-assets"
import { Skeleton } from "@/components/ui/skeleton"
import { sortedAssetsFn } from "@/lib/sorted-assets"

export const FilesListList = ({
	order,
	actualFolder,
}: {
	order: "name" | "size" | "date"
	actualFolder: string
}) => {
	const { isFetching, assets, error } = useGetAssets()
	
		if (error) return <ErrorComponent error={error} />
	
		if (isFetching) return <SkeltonList />
	
		const sortedAssets = sortedAssetsFn(assets, order)

	return (
		<article
			className={`w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 my-3`}
		>
			{sortedAssets?.map(asset => (
				<div
					key={asset.public_id}
					className={`w-full h-full relative group border-2 p-2 flex items-center gap-20 rounded-lg hover:border-orange-500/50 overflow-hidden`}
				>
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						objectFit="cover"
						className={`ml-8 w-[150px] h-[150px] object-cover`}
					/>
					<DashboardFileMenu view="list" />
					<DashboardFileInfo asset={asset} view="list" />
				</div>
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
		<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px]">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div
					key={item}
					className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 my-3"
				>
					<div
						className={`w-full h-full relative border-2 p-2 flex items-center gap-20 rounded-lg overflow-hidden`}
					>
						<Skeleton className={`ml-8 w-[150px] h-[150px] bg-red-500`} />
					</div>
				</div>
			))}
		</article>
	)
}
