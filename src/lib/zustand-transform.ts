import { create } from "zustand"

type EffectType =
	| ""
	| "grayscale"
	| "blackandwhite"
	| "sepia"
	| "cartoonify"
	| "vectorize"
	| "vignette"

interface State {
	// Menu 0
	isFill: boolean
	width: number
	height: number
	arValue: "null" | "ar16_9" | "ar4_3" | "ar4_5"
	isFillBackground: boolean
	crop: "fill" | "pad"
	// Menu 1
	effect: EffectType
	isOpacity: boolean
	isBrightness: boolean
	isRestore: boolean
	//Menu 2
	isRemoveBg: boolean
	bgColor: string
	bgImage: string
	replaceBg: string
	//Menu 3
	recolorTarget: string
	recolorColor: string
	//Menu 4
	replaceTarget: string
	replaceObject: string
	removeObject: string
	//Menu 5
	format: "auto" | "webp" | "jpg" | "png"
}

interface Actions {
	// Menu 0
	setIsFill: (isFill: boolean) => void
	setWidth: (width: number) => void
	setHeight: (height: number) => void
	setArValue: (arValue: "null" | "ar16_9" | "ar4_3" | "ar4_5") => void
	setIsFillBackground: (isFillBackground: boolean) => void
	setCrop: (crop: "fill" | "pad") => void
	// Menu 1
	setEffect: (effect: EffectType) => void
	setIsOpacity: (isOpacity: boolean) => void
	setIsBrightness: (isBrightness: boolean) => void
	setIsRestore: (isRestore: boolean) => void
	//Menu 2
	setIsRemoveBg: (isRemoveBg: boolean) => void
	setBgColor: (bgColor: string) => void
	setBgImage: (bgImage: string) => void
	setReplaceBg: (replaceBg: string) => void
	//Menu 3
	setRecolorTarget: (recolorTarget: string) => void
	setRecolorColor: (recolorColor: string) => void
	//Menu 4
	setReplaceTarget: (replaceTarget: string) => void
	setReplaceObject: (replaceObject: string) => void
	setRemoveObject: (removeObject: string) => void
	//Menu 5
	setFormat: (format: "auto" | "webp" | "jpg" | "png") => void
	// Reset
	setResetAll: () => void
}

interface StoreState extends State, Actions {}

export const useTransformStore = create<StoreState>()(set => ({
	// Menu 0
	isFill: true,
	width: 0,
	height: 0,
	arValue: "null",
	isFillBackground: false,
	crop: "pad",
	// Menu 1
	effect: "",
	isOpacity: false,
	isBrightness: false,
	isRestore: false,
	//Menu 2
	isRemoveBg: false,
	bgColor: "",
	bgImage: "",
	replaceBg: "",
	//Menu 3
	recolorTarget: "",
	recolorColor: "",
	//Menu 4
	replaceTarget: "",
	replaceObject: "",
	removeObject: "",
	//Menu 5
	format: "auto",

	//Menu 0
	setIsFill: isFill => set({ isFill }),
	setWidth: width => set({ width }),
	setHeight: height => set({ height }),
	setArValue: arValue => set({ arValue }),
	setIsFillBackground: isFillBackground => set({ isFillBackground }),
	setCrop: crop => set({ crop }),
	//Menu 1
	setEffect: effect => set({ effect }),
	setIsOpacity: isOpacity => set({ isOpacity }),
	setIsBrightness: isBrightness => set({ isBrightness }),
	setIsRestore: isRestore => set({ isRestore }),
	//Menu 2
	setIsRemoveBg: isRemoveBg => set({ isRemoveBg }),
	setBgColor: bgColor => set({ bgColor }),
	setBgImage: bgImage => set({ bgImage }),
	setReplaceBg: replaceBg => set({ replaceBg }),
	//Menu 3
	setRecolorTarget: recolorTarget => set({ recolorTarget }),
	setRecolorColor: recolorColor => set({ recolorColor }),
	//Menu 4
	setReplaceTarget: replaceTarget => set({ replaceTarget }),
	setReplaceObject: replaceObject => set({ replaceObject }),
	setRemoveObject: removeObject => set({ removeObject }),
	//Menu 5
	setFormat: format => set({ format }),
	//Reset
	setResetAll: () =>
		set({
			isFill: true,
			width: 0,
			height: 0,
			arValue: "null",
			isFillBackground: false,
			crop: "pad",
			effect: "",
			isOpacity: false,
			isBrightness: false,
			isRestore: false,
			isRemoveBg: false,
			bgColor: "",
			bgImage: "",
			replaceBg: "",
			recolorTarget: "",
			recolorColor: "",
			replaceTarget: "",
			replaceObject: "",
			removeObject: "",
			format: "auto",
		}),
}))

export default useTransformStore

