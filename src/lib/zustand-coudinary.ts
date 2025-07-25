import { create } from 'zustand'
import { Folder } from './types'

interface StoreState {
  folders: Folder[]
  actualFolder: Folder | null
  view: "grid" | "list"
  order: "name" | "size" | "date"
  search: string
}

interface StoreActions {
  setFolders: (folders: Folder[]) => void
  setActualFolder: (folder: Folder) => void
  setView: (view: "grid" | "list") => void
  setOrder: (order: "name" | "size" | "date") => void
  setSearch: (search: string) => void
}

const useStore = create<StoreState & StoreActions>((set) => ({
  folders: [],
  setFolders: (folders: Folder[]) => set({ folders }),

  actualFolder: null,
  setActualFolder: (folder: Folder) => set({ actualFolder: folder }),

  view: "grid",
  setView: (view: "grid" | "list") => set({ view }),

  order: "name",
  setOrder: (order: "name" | "size" | "date") => set({ order }),

  search: "",
  setSearch: (search: string) => set({ search }),
}))

export default useStore