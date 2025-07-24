import { Card, CardContent } from "@/components/ui/card"
import DashboardContentHeader from "./dashboard-content-header"
import DashboardContentBody from "./dashboard-content-body"
import { Separator } from "@/components/ui/separator"

export default function DashboardContent() {
	return (
		<section className="w-full h-full">
			<Card>
				<CardContent>
					<DashboardContentHeader />
					<Separator />
					<DashboardContentBody />
				</CardContent>
			</Card>
		</section>
	)
}