// interface States {
// 	isGreyScale: boolean
// 	isBackWhite: boolean
// 	isSepia: boolean
// 	isCartoonify: boolean
// 	isVectorize: boolean
// 	isVignette: boolean
// 	isOpacity: "50" | "100"
// 	isBrightness: "0" | "10"
// 	isRestore: boolean
// 	isAspectRatio: "none" | "2:3" | "16:9"
// 	isRemoveBg: boolean
// 	bgColor: string
// 	bgImage: string
// 	recolorTarget: string
// 	recolorColor: string
// 	replaceBg: string
// 	replaceTarget: string
// 	replaceObject: string
// 	removeObject: string
// 	isFillBackground: boolean
// 	width: number
// 	height: number
// 	isFill: boolean
// 	crop: "fill" | "pad"
// 	format: "auto" | "webp" | "jpg" | "png"
// }

// interface Actions {
// 	setIsGreyScale: (isGreyScale: boolean) => void
// 	setIsBackWhite: (isBackWhite: boolean) => void
// 	setIsSepia: (isSepia: boolean) => void
// 	setIsCartoonify: (isCartoonify: boolean) => void
// 	setIsVectorize: (isVectorize: boolean) => void
// 	setIsVignette: (isVignette: boolean) => void
// 	setIsOpacity: (isOpacity: "50" | "100") => void
// 	setIsBrightness: (isBrightness: "0" | "10") => void
// 	setIsRestore: (isRestore: boolean) => void
// 	setIsAspectRatio: (isAspectRatio: "none" | "2:3" | "16:9") => void
// 	setIsRemoveBg: (isRemoveBg: boolean) => void
// 	setBgColor: (bgColor: string) => void
// 	setBgImage: (bgImage: string) => void
// 	setRecolorTarget: (recolorTarget: string) => void
// 	setRecolorColor: (recolorColor: string) => void
// 	setReplaceBg: (replaceBg: string) => void
// 	setReplaceTarget: (replaceTarget: string) => void
// 	setReplaceObject: (replaceObject: string) => void
// 	setRemoveObject: (removeObject: string) => void
// 	setIsFillBackground: (isFillBackground: boolean) => void
// 	setWidth: (width: number) => void
// 	setHeight: (height: number) => void
// 	setIsFill: (isFill: boolean) => void
// 	setCrop: (crop: "fill" | "pad") => void
// 	setFormat: (format: "auto" | "webp" | "jpg" | "png") => void
// }

// type StoreState = States & Actions

// export const useTransformStore = create<StoreState & Actions>()(set => ({
// 	isGreyScale: false,
// 	isBackWhite: false,
// 	isSepia: false,
// 	isCartoonify: false,
// 	isVectorize: false,
// 	isVignette: false,
// 	isOpacity: "100",
// 	isBrightness: "0",
// 	isRestore: false,
// 	isAspectRatio: "none",
// 	isRemoveBg: false,
// 	bgColor: "",
// 	bgImage: "",
// 	recolorTarget: "",
// 	recolorColor: "",
// 	replaceBg: "",
// 	replaceTarget: "",
// 	replaceObject: "",
// 	removeObject: "",
// 	isFillBackground: false,
// 	width: 0,
// 	height: 0,
// 	isFill: true,
// 	crop: "pad",
// 	format: "auto",

// 	setIsGreyScale: isGreyScale => set({ isGreyScale }),
// 	setIsBackWhite: isBackWhite => set({ isBackWhite }),
// 	setIsSepia: isSepia => set({ isSepia }),
// 	setIsCartoonify: isCartoonify => set({ isCartoonify }),
// 	setIsVectorize: isVectorize => set({ isVectorize }),
// 	setIsVignette: isVignette => set({ isVignette }),
// 	setIsOpacity: isOpacity => set({ isOpacity }),
// 	setIsBrightness: isBrightness => set({ isBrightness }),
// 	setIsRestore: isRestore => set({ isRestore }),
// 	setIsAspectRatio: isAspectRatio => set({ isAspectRatio }),
// 	setIsRemoveBg: isRemoveBg => set({ isRemoveBg }),
// 	setBgColor: bgColor => set({ bgColor }),
// 	setBgImage: bgImage => set({ bgImage }),
// 	setRecolorTarget: recolorTarget => set({ recolorTarget }),
// 	setRecolorColor: recolorColor => set({ recolorColor }),
// 	setReplaceBg: replaceBg => set({ replaceBg }),
// 	setReplaceTarget: replaceTarget => set({ replaceTarget }),
// 	setReplaceObject: replaceObject => set({ replaceObject }),
// 	setRemoveObject: removeObject => set({ removeObject }),
// 	setIsFillBackground: isFillBackground => set({ isFillBackground }),
// 	setWidth: width => set({ width }),
// 	setHeight: height => set({ height }),
// 	setIsFill: isFill => set({ isFill }),
// 	setCrop: crop => set({ crop }),
// 	setFormat: format => set({ format }),
// }))

// export default useTransformStore
