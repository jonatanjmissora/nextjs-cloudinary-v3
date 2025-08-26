import { getCldImageUrl } from "next-cloudinary"
import useTransformStore from "./zustand-transform"

export const useTransformUrl = (id: string) => {
	const {
		//Menu 0
		isFill,
		width,
		height,
		isFillBackground,
		crop,
		//Menu 1
		effect,
		isOpacity,
		isBrightness,
		isRestore,
		//Menu 2
		isRemoveBg,
		bgColor,
		bgImage,
		replaceBg,
		//Menu 3
		recolorTarget,
		recolorColor,
		replaceTarget,
		replaceObject,
		removeObject,
		//Menu 4
		format,
	} = useTransformStore()

	// biome-ignore lint/suspicious/noExplicitAny: no tengo tipo para urlTransformation
	const urlTransformation: any = {
		src: id,

		// 	Menu 0
		fill: isFill,
		width: width,
		height: height,
		fillBackground: isFillBackground,
		crop: crop,
		//		Menu 1
		opacity: isOpacity,
		brightness: isBrightness,
		restore: isRestore,
		//Menu 2
		removeBackground: isRemoveBg,
	}

	//Menu 0
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

	//Menu 1
	switch (effect) {
		case "grayscale":
			urlTransformation.grayscale = true
			break
		case "blackandwhite":
			urlTransformation.blackwhite = true
			break
		case "sepia":
			urlTransformation.sepia = true
			break
		case "cartoonify":
			urlTransformation.cartoonify = true
			break
		case "vectorize":
			urlTransformation.vectorize = true
			break
		case "vignette":
			urlTransformation.vignette = true
			break
		default:
			break
	}
	if (isOpacity) urlTransformation.opacity = "50"
	else if (Object.hasOwn(urlTransformation, "opacity"))
		delete urlTransformation.opacity
	if (isBrightness) urlTransformation.brightness = "10"
	else if (Object.hasOwn(urlTransformation, "brightness"))
		delete urlTransformation.brightness

	//Menu 2
	if (bgColor !== "") {
		urlTransformation.background = bgColor
		urlTransformation.removeBackground = true
	} else if (Object.hasOwn(urlTransformation, "background"))
		delete urlTransformation.background
	if (bgImage !== "") {
		urlTransformation.underlay = bgImage
		urlTransformation.removeBackground = true
	} else if (Object.hasOwn(urlTransformation, "underlay"))
		delete urlTransformation.underlay
	if (replaceBg !== "") {
		urlTransformation.replaceBackground = replaceBg
	} else if (Object.hasOwn(urlTransformation, "replaceBackground"))
		delete urlTransformation.replaceBackground

	//Menu 3
	if (recolorTarget !== "" && recolorColor !== "")
		urlTransformation.recolor = [recolorTarget, recolorColor.slice(1)]
	else if (Object.hasOwn(urlTransformation, "recolor"))
		delete urlTransformation.recolor

	//Menu 4
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

	if (format !== "auto") urlTransformation.format = format
	else if (Object.hasOwn(urlTransformation, "format"))
		delete urlTransformation.format
	const url = getCldImageUrl(urlTransformation)

	return {
		url,
		isFill,
		width,
		height,
	}
}
