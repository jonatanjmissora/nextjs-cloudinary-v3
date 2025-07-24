"use client"

import Image from "next/image"
import DashboardFileMenu from "./dashboard-file-menu"
import DashboardFileInfo from "./dashboard-file-info"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetFolders } from "@/lib/use-get-folders"

export default function DashboardContentBody() {
	const { isFetching, folders, error } = useGetFolders()

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

	return (
		<article className="w-full h-full columns-[1fr] sm:columns-[200px] 2xl:columns-[300px]">
			{folders?.map(asset => (
				<div key={asset.public_id} className="w-full h-full relative group">
					<Image
						src={asset.secure_url}
						alt={asset.public_id}
						width={300}
						height={300}
						quality={100}
						priority
						objectFit="cover"
						className="w-full h-full border-4 border-transparent my-2 hover:border-[var(--foreground)]/50"
					/>
					<DashboardFileMenu asset={asset} />
					<DashboardFileInfo asset={asset} />
				</div>
			))}
		</article>
	)
}

const SkeltonList = () => {
	return (
		<>
			{Array.from({ length: 15 }, (_, index) => index + 1).map(item => (
				<div key={item} className="w-full h-full relative group">
					<Skeleton className="sm:w-[220px] sm:h-[270px] 2xl:w-[310px] 2xl:h-[370px] my-2" />
				</div>
			))}
		</>
	)
}
