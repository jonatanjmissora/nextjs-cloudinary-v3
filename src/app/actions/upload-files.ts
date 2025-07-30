"use server"
export const uploadAction = async (files: File[]) => {
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME // Replace with your Cloudinary cloud name
	const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

	if (!uploadPreset) {
		throw new Error(
			"Cloudinary upload preset is not configured. Please check your environment variables."
		)
	}

	const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

	console.log("ENTRRRAAANDDDO")
	try {
		const formData = new FormData()
		files.forEach(file => formData.append("file", file))
		formData.append("upload_preset", uploadPreset)

		const response = await fetch(cloudinaryUploadUrl, {
			method: "POST",
			body: formData,
		})

		if (!response.ok) {
			throw new Error("Failed to upload files")
		}

		const data = await response.json()
		console.log("Files uploaded successfully:", data)
	} catch (error) {
		console.error("Error uploading files:", error)
	}
}
