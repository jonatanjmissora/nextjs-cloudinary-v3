import { getCldImageUrl } from "next-cloudinary"
import useTransformStore from "./zustand-transform"

export const useTransformUrl = (id: string) => {
	const {
		isGreyScale,
		isBackWhite,
		isSepia,
		isCartoonify,
		isVectorize,
		isVignette,
		isOpacity,
		isBrightness,
		isRestore,
		isAspectRatio,
		isRemoveBg,
		bgColor,
		bgImage,
	} = useTransformStore()

	const urlTransformation: any = {
		src: id,
		sepia: isSepia,
		blackwhite: isBackWhite,
		grayscale: isGreyScale,
		cartoonify: isCartoonify,
		vectorize: isVectorize,
		vignette: isVignette,
		opacity: isOpacity,
		brightness: isBrightness,
		restore: isRestore,
		// aspectRatio: isAspectRatio,
		removeBackground: isRemoveBg,
		background: bgColor,
		underlay: bgImage,
	}
	if (isOpacity !== "100") urlTransformation.opacity = isOpacity
	else if (Object.hasOwn(urlTransformation, "opacity"))
		delete urlTransformation.opacity
	if (isBrightness !== "0") urlTransformation.brightness = isBrightness
	else if (Object.hasOwn(urlTransformation, "brightness"))
		delete urlTransformation.brightness
	if (bgColor !== "") urlTransformation.background = bgColor
	else if (Object.hasOwn(urlTransformation, "background"))
		delete urlTransformation.background
	if (bgImage !== "") urlTransformation.underlay = bgImage
	else if (Object.hasOwn(urlTransformation, "underlay"))
		delete urlTransformation.underlay

	const url = getCldImageUrl(urlTransformation)

	return url
}
