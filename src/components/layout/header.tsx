import { uploadAction } from "@/app/actions/upload-files"
import { ModeToggle } from "../ui/theme-toggle"
import SearchFile from "./search-file"
import { UploadBtn } from "./upload"
import UploadForm from "./upload-form"

export default function Header() {
	return (
		<header className={`flex justify-between items-center w-full p-10`}>
			<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-widest text-balance border-b pb-2">
				My Cloudinary
			</h1>

			<nav className="flex gap-[24px] items-center">
				<SearchFile />
				{/* <UploadBtn /> */}
				<UploadForm />
			</nav>

			<ModeToggle />
		</header>
	)
}
