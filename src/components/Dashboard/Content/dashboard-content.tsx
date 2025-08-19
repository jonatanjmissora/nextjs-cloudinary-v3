import { Card, CardContent } from "@/components/ui/card"
import DashboardContentHeader from "./dashboard-content-header"
import DashboardContentBody from "./dashboard-content-body"
import { Separator } from "@/components/ui/separator"

export default function DashboardContent() {
	return (
		<section className="w-full">
			<Card className="min-h-[80dvh]">
				<CardContent className="flex-1 flex flex-col">
					<DashboardContentHeader />
					<DashboardContentBody />
				</CardContent>
			</Card>
		</section>
	)
}
