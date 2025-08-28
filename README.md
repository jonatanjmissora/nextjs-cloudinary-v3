npx create-next-app@latest

bun add -D -E @biomejs/biome

copiar un biome.json de un proyecto existente o bunx --bun biome init

DARK MODE
==========
bun x --bun shadcn@latest init
bun x --bun shadcn@latest add button

bun add next-themes lucide-react

🟩components/theme-provider.tsx
"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
 
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

🟩src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"
 
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

🟩src/app/components/ui/theme-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

instalar todos los componentes de shadcn

hicimos el header, el sidebar y el dashboard body

🟩 conectamos con cloudinary
bun add cloudinary 

en .env colocamos los valores de 
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
CLOUDINARY_URL=

🟩 mostramos los assets de cloudinary
hicimos el masonry layout

/lib/getAssets
----------------
"use server"
import { CloudinaryAsset } from "@/_lib/types";
import cloudinary from "cloudinary"

//const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAssets = async (): Promise<{success: boolean, response: CloudinaryAsset[], message: string}> => {
    try {
        const res = await cloudinary.v2
            .search
            .expression('resource_type:image')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
            
        // demora de 2 segundos
        //await sleep(1000)
        
        if(!res){
            console.error("error en getAssets - !res: ")
            return {success: false, response: [], message: "Problemas con la API de Cloudinary"}
        }
        
        return {success: true, response: res.resources || [], message: "Assets obtenidos correctamente"}
    } catch (error: unknown) {
        console.error("error en getAssets - catch: ", error)
        return {success: false, response: [], message: error instanceof Error ? error.message : "Error al obtener assets"}
        }
} 

creamos el hook useGetAssets donde tenemos el query de getAssets
import { getAssets } from "./get-assets"
import { useQuery } from "@tanstack/react-query"

export const useGetAssets = () => {
	const {
		isFetching,
		data,
		error: queryError,
	} = useQuery({
		queryKey: ["assets"],
		queryFn: getAssets,
		staleTime: 30 * 1000,
		refetchInterval: 30 * 1000,
		refetchIntervalInBackground: true,
	})

	const error = queryError || data?.success === false ? data?.message : null
	const folders = data?.response || []

	return { isFetching, folders, error }
}

🟩 ahora zustand:
------------------

import { create } from 'zustand'
import { Folder } from '../types'

interface StoreState {
  folders: Folder[]
  actualFolder: Folder | null
  view: "grid" | "list" | null
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

🟩 luego usamos la store, para listar y ordenar los archivos



🟩🟩

