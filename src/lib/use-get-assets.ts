import { getAssets } from "./get-assets"
import { useQuery } from "@tanstack/react-query"
import useStore from "./zustand-coudinary"
import { CloudinaryAsset } from "./types"

export const useGetAssets = () => {
	const { order, setSortedAssets } = useStore()

	const {
		isFetching,
		data,
		error: queryError,
	} = useQuery({
		queryKey: ["assets"],
		queryFn: getAssets,
		staleTime: 600 * 1000,
		refetchInterval: 600 * 1000,
		refetchIntervalInBackground: true,
	})

	const error = queryError || data?.success === false ? data?.message : null
	const assets = data?.response || []

	setSortedAssets(sortedAssetsFn(assets, order))

	return { isFetching, assets, error }
}

function sortedAssetsFn(assets: CloudinaryAsset[], order: string) {
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
