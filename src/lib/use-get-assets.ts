import { getAssets } from "../app/actions/get-assets"
import { useQuery } from "@tanstack/react-query"
import useStore from "./zustand-cloudinary"
import { getFoldersTree } from "./utils"

export const useGetAssets = () => {
	const { setFoldersTree } = useStore()

	const {
		isFetching,
		data,
		error: queryError,
	} = useQuery({
		queryKey: ["assets"],
		queryFn: getAssets,
		staleTime: 60 * 1000,
		// refetchInterval: 60 * 1000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
	})

	const error = queryError || data?.success === false ? data?.message : null
	const assets = data?.response || []
	const folderTree = getFoldersTree(assets)
	// console.log("folderTree", folderTree)
	return { isFetching, assets, error }
}
