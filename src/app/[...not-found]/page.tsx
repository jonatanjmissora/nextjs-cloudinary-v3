import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NotFoundPage() {
	return (
		<section className="font-sans flex flex-col justify-center items-center min-h-screen relative">
			<BGMain />
			<Image
				src="/404-page-not-found.svg"
				alt="not-found"
				width={500}
				height={500}
			/>
			<Link
				href="/"
				className="cursor-pointer text-2xl font-semibold tracking-wider"
			>
				<Button variant="outline">Volver</Button>
			</Link>
		</section>
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
