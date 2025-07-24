import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Folder } from "./folder"

export default function DashboardSidebar() {
	return (
		<aside className="w-[400px] h-full">
			<Card className="w-full">
				<CardContent>
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold tracking-wider">
							Carpetas
						</span>
						<Button variant="ghost" className="">
							<PlusIcon className="size-5" />
						</Button>
					</div>
					<Separator />
					<FolderList />
				</CardContent>
			</Card>
		</aside>
	)
}

const FolderList = () => {
	const foldersMock = [
		"Todas ",
		"Folder 1",
		"Folder 2",
		"Folder 3",
		"Folder 4",
		"Folder 5",
	]

	return (
		<div>
			{foldersMock.map(folder => (
				<Folder key={folder} label={folder} />
			))}
		</div>
	)
}
