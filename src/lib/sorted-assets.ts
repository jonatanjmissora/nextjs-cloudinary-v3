import { CloudinaryAsset } from "./types"

export const sortedAssetsFn = (assets: CloudinaryAsset[], order: string) => {
	return assets.sort((a, b) => {
		if (order === "name") {
			return a.public_id.localeCompare(b.public_id)
		}
		if (order === "date") {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		}
		if (order === "size") {
			return a.bytes - b.bytes
		}
		return 0
	})
}
