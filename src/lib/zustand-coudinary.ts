import { create } from "zustand"
import { CloudinaryAsset } from "./types"

interface StoreState {
	sortedAssets: CloudinaryAsset[]
	actualFolder: string
	selectedAssets: CloudinaryAsset[]
	view: "grid" | "list"
	order: "name" | "size" | "date"
	search: string
}

interface StoreActions {
	setSortedAssets: (assets: CloudinaryAsset[]) => void
	setActualFolder: (folder: string) => void
	setSelectedAssets: (assets: CloudinaryAsset[]) => void
	setView: (view: "grid" | "list") => void
	setOrder: (order: "name" | "size" | "date") => void
	setSearch: (search: string) => void
}

const useStore = create<StoreState & StoreActions>(set => ({
	sortedAssets: [],
	setSortedAssets: (assets: CloudinaryAsset[]) => set({ sortedAssets: assets }),

	actualFolder: "Todas",
	setActualFolder: (folderName: string) => set({ actualFolder: folderName }),

	selectedAssets: [],
	setSelectedAssets: (selectedAssets: CloudinaryAsset[]) =>
		set({ selectedAssets }),

	view: "grid",
	setView: (view: "grid" | "list") => set({ view }),

	order: "name",
	setOrder: (order: "name" | "size" | "date") => set({ order }),

	search: "",
	setSearch: (search: string) => set({ search }),
}))

export default useStore
