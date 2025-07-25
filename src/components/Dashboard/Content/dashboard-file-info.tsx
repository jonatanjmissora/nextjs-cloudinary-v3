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
import { Expand } from "lucide-react"
import Image from "next/image"

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
				<div className="group flex-1 flex flex-col justify-center gap-2 p-1 sm:text-sm 2xl:text-base">
					<span className="w-1/2 truncate">{asset.display_name}</span>
					<span>{setFileDate(asset.created_at)}</span>
					<span>{setFileSize(asset.bytes)}</span>
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
				<div className="relative w-full h-[80dvh]">
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						fill
						quality={100}
						priority
						objectFit="contain"
						className=""
					/>
				</div>
				<DialogFooter className="w-full flex justify-around items-center text-[var(--foreground)]/75">
					<span>{setFileDate(asset.created_at)}</span>
					<span>{asset.display_name}</span>
					<span>{setFileSize(asset.bytes)}</span>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
