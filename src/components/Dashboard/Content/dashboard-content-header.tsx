"use client"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
	ArrowDownAZ,
	ArrowDownNarrowWide,
	CalendarArrowDown,
	LayoutDashboard,
	SlashIcon,
	StretchHorizontal,
} from "lucide-react"
import useStore from "@/lib/zustand-coudinary"
import { useGetAssets } from "@/lib/use-get-assets"

export default function DashboardContentHeader() {
	return (
		<article className="w-full flex flex-col gap-6 pb-4">
			<div className="flex items-center justify-between w-full">
				<BreadcrumbUI />
				<Menu />
			</div>
			<FileStats />
		</article>
	)
}

const BreadcrumbUI = () => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<span>Home</span>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<span>Components</span>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Dashboard</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

const Menu = () => {

	const { view, setView, order, setOrder } = useStore()

	return (
		<>
			<div className="flex items-center gap-12">
				<span>vista</span>
				<LayoutDashboard className={`sm:size-5 2xl:size-6 ${view === "grid" ? "text-orange-500" : ""} cursor-pointer`} onClick={() => setView("grid")} />
				<StretchHorizontal className={`sm:size-5 2xl:size-6 ${view === "list" ? "text-orange-500" : ""} cursor-pointer`} onClick={() => setView("list")} />
			</div>
			<div className="flex items-center gap-12">
				<span>orden</span>
				<ArrowDownAZ className={`sm:size-5 2xl:size-6 ${order === "name" ? "text-orange-500" : ""} cursor-pointer`} onClick={() => setOrder("name")} />
				<CalendarArrowDown className={`sm:size-5 2xl:size-6 ${order === "date" ? "text-orange-500" : ""} cursor-pointer`} onClick={() => setOrder("date")} />
				<ArrowDownNarrowWide className={`sm:size-5 2xl:size-6 ${order === "size" ? "text-orange-500" : ""} cursor-pointer`} onClick={() => setOrder("size")} />
			</div>
		</>
	)
}

const FileStats = () => {

	const { actualFolder } = useStore()
	const {assets} = useGetAssets()

	const actualFolderAssetsLength = actualFolder === "Todas" ? assets.length : assets.filter(asset => asset.asset_folder === actualFolder).length

	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Checkbox id="selection" className="size-5" />
				<Label htmlFor="selection" className="text-base">
					todos
				</Label>
			</div>
			<span>seleccionados ( 20 )</span>
			<span>total {actualFolderAssetsLength}</span>
		</div>
	)
}
