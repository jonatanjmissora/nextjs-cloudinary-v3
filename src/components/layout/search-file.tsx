"use client"
import { Search, X } from "lucide-react"
import { Input } from "../ui/input"
import useStore from "@/lib/zustand-cloudinary"
import { useDebouncedCallback } from "use-debounce"
import { useState } from "react"

export default function SearchFile() {
	const { search, setSearch } = useStore()
	const [searchValue, setSearchValue] = useState(search)

	const handleSearch = useDebouncedCallback((value: string) => {
		setSearch(value)
	}, 300)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchValue(value)
		handleSearch(value)
	}

	const handleReset = () => {
		setSearchValue("")
		setSearch("")
	}

	return (
		<div className="relative">
			<Input
				id="search"
				type="text"
				placeholder="Buscar archivo"
				className="px-8 py-5 text-center"
				autoComplete="on"
				onChange={handleChange}
				value={searchValue}
			/>
			<Search className="absolute left-3 top-1/2 -translate-y-1/2" />
			{searchValue && (
				<X
					className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 size-5"
					onClick={handleReset}
				/>
			)}
		</div>
	)
}
