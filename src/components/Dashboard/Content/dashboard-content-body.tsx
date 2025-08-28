"use client"

import useStore from "@/lib/zustand-cloudinary"
import { FilesListGrid } from "./files-list-grid"
import { FilesListList } from "./files-list-list"
import { LoaderCircle } from "lucide-react"

export default function DashboardContentBody() {
	const { view, order, actualFolder, search } = useStore()

	if (!view)
		return (
			<div className="w-full h-[60dvh] flex justify-center items-center">
				<LoaderCircle className="size-[7vw] p-5 animate-spin text-[var(--foreground)]/15" />
			</div>
		)
	return view === "grid" ? (
		<FilesListGrid order={order} actualFolder={actualFolder} search={search} />
	) : (
		<FilesListList order={order} actualFolder={actualFolder} search={search} />
	)
}
