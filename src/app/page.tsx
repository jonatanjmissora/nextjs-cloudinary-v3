import DashboardContent from "@/components/Dashboard/Content/dashboard-content"
import DashboardSidebar from "@/components/Dashboard/Aside/dashboard-sidebar"
import Header from "@/components/layout/header"

export default function Home() {
	return (
		<div className="font-sans grid grid-rows-[100px_1fr_40px] items-center justify-items-center min-h-screen relative">
			<BGMain />

			<Header />
			<main
				className={`flex gap-[32px] row-start-2 items-center justify-center w-full h-full px-10`}
			>
				<DashboardSidebar />
				<DashboardContent />
			</main>
			<footer
				className={`row-start-3 flex gap-[24px] flex-wrap items-center justify-end w-full px-10`}
			>
				footer
			</footer>
		</div>
	)
}

const BGMain = () => {
	return (
		<>
			<div className="fixed -z-100 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px]"></div>
			<div className="fixed -z-99 top-0 left-0 inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_50%,var(--background)_100%)]"></div>
		</>
	)
}
