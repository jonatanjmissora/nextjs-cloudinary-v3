import { cloudinary } from "@/lib/cloudinary"
export const uploadToCloudinary = (fileUri: string, fileName: string) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.unsigned_upload(fileUri, "alba-landing", {
				public_id: fileName.split(".")[0],
				//el display name y el public id son iguales al filename
				//pero yo quiero que el display sea igual pero no el id
			})
			.then(result => {
				resolve({ success: true, result })
			})
			.catch(error => {
				reject({ success: false, error })
			})
	})
}
