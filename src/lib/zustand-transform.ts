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
}))

export default useTransformStore
