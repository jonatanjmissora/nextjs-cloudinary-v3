import Header from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import ImageTransformation from "./image-transformation"
import Link from "next/link"

export default async function TransformPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<section className="font-sans flex flex-col justify-center items-center min-h-screen relative">
			<BGMain />

			<Header isHome={false} />
			<ImageTransformation id={id} />
			<footer className={`flex items-center justify-end w-full px-10 py-4`}>
				KatoDev {new Date().getFullYear()}
			</footer>
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
