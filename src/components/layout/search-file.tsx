import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchFile() {
  return (
    <div className="relative">
        <Input type="text" placeholder="Buscar archivo" className="px-8 py-5 text-center"/>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2"/>
    </div>
  )
}
