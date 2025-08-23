import { create } from "zustand"

interface States {
	isGreyScale: boolean
	isBackWhite: boolean
	isSepia: boolean
	isCartoonify: boolean
	isVectorize: boolean
	isVignette: boolean
	isOpacity: "50" | "100"
	isBrightness: "0" | "10"
	isRestore: boolean
	isAspectRatio: "none" | "2:3" | "16:9"
	isRemoveBg: boolean
	bgColor: string
	bgImage: string
	recolorTarget: string
	recolorColor: string
	replaceBg: string
	replaceTarget: string
	replaceObject: string
	removeObject: string
	isFillBackground: boolean
	width: number
	height: number
	isFill: boolean
	crop: "fill" | "pad"
}

interface Actions {
	setIsGreyScale: (isGreyScale: boolean) => void
	setIsBackWhite: (isBackWhite: boolean) => void
	setIsSepia: (isSepia: boolean) => void
	setIsCartoonify: (isCartoonify: boolean) => void
	setIsVectorize: (isVectorize: boolean) => void
	setIsVignette: (isVignette: boolean) => void
	setIsOpacity: (isOpacity: "50" | "100") => void
	setIsBrightness: (isBrightness: "0" | "10") => void
	setIsRestore: (isRestore: boolean) => void
	setIsAspectRatio: (isAspectRatio: "none" | "2:3" | "16:9") => void
	setIsRemoveBg: (isRemoveBg: boolean) => void
	setBgColor: (bgColor: string) => void
	setBgImage: (bgImage: string) => void
	setRecolorTarget: (recolorTarget: string) => void
	setRecolorColor: (recolorColor: string) => void
	setReplaceBg: (replaceBg: string) => void
	setReplaceTarget: (replaceTarget: string) => void
	setReplaceObject: (replaceObject: string) => void
	setRemoveObject: (removeObject: string) => void
	setIsFillBackground: (isFillBackground: boolean) => void
	setWidth: (width: number) => void
	setHeight: (height: number) => void
	setIsFill: (isFill: boolean) => void
	setCrop: (crop: "fill" | "pad") => void
}

type StoreState = States & Actions

export const useTransformStore = create<StoreState & Actions>()(set => ({
	isGreyScale: false,
	isBackWhite: false,
	isSepia: false,
	isCartoonify: false,
	isVectorize: false,
	isVignette: false,
	isOpacity: "100",
	isBrightness: "0",
	isRestore: false,
	isAspectRatio: "none",
	isRemoveBg: false,
	bgColor: "",
	bgImage: "",
	recolorTarget: "",
	recolorColor: "",
	replaceBg: "",
	replaceTarget: "",
	replaceObject: "",
	removeObject: "",
	isFillBackground: false,
	width: 0,
	height: 0,
	isFill: true,
	crop: "pad",

	setIsGreyScale: isGreyScale => set({ isGreyScale }),
	setIsBackWhite: isBackWhite => set({ isBackWhite }),
	setIsSepia: isSepia => set({ isSepia }),
	setIsCartoonify: isCartoonify => set({ isCartoonify }),
	setIsVectorize: isVectorize => set({ isVectorize }),
	setIsVignette: isVignette => set({ isVignette }),
	setIsOpacity: isOpacity => set({ isOpacity }),
	setIsBrightness: isBrightness => set({ isBrightness }),
	setIsRestore: isRestore => set({ isRestore }),
	setIsAspectRatio: isAspectRatio => set({ isAspectRatio }),
	setIsRemoveBg: isRemoveBg => set({ isRemoveBg }),
	setBgColor: bgColor => set({ bgColor }),
	setBgImage: bgImage => set({ bgImage }),
	setRecolorTarget: recolorTarget => set({ recolorTarget }),
	setRecolorColor: recolorColor => set({ recolorColor }),
	setReplaceBg: replaceBg => set({ replaceBg }),
	setReplaceTarget: replaceTarget => set({ replaceTarget }),
	setReplaceObject: replaceObject => set({ replaceObject }),
	setRemoveObject: removeObject => set({ removeObject }),
	setIsFillBackground: isFillBackground => set({ isFillBackground }),
	setWidth: width => set({ width }),
	setHeight: height => set({ height }),
	setIsFill: isFill => set({ isFill }),
	setCrop: crop => set({ crop }),
}))

export default useTransformStore
