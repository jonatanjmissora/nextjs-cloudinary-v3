import { getFolders } from "../app/actions/data/get-folders"
import { useQuery } from "@tanstack/react-query"

export const useGetFolders = () => {
	const {
		isFetching,
		data,
		error: queryError,
	} = useQuery({
		queryKey: ["folders"],
		queryFn: getFolders,
		staleTime: 60 * 1000,
		// refetchInterval: 60 * 1000,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: false,
	})

	const error = queryError || data?.success === false ? data?.message : null
	const foldersTree = data?.response || []

	return { isFetching, foldersTree, error }
}
