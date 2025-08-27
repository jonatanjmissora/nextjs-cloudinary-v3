import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CloudinaryAsset } from "@/lib/types"
import { setFileDate, setFileSize } from "@/lib/utils"
import { Expand, LoaderCircle } from "lucide-react"
import MyImage from "@/components/my-image"
import { useState } from "react"

export const DashboardFileInfo = ({
	asset,
	view,
}: {
	asset: CloudinaryAsset
	view: "grid" | "list"
}) => {
	if (view === "grid")
		return (
			<>
				<Ampliar asset={asset} />
				<div className="group left-0 absolute bottom-0 right-0 text-[var(--foreground)]/75 group-hover:opacity-100 opacity-0 bg-[var(--background)]/50 p-1 sm:text-xs 2xl:text-sm">
					<div className="flex items-center justify-center">
						<span className="w-3/4 truncate text-center">
							{asset.display_name}
						</span>
					</div>
					<div className={`flex items-center justify-between`}>
						<span>{setFileDate(asset.created_at)}</span>
						<span>{setFileSize(asset.bytes)}</span>
					</div>
				</div>
			</>
		)
	else
		return (
			<>
				<Ampliar asset={asset} />
				<div className="group flex-1 h-full flex flex-col justify-around sm:text-sm 2xl:text-base px-6 border">
					<span className="w-3/4 mx-auto">{asset.display_name}</span>
					<span className="text-xs">folder: {asset.asset_folder}</span>
					<div className="text-xs flex items-center justify-between">
						<span>{setFileDate(asset.created_at)}</span>
						<span>id:{asset.asset_id}</span>
						<span>{setFileSize(asset.bytes)}</span>
					</div>
				</div>
			</>
		)
}

const Ampliar = ({ asset }: { asset: CloudinaryAsset }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Expand className="size-8 group left-0 absolute top-0 text-[var(--foreground)]/75 group-hover:opacity-100 opacity-0 bg-[var(--background)]/50 p-2" />
			</DialogTrigger>
			<DialogContent className="max-w-6xl">
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>
				<div className="relative w-full h-[85dvh]">
					<ThumbnailWithSkeleton asset={asset} />
				</div>
				<DialogFooter className="w-full flex justify-around items-center text-[var(--foreground)]/75">
					<span>{setFileDate(asset.created_at)}</span>
					<span>
						{asset.asset_folder}/{asset.display_name}
					</span>
					<span>id: {asset.asset_id}</span>
					<span>{setFileSize(asset.bytes)}</span>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function ThumbnailWithSkeleton({ asset }: { asset: CloudinaryAsset }) {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<div className="relative w-full h-full">
			{isLoading && (
				<div className="absolute inset-0 bg-muted rounded-md animate-pulse flex items-center justify-center border">
					<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/25" />
				</div>
			)}
			<MyImage
				asset={asset}
				className="w-auto h-full object-contain"
				onLoad={() => setIsLoading(false)}
			/>
		</div>
	)
}
