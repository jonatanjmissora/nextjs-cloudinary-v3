import { CloudinaryAsset } from "@/lib/types"
import { setFileDate, setFileSize } from "@/lib/utils"

export const DashboardFileInfo = ({
	asset,
	view,
}: {
	asset: CloudinaryAsset
	view: "grid" | "list"
}) => {

	if(view === "grid") 
		return (
			<div className="group left-0 absolute bottom-0 right-0 text-black group-hover:opacity-100 opacity-0 bg-[var(--foreground)]/50 p-1 sm:text-xs 2xl:text-sm">
				<div className="flex items-center justify-center">
					<span className="w-3/4 truncate text-center">{asset.display_name}</span>
				</div>
				<div className={`flex items-center justify-between`}>
					<span>{setFileDate(asset.created_at)}</span>
					<span>{setFileSize(asset.bytes)}</span>
				</div>
			</div>
		)
	else 
		return (
			<div className="group flex-1 flex flex-col justify-center gap-2 p-1 sm:text-sm2xl:text-base">
				<span className="w-1/2 truncate">{asset.display_name}</span>
				<span>{setFileDate(asset.created_at)}</span>
				<span>{setFileSize(asset.bytes)}</span>
			</div>
		)
}
