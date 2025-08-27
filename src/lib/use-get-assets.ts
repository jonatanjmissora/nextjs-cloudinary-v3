import { getAssets } from "../app/actions/data/get-assets"
import { useQuery } from "@tanstack/react-query"

export const useGetAssets = () => {
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

	return { isFetching, assets, error }
}
