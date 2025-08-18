import { uploadToCloudinary } from "@/app/actions/up"
import { getFileUri } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	// your auth check here if required

	const formData = await req.formData()
	const file = formData.get("file") as File

	const fileUri = await getFileUri(file)

	const res = await uploadToCloudinary(fileUri, file.name)

	if (res.success && res.result) {
		return NextResponse.json({
			message: "success",
			imgUrl: res.result.secure_url,
		})
	} else return NextResponse.json({ message: "failure" })
}
