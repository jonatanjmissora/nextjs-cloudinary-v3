import { CloudinaryAsset } from "@/lib/types"
import { setFileDate, setFileSize } from "@/lib/utils"

export default function DashboardFileInfo({
	asset,
}: {
	asset: CloudinaryAsset
}) {
	return (
		<div className="absolute bottom-1 left-1 right-1 flex items-center justify-between text-black group-hover:opacity-100 opacity-0 bg-[var(--foreground)]/50 p-2 sm:text-xs 2xl:text-sm">
			<span>{setFileDate(asset.created_at)}</span>
			<span>{setFileSize(asset.bytes)}</span>
		</div>
	)
}
