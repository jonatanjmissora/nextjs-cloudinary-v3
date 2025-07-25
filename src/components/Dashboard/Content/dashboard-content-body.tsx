"use client"

import useStore from "@/lib/zustand-coudinary"
import { FilesListGrid } from "./files-list-grid"
import { FilesListList } from "./files-list-list"

export default function DashboardContentBody() {
	const { view, order } = useStore()

	if (view === "grid") return <FilesListGrid order={order} />
	else return <FilesListList order={order} />
}
