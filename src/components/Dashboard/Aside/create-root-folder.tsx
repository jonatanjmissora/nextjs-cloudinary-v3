"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import SubmitBtn from "@/components/layout/submit-btn"
import {
	AlertDialogFooter,
	AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { startTransition, useState } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createFolderAction } from "@/app/actions/create-folder"
import { useQueryClient } from "@tanstack/react-query"

export default function CreateRootFolder() {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const folderName = e.currentTarget.folderName.value.trim()
		if (folderName === "") {
			return
		}

		startTransition(async () => {
			toast.promise(createFolderAction(folderName), {
				loading: "creando carpeta...",
				success: "carpeta creada exitosamente",
				error: "Error al crear carpeta",
			})
			setOpen(false)
			queryClient.invalidateQueries({ queryKey: ["folders"] })
		})
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" className="">
					<PlusIcon className="size-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg">
				<AlertDialogDescription className="hidden">
					Ingresa un nombre para la nueva carpeta
				</AlertDialogDescription>
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col gap-6 p-12"
				>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							Nueva carpeta :
						</AlertDialogTitle>
					</AlertDialogHeader>

					<Input placeholder="nombre..." type="text" name="folderName" />

					<AlertDialogFooter className="w-full flex justify-center gap-4 items-center">
						<AlertDialogCancel className="flex-1">Cancelar</AlertDialogCancel>
						<SubmitBtn label="Crear" className="flex-1" />
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}
