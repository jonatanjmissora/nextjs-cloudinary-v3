"use client"

import { uploadAction } from "@/app/actions/upload-files"
import { useState } from "react"

export default function UploadForm() {
	const [files, setFiles] = useState<File[]>([])

	const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files
		if (selectedFiles && selectedFiles.length > 0) {
			setFiles(Array.from(selectedFiles))
		}
	}

	return (
		<form action={uploadAction(files)}>
			<input type="file" onChange={handleChangeFiles} multiple />
			<button type="submit">Subir</button>
		</form>
	)
}
