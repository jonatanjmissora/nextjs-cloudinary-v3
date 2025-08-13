"use client"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
	ArrowDownAZ,
	ArrowDownNarrowWide,
	CalendarArrowDown,
	DownloadIcon,
	FolderInput,
	LayoutDashboard,
	SlashIcon,
	StretchHorizontal,
} from "lucide-react"
import useStore from "@/lib/zustand-coudinary"
import { useGetAssets } from "@/lib/use-get-assets"
import { Button } from "@/components/ui/button"
import { HeaderAssetsDelete } from "./dashboard-content-header-delete"

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
	const { actualFolder, setActualFolder } = useStore()

	const foldersArray = actualFolder.split("/")
	const foldersArrayWithoutLast = foldersArray.slice(0, foldersArray.length - 1)
	const foldersArrayLast = foldersArray[foldersArray.length - 1]

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<button onClick={() => setActualFolder("Todas")}>Home</button>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{foldersArrayWithoutLast.map(folderName => (
					<div key={folderName} className="flex items-center gap-2">
						<BreadcrumbSeparator>
							<SlashIcon />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<button onClick={() => setActualFolder(folderName)}>
									{folderName}
								</button>
							</BreadcrumbLink>
						</BreadcrumbItem>
					</div>
				))}
				<BreadcrumbSeparator>
					<SlashIcon />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<span>{foldersArrayLast}</span>
					</BreadcrumbLink>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}

const Menu = () => {
	const { view, setView, order, setOrder } = useStore()

	const handleView = (view: "grid" | "list") => {
		setView(view)
		localStorage.setItem("view", view)
	}

	const handleOrder = (order: "name" | "size" | "date") => {
		setOrder(order)
		localStorage.setItem("order", order)
	}

	return (
		<>
			<div className="flex items-center gap-12">
				<span>vista</span>
				<LayoutDashboard
					className={`sm:size-5 2xl:size-6 ${view === "grid" ? "text-orange-500" : ""} cursor-pointer`}
					onClick={() => handleView("grid")}
				/>
				<StretchHorizontal
					className={`sm:size-5 2xl:size-6 ${view === "list" ? "text-orange-500" : ""} cursor-pointer`}
					onClick={() => handleView("list")}
				/>
			</div>
			<div className="flex items-center gap-12">
				<span>orden</span>
				<ArrowDownAZ
					className={`sm:size-5 2xl:size-6 ${order === "name" ? "text-orange-500" : ""} cursor-pointer`}
					onClick={() => handleOrder("name")}
				/>
				<CalendarArrowDown
					className={`sm:size-5 2xl:size-6 ${order === "date" ? "text-orange-500" : ""} cursor-pointer`}
					onClick={() => handleOrder("date")}
				/>
				<ArrowDownNarrowWide
					className={`sm:size-5 2xl:size-6 ${order === "size" ? "text-orange-500" : ""} cursor-pointer`}
					onClick={() => setOrder("size")}
				/>
			</div>
		</>
	)
}

const FileStats = () => {
	const { actualFolder, selectedAssets, setSelectedAssets } = useStore()
	const { assets } = useGetAssets()

	const actualFolderAssetsLength =
		actualFolder === "Todas"
			? assets.length
			: assets.filter(asset => asset.asset_folder === actualFolder).length

	const handleSelectAllAssets = (checked: boolean) => {
		if (!checked) return setSelectedAssets([])
		setSelectedAssets(
			actualFolder === "Todas"
				? assets
				: assets
						.filter(asset => asset.asset_folder === actualFolder)
						.map(asset => asset)
		)
	}

	return (
		<div className="w-full flex items-center justify-between min-h-9">
			<div className="flex items-center gap-3">
				<Checkbox
					id="selection"
					className="size-5"
					onCheckedChange={handleSelectAllAssets}
					checked={selectedAssets.length === actualFolderAssetsLength}
				/>
				<Label htmlFor="selection" className="text-base">
					todos
				</Label>
			</div>

			<div
				className={`flex items-center gap-6 ${selectedAssets.length > 0 ? "" : "hidden"}`}
			>
				<span className="text-sm">seleccionados ({selectedAssets.length})</span>
				<HeaderAssetsDelete />
				<Button variant="ghost" className={`size-7 p-2`}>
					<DownloadIcon />
				</Button>
				<Button variant="ghost" className={`size-7 p-2`}>
					<FolderInput />
				</Button>
			</div>

			<span>total {actualFolderAssetsLength}</span>
		</div>
	)
}
