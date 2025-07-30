"use client"
import { Upload } from "lucide-react"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogFooter,
} from "../ui/dialog"
import Image from "next/image"
import { useState } from "react"
import { uploadAction } from "@/app/actions/upload-files"

export const UploadBtn = () => {
	const [files, setFiles] = useState<File[]>([])

	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME // Replace with your Cloudinary cloud name
	const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

	if (!uploadPreset) {
		throw new Error(
			"Cloudinary upload preset is not configured. Please check your environment variables."
		)
	}

	const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log("ENTRRRAAANDDDO")
		if (!files) return
		// try {
		// 	const formData = new FormData()
		// 	files.forEach(file => formData.append("file", file))
		// 	formData.append("upload_preset", uploadPreset)

		// 	const response = await fetch(cloudinaryUploadUrl, {
		// 		method: "POST",
		// 		body: formData,
		// 	})

		// 	if (!response.ok) {
		// 		throw new Error("Failed to upload files")
		// 	}

		// 	const data = await response.json()
		// 	console.log("Files uploaded successfully:", data)
		// } catch (error) {
		// 	console.error("Error uploading files:", error)
		// }
	}
	return (
		<Dialog>
			<form action={uploadAction}>
				<DialogTrigger asChild>
					<Button variant="default" size="lg" className="bg-orange-500">
						<Upload /> Subir Imagen
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-6xl min-h-[40dvh]">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold w-full text-center">
							Subir Imagen
						</DialogTitle>
					</DialogHeader>

					<InputFiles files={files} setFiles={setFiles} />

					<DialogFooter className="mx-auto w-3/4 flex justify-between gap-12">
						<DialogClose asChild className="flex-1">
							<Button variant="outline" onClick={() => setFiles([])}>
								Cancelar
							</Button>
						</DialogClose>
						<Button type="submit" className="flex-1">
							Subir
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}

const InputFiles = ({
	files,
	setFiles,
}: {
	files: File[]
	setFiles: React.Dispatch<React.SetStateAction<File[]>>
}) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files
		if (selectedFiles && selectedFiles.length > 0) {
			setFiles(Array.from(selectedFiles))
		}
	}
	return (
		<>
			<input
				type="file"
				onChange={handleFileChange}
				multiple
				className={`w-3/4 mx-auto border bg-[var(--foreground)]/20 rounded-lg px-12 py-2 ${files.length === 0 ? "py-60" : "mb-4"}`}
			/>

			<div className="w-full flex flex-wrap gap-1">
				{files.map(file => (
					<div
						key={file.name + file.size + file.lastModified}
						className="relative h-64 border flex-[200px] rounded-lg overflow-hidden"
					>
						<Image
							src={URL.createObjectURL(file)}
							alt={`Uploaded image ${file.name}`}
							fill
							style={{ objectFit: "contain" }}
							quality={100}
						/>
					</div>
				))}
			</div>
		</>
	)
}
