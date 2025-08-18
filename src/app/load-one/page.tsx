"use client"

import { useGetAssets } from "@/lib/use-get-assets"
import MyImage from "@/components/my-image"
import AssetList from "./asset-list"

export default function LoadOnePage() {
	const { isFetching, assets } = useGetAssets()

	const uploadStagedFile = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = new FormData()
		form.set("file", e.currentTarget.file.files?.[0])

		// here /api/upload is the route of my handler
		const res = await fetch("/api/upload", {
			method: "POST",
			body: form,
			headers: {
				// add token
				// content-type will be auto-handled and set to multipart/form-data
			},
		})

		const data = await res.json()

		// we will return the uploaded image URL from the API to the client
		console.log(data.imgUrl)
	}

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-blue-900 p-4">
			<form
				onSubmit={uploadStagedFile}
				className="flex items-center gap-2 mb-4"
			>
				<input type="file" name="file" />
				<button type="submit" className="bg-blue-500 text-white p-2">
					Upload
				</button>
			</form>
			<div className="w-full flex flex-col gap-1">
				<AssetList />

				{isFetching ? (
					<LoadingList />
				) : (
					<div className="flex-1 flex flex-wrap gap-2">
						{assets?.slice(0, 7).map(asset => (
							<div
								key={asset.public_id}
								className="relative w-[200px] h-[150px]"
							>
								<MyImage asset={asset} width={600} priority />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

const LoadingList = () => {
	return (
		<div className="flex-1 flex flex-wrap gap-2">
			{[1, 2, 3, 4, 5, 6, 7].map(item => (
				<div
					key={item}
					className="relative w-[200px] aspect-[3/2] bg-muted animate-pulse"
				></div>
			))}
		</div>
	)
}
