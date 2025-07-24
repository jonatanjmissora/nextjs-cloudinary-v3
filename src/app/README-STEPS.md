instalar next-themes shadcn, zustand, lucide, tanstack/react-query, cloudinary, next-cloudinary, sonner, use-debounce-

crear un <Folders /> y un <Files />

<Folders />
    const { isFetching, error } = useGetFolders()

    <section>

        <FolderHeader />

        {
            isFetching 
            ? <FoldersSkelton>
            : error ? <FoldersError /> : <FoldersList />
        }

        <FolderFooter />

    </section>

    const FoldersList = () => {
        const { folders, actualFolder, setActualFolder } = useStore()

        return ()
    }

    const FoldersError = () => {
        const { error } = useGetFolders()

        return ()
    }

<Files />
    const { isFetching, error } = useGetFiles()

    <section>

        <FilesHeader />

        {
            isFetching 
            ? <FilesSkelton>
            : error ? <FilesError /> : <FilesList />
        }

        <FilesFooter />

    </section>

    const FilesList = () => {
        const { folders, actualFolder } = useStore()

        return ()
    }

    const FilesError = () => {
        const { error } = useGetFiles()

        return ()
    }


    const FilesHeader = () => {
        const { view, order } = useStore()

        return ()
    }


/////////////////////////////////////////////////////////////////////////////////
                ZUSTAND STORE
/////////////////////////////////////////////////////////////////////////////////

import { create } from 'zustand'
import { Folder } from '../types'

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

/////////////////////////////////////////////////////////////////////////////////
                TYPEs
/////////////////////////////////////////////////////////////////////////////////
export interface CustomFile {
    id: string;
    name: string;
    type: string;
    size: number;
    lastModified: string;
    format: string;
    secureUrl: string;
    width: number;
    height: number;
  }

export interface Folder {
    id: string
    name: string
    parentId: string | null
    files: CustomFile[]
  }
  
  interface AccessKeyInfo {
    access_key: string
  }
  
  export interface CloudinaryAsset {
    asset_id: string
    public_id: string
    asset_folder: string
    filename: string
    display_name: string
    format: string
    version: number
    resource_type: string
    type: string
    created_at: string
    uploaded_at: string
    bytes: number
    backup_bytes: number
    width: number
    height: number
    aspect_ratio: number
    pixels: number
    url: string
    secure_url: string
    status: string
    access_mode: string
    access_control: null
    etag: string
    created_by: AccessKeyInfo
    uploaded_by: AccessKeyInfo
  }

  export interface AssetsPromiseResponse {
    success: boolean;
    response: CloudinaryAsset[];
    message: string;
  }

/////////////////////////////////////////////////////////////////////////////////
                USE GET FOLDERS
/////////////////////////////////////////////////////////////////////////////////
import { Folder } from "@/_lib/types"
import { getAssets } from "./get-assets"
import { useQuery } from "@tanstack/react-query"
import { setFoldersFromAssets } from "@/_lib/utils/set-folders"
import useStore from "@/_lib/cloudinary/store"

export const useGetFolders = () => {

  const {actualFolder, setActualFolder} = useStore()

  const {isFetching, data: assets} = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 30 * 1000, // La data se considera "vieja" después de 30 segundos // No reintentar automáticamente
    refetchInterval: 30 * 1000, // Refetch cada 30 segundos en segundo plano
    refetchIntervalInBackground: true, // Permite refetching en segundo plano
    notifyOnChangeProps: ['data'], // Solo notifica cambios si los datos cambian
  })
  
  const folders: Folder[] = setFoldersFromAssets(assets?.response || [])

  if(!actualFolder) {
    setActualFolder(folders[0])
  }
  const intialActualFolder = folders[0]
    return {isFetching, folders, intialActualFolder}

/////////////////////////////////////////////////////////////////////////////////
                GET ASSETS
/////////////////////////////////////////////////////////////////////////////////
"use server"
import { CloudinaryAsset } from "@/_lib/types";
import cloudinary from "cloudinary"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAssets = async (): Promise<{success: boolean, response: CloudinaryAsset[], message: string}> => {
    try {
        const res = await cloudinary.v2
            .search
            .expression('resource_type:image')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
            
        // demora de 2 segundos
        await sleep(1000)
        
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


/////////////////////////////////////////////////////////////////////////////////
                SET FOLDERS
/////////////////////////////////////////////////////////////////////////////////

import { CloudinaryAsset, Folder } from "../types";

export function setFoldersFromAssets(initialAssets: CloudinaryAsset[]): Folder[] {
    const folderMap: Record<string, Folder> = {};
    const folderIds = new Map<string, number>();
    let nextId = 1;
  
    // First pass: create folder structure with proper IDs
    initialAssets.forEach((asset) => {
      const pathParts = asset.asset_folder.split('/');
      let currentPath = '';
      
      for (const part of pathParts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        
        if (!folderMap[currentPath]) {
          // Get parent folder ID
          const parentId = pathParts.length > 1 
            ? folderIds.get(pathParts.slice(0, -1).join('/'))
            : null;
  
          // Get folder name (last part of path)
          const folderName = part;
          
          // Create folder entry
          folderMap[currentPath] = {
            name: folderName,
            id: nextId.toString(),
            parentId: parentId?.toString() || null,
            files: []
          };
          
          // Store folder ID for future reference
          folderIds.set(currentPath, nextId);
          
          // Increment ID for next folder
          nextId++;
        }
      }
    });
  
    // Second pass: add files to folders
    initialAssets.forEach(asset => {
      const path = asset.asset_folder;
      const folder = folderMap[path];
      if (folder) {
        folder.files.push({
          id: asset.public_id,
          name: asset.display_name,
          type: asset.resource_type,
          size: asset.bytes,
          lastModified: asset.uploaded_at,
          format: asset.format,
          secureUrl: asset.secure_url,
          width: asset.width,
          height: asset.height,
        });
      }
    });
  
    // Clean up folder names by removing parent paths from subfolder names
    const cleanedFolders: Record<string, Folder> = {};
    Object.entries(folderMap).forEach(([folderPath, folder]) => {
      const pathParts = folderPath.split('/');
      if (pathParts.length > 1) {
        const folderName = pathParts[pathParts.length - 1];
        cleanedFolders[folderName] = folder;
      } else {
        cleanedFolders[folderPath] = folder;
      }
    });
  
    // Convert to array and return
    const sortedFolderArray = Object.values(cleanedFolders).sort((a, b) => a.name.localeCompare(b.name))

    //Agrego la carpeta "Todos", con todas las imagenes y videos
    const allFolders = {
        id: "0",
        name: "Todas",
        parentId: null,
        files: sortedFolderArray
            .map((folder) => folder.files).flat()
            .sort((a, b) => b.lastModified.localeCompare(a.lastModified))
      }
    return [allFolders, ...sortedFolderArray]
  }