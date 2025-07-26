"use client"

import useStore from "@/lib/zustand-coudinary"
import { FilesListGrid } from "./files-list-grid"
import { FilesListList } from "./files-list-list"

export default function DashboardContentBody() {
	const { view, order, actualFolder } = useStore()

	return view === "grid" 
		? <FilesListGrid order={order} actualFolder={actualFolder} />
		: <FilesListList order={order} actualFolder={actualFolder} />
}
