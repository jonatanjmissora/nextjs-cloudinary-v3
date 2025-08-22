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
		isRemoveBg,
		bgColor,
		bgImage,
		recolorTarget,
		recolorColor,
	} = useTransformStore()

	const urlTransformation: any = {
		src: id,
		//  	Menu 1
		sepia: isSepia,
		blackwhite: isBackWhite,
		grayscale: isGreyScale,
		//		Menu 2
		cartoonify: isCartoonify,
		vectorize: isVectorize,
		vignette: isVignette,
		//		Menu 3
		opacity: isOpacity,
		brightness: isBrightness,
		restore: isRestore,
		//		Menu 4
		removeBackground: isRemoveBg,
		background: bgColor,
		underlay: bgImage,
		//		Menu 5
		recolor: [recolorTarget, recolorColor.slice(1)],
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
	if (recolorTarget !== "" && recolorColor !== "")
		urlTransformation.recolor = [recolorTarget, recolorColor.slice(1)]
	else if (Object.hasOwn(urlTransformation, "recolor"))
		delete urlTransformation.recolor

	const url = getCldImageUrl(urlTransformation)

	return url
}
