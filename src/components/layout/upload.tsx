"use client"
import { Trash2, Upload } from "lucide-react"
import { Button } from "../ui/button"
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
} from "../ui/alert-dialog"
import Image from "next/image"
import { startTransition, useState } from "react"
import { uploadAction } from "@/app/actions/upload-files"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import SubmitBtn from "./submit-btn"

export const UploadBtn = () => {
	const [files, setFiles] = useState<File[]>([])
	const queryClient = useQueryClient()
	const [alertDialog, setAlertDialog] = useState(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!files.length) return toast.error("No ha seleccionado archivos")
		const formData = new FormData(e.currentTarget)

		startTransition(async () => {
			toast.promise(uploadAction(formData), {
				loading: "Subiendo archivo(s)...",
				success: "Archivo(s) subido(s) exitosamente",
				error: "Error al subir archivo(s)",
			})
			queryClient.invalidateQueries()
			setFiles([])
			//close AlertDialog
			setAlertDialog(false)
		})
	}

	return (
		<AlertDialog open={alertDialog} onOpenChange={setAlertDialog}>
			<AlertDialogTrigger asChild>
				<Button variant="default" size="lg" className="bg-orange-500">
					<Upload /> Subir Imagen
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="w-max">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-2 justify-center items-center"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl">
							Subir Imágenes
						</AlertDialogTitle>
						<AlertDialogDescription></AlertDialogDescription>
					</AlertDialogHeader>
					<InputFiles files={files} setFiles={setFiles} />
					<AlertDialogFooter className="w-full flex justify-center gap-4">
						<AlertDialogCancel onClick={() => setFiles([])} className="w-1/4">
							Cancelar
						</AlertDialogCancel>
						<SubmitBtn label="Subir" className="w-1/4" />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
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
				id="files"
				type="file"
				onChange={handleFileChange}
				multiple
				name="files"
				className={`w-3/4 mx-auto border bg-[var(--foreground)]/20 rounded-lg px-12 py-2 ${files.length === 0 ? "py-60" : "mb-4"}`}
			/>

			<div className="w-[80dvw] max-h-[70dvh] flex flex-wrap gap-1 overflow-y-auto">
				{files.map(file => (
					<div
						key={file.name + file.size + file.lastModified}
						className={`relative ${files.length < 4 ? "h-[300px] 2xl:h-[700px]" : "h-40 2xl:h-80"} border flex-[400px] rounded-lg overflow-hidden`}
					>
						<Image
							src={URL.createObjectURL(file)}
							alt={`Uploaded image ${file.name}`}
							fill
							style={{ objectFit: "contain" }}
							quality={100}
						/>
						<Button
							variant="ghost"
							onClick={() => setFiles(files.filter(f => f !== file))}
							className="absolute top-2 right-2"
						>
							<Trash2 />
						</Button>
					</div>
				))}
			</div>
		</>
	)
}
