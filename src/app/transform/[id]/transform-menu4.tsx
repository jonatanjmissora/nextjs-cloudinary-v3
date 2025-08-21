import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"
import { useState } from "react"

export const TransformMenu4 = () => {
	const {
		isRemoveBg,
		setIsRemoveBg,
		bgColor,
		setBgColor,
		bgImage,
		setBgImage,
	} = useTransformStore()

	const [groupItems, setGroupItems] = useState<string[]>(["clear"])

	const handleRemoveBg = () => {
		setIsRemoveBg(!isRemoveBg)
		setGroupItems(prev => {
			if (!prev.includes("remove-bg")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "remove-bg"]
			} else {
				return prev.filter(item => item !== "remove-bg")
			}
		})
	}

	const handleBgColor = () => {
		bgColor !== "" ? setBgColor("") : setBgColor("blue")
		setGroupItems(prev => {
			if (!prev.includes("bg-color")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "bg-color"]
			} else {
				return prev.filter(item => item !== "bg-color")
			}
		})
	}

	const handleBgImage = () => {
		bgImage !== "" ? setBgImage("") : setBgImage("cld-sample-2")
		setGroupItems(prev => {
			if (!prev.includes("bg-image")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "bg-image"]
			} else {
				return prev.filter(item => item !== "bg-image")
			}
		})
	}

	const handleClear = () => {
		setIsRemoveBg(false)
		setBgColor("")
		setBgImage("")
		setGroupItems(["clear"])
	}

	return (
		<ToggleGroup
			type="multiple"
			value={groupItems}
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="remove-bg"
				aria-label="Toggle grayscale"
				onClick={handleRemoveBg}
			>
				remove bg
			</ToggleGroupItem>
			<ToggleGroupItem
				value="bg-color"
				aria-label="Toggle backandwhite"
				onClick={handleBgColor}
			>
				bg-color
			</ToggleGroupItem>
			<ToggleGroupItem
				value="bg-image"
				aria-label="Toggle sepia"
				onClick={handleBgImage}
			>
				bg-image
			</ToggleGroupItem>
			<ToggleGroupItem
				value="clear"
				aria-label="Toggle clear"
				onClick={handleClear}
			>
				original
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
