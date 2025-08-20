import { create } from "zustand"

interface States {
	isGreyScale: boolean
	isBackWhite: boolean
	isSepia: boolean
}

interface Actions {
	setIsGreyScale: (isGreyScale: boolean) => void
	setIsBackWhite: (isBackWhite: boolean) => void
	setIsSepia: (isSepia: boolean) => void
}

type StoreState = States & Actions

export const useTransformStore = create<StoreState & Actions>()(
		set => ({
			isGreyScale: false,
			isBackWhite: false,
			isSepia: false,

			setIsGreyScale: isGreyScale => set({ isGreyScale }),
			setIsBackWhite: isBackWhite => set({ isBackWhite }),
			setIsSepia: isSepia => set({ isSepia }),
		})
	
)

export default useTransformStore
