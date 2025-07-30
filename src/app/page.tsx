import DashboardContent from "@/components/Dashboard/Content/dashboard-content"
import DashboardSidebar from "@/components/Dashboard/Aside/dashboard-sidebar"
import Header from "@/components/layout/header"

export default function Home() {
	return (
		<div className="font-sans flex flex-col justify-center items-center min-h-screen relative">
			<BGMain />

			<Header />
			<main
				className={`flex flex-col sm:flex-row sm:gap-[20px] 2xl:gap-[32px] items-start justify-center w-full min-h-[80dvh] flex-1 sm:px-3 2xl:px-10`}
			>
				<DashboardSidebar />
				<DashboardContent />
			</main>
			<footer
				className={`flex items-center justify-end w-full px-10 py-4`}
			>
				KatoDev {new Date().getFullYear()}
			</footer>
		</div>
	)
}

const BGMain = () => {
	return (
		<>
			<div className="fixed -z-100 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_14px]"></div>
			<div className="fixed -z-99 top-0 left-0 bottom-0 right-0 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_50%,var(--background)_100%)]"></div>
		</>
	)
}
