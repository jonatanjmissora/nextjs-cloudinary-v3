import { create } from "zustand"
import { CloudinaryAsset, Folder } from "./types"
import { persist } from "zustand/middleware"

interface NonPersistedState {
	// Non-persisted state
	sortedAssets: CloudinaryAsset[]
	actualFolder: string
	selectedAssets: CloudinaryAsset[]
	search: string
	foldersTree: Folder[]
}

interface PersistedState {
	// Persisted in sessionStorage
	view: "grid" | "list" | null
	order: "name" | "size" | "date"
}

interface StoreActions {
	// Non-persisted actions
	setSortedAssets: (assets: CloudinaryAsset[]) => void
	setActualFolder: (folder: string) => void
	setSelectedAssets: (assets: CloudinaryAsset[]) => void
	setSearch: (search: string) => void
	setFoldersTree: (folders: Folder[]) => void

	// Persisted actions
	setView: (view: "grid" | "list") => void
	setOrder: (order: "name" | "size" | "date") => void
}

type StoreState = NonPersistedState & PersistedState

// Create a store with both persisted and non-persisted state
export const useStore = create<StoreState & StoreActions>()(
	persist(
		set => ({
			// Non-persisted state
			sortedAssets: [],
			actualFolder: "Todas",
			selectedAssets: [],
			search: "",
			foldersTree: [],

			// Persisted state with defaults
			view: null,
			order: "name",

			// Non-persisted actions
			setSortedAssets: assets => set({ sortedAssets: assets }),
			setActualFolder: folderName => set({ actualFolder: folderName }),
			setSelectedAssets: selectedAssets => set({ selectedAssets }),
			setSearch: search => set({ search }),
			setFoldersTree: folders => set({ foldersTree: folders }),

			// Persisted actions
			setView: view => set({ view }),
			setOrder: order => set({ order }),
		}),
		{
			name: "cloudinary-store",
			// storage: createJSONStorage(() => sessionStorage),
			// Only persist the specified state properties
			partialize: state => ({
				view: state.view,
				order: state.order,
			}),
		}
	)
)

export default useStore
