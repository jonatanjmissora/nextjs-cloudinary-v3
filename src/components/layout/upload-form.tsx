"use client"

import { uploadAction } from "@/app/actions/upload-files"
import SubmitBtn from "./submit-btn"
import { useQueryClient } from "@tanstack/react-query"
import { useTransition } from "react"

export default function UploadForm() {
	const queryClient = useQueryClient()
	const [, startTransition] = useTransition()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		startTransition(async () => {
			await uploadAction(formData)
		})
		queryClient.invalidateQueries({ queryKey: ["assets"] })
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" name="files" multiple />
			<SubmitBtn label="Subir" />
		</form>
	)
}
