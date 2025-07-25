"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useGetFolders } from "@/lib/use-get-folders"
import useStore from "@/lib/zustand-coudinary"
import { sortedAssets } from "@/lib/sorted-assets"
import { FilesListGrid } from "./files-list-grid"
import { FilesListList } from "./files-list-list"

export default function DashboardContentBody() {
	const { isFetching, folders, error } = useGetFolders()
	const {view, order} = useStore()

	if (error) {
		console.error("error en DashboardContentBody - error: ", error)
		return (
			<article className="w-full h-[70dvh] flex justify-center items-center">
				<p className="text-red-700 text-xl font-semibold">{error}</p>
			</article>
		)
	}

	if (isFetching) {
		return (
			<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px]">
				<SkeltonList />
			</article>
		)
	}

	const sortedFolders = sortedAssets(folders, order)
	if(view === "grid") 
		return <FilesListGrid sortedFolders={sortedFolders} />
	else 
		return <FilesListList sortedFolders={sortedFolders}/>
}

const SkeltonList = () => {
	return (
		<>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
				<div key={item} className="w-full h-full relative group">
					<Skeleton className="sm:w-[220px] sm:h-[270px] 2xl:w-[310px] 2xl:h-[370px] my-2" />
				</div>
			))}
		</>
	)
}