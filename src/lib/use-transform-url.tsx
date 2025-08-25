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
		replaceBg,
		replaceTarget,
		replaceObject,
		removeObject,
		isFillBackground,
		width,
		height,
		isFill,
		crop,
		format,
	} = useTransformStore()

	// biome-ignore lint/suspicious/noExplicitAny: no tengo tipo para urlTransformation
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
		//		Menu 6
		replaceBackground: replaceBg,
		//		Menu 7
		replace: [replaceTarget, replaceObject],
		// 		Menu 8
		remove: {
			prompt: removeObject,
			removeShadow: true,
		},
		// 		Menu 9
		fillBackground: isFillBackground,
		width: width,
		height: height,
		fill: isFill,
		crop: crop,
		//		Menu 10
		format: format,
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
	if (replaceBg !== "") urlTransformation.replaceBackground = replaceBg
	else if (Object.hasOwn(urlTransformation, "replaceBackground"))
		delete urlTransformation.replaceBackground
	if (replaceTarget !== "" && replaceObject !== "")
		urlTransformation.replace = [replaceTarget, replaceObject]
	else if (Object.hasOwn(urlTransformation, "replace"))
		delete urlTransformation.replace
	if (removeObject !== "")
		urlTransformation.remove = {
			prompt: removeObject,
			removeShadow: true,
		}
	else if (Object.hasOwn(urlTransformation, "remove"))
		delete urlTransformation.remove

	if (width !== 0) urlTransformation.width = width
	else if (Object.hasOwn(urlTransformation, "width"))
		delete urlTransformation.width
	if (height !== 0) urlTransformation.height = height
	else if (Object.hasOwn(urlTransformation, "height"))
		delete urlTransformation.height
	if (width !== 0 && height !== 0) {
		urlTransformation.fill = true
		urlTransformation.crop = crop
		urlTransformation.fillBackground = isFillBackground
	} else if (Object.hasOwn(urlTransformation, "fill")) {
		delete urlTransformation.fill
		delete urlTransformation.crop
		delete urlTransformation.fillBackground
	}
	if (format !== "auto") urlTransformation.format = format
	else if (Object.hasOwn(urlTransformation, "format"))
		delete urlTransformation.format

	const url = getCldImageUrl(urlTransformation)

	return { url, isFill, width, height }
}
