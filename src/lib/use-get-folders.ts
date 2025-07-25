import { getAssets } from "./get-assets"
import { useQuery } from "@tanstack/react-query"

export const useGetFolders = () => {
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
	const folders = data?.response || []

	return { isFetching, folders, error }
}
