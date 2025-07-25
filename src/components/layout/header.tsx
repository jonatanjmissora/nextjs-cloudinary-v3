import { ModeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import SearchFile from "./search-file";

export default function Header() {

    return (
    <header className={`flex justify-between items-center w-full px-10`}>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-widest text-balance border-b pb-2">My Cloudinary</h1>

        <nav className="flex gap-[24px] items-center">
            <SearchFile />
            <Button variant="default" size="lg" className="bg-orange-500">
                <Upload /> Subir Archivo
            </Button>
        </nav>
        
        <ModeToggle />
      </header>
  )
}
