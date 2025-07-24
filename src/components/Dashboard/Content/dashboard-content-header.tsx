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
	return (
		<>
			<div className="flex items-center gap-12">
				<span>vista</span>
				<LayoutDashboard />
				<StretchHorizontal />
			</div>
			<div className="flex items-center gap-12">
				<span>orden</span>
				<ArrowDownAZ />
				<CalendarArrowDown />
				<ArrowDownNarrowWide />
			</div>
		</>
	)
}

const FileStats = () => {
	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex items-center gap-3">
				<Checkbox id="selection" className="size-5" />
				<Label htmlFor="selection" className="text-base">
					todos
				</Label>
			</div>
			<span>seleccionados ( 20 )</span>
			<span>total 48</span>
		</div>
	)
}
