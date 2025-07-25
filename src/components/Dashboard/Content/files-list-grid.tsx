import { CloudinaryAsset } from "@/lib/types"
import Image from "next/image"
import { DashboardFileMenu } from "./dashboard-file-menu"
import { DashboardFileInfo } from "./dashboard-file-info"

export const FilesListGrid = ({
	sortedFolders,
}: {
	sortedFolders: CloudinaryAsset[]
}) => {
	return (
		<article
			className={`w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px] gap-2`}
		>
			{sortedFolders?.map(asset => (
				<div
					key={asset.public_id}
					className={`w-full h-auto relative group border-4 border-transparent hover:border-orange-500/50`}
				>
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						objectFit="cover"
						className={`w-full`}
					/>
					<DashboardFileMenu asset={asset} view="grid" />
					<DashboardFileInfo asset={asset} view="grid" />
				</div>
			))}
		</article>
	)
}
