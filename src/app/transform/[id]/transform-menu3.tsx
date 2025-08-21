import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"
import { useState } from "react"

export const TransformMenu3 = () => {
	const {
		isOpacity,
		setIsOpacity,
		isBrightness,
		setIsBrightness,
		isRestore,
		setIsRestore,
	} = useTransformStore()

	const [groupItems, setGroupItems] = useState<string[]>(["clear"])

	const handleOpacity = () => {
		isOpacity !== "100" ? setIsOpacity("100") : setIsOpacity("50")
		setGroupItems(prev => {
			if (!prev.includes("opacity")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "opacity"]
			} else {
				return prev.filter(item => item !== "opacity")
			}
		})
	}

	const handleBrightness = () => {
		isBrightness !== "10" ? setIsBrightness("10") : setIsBrightness("0")
		setGroupItems(prev => {
			if (!prev.includes("brightness")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "brightness"]
			} else {
				return prev.filter(item => item !== "brightness")
			}
		})
	}

	const handleRestore = () => {
		setIsRestore(!isRestore)
		setGroupItems(prev => {
			if (!prev.includes("restore")) {
				const newPrev = prev.filter(item => item !== "clear")
				return [...newPrev, "restore"]
			} else {
				return prev.filter(item => item !== "restore")
			}
		})
	}

	const handleClear = () => {
		setIsOpacity("100")
		setIsBrightness("0")
		setIsRestore(false)
		setGroupItems(["clear"])
	}

	return (
		<ToggleGroup
			type="multiple"
			value={groupItems}
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="opacity"
				aria-label="Toggle grayscale"
				onClick={handleOpacity}
			>
				opacity
			</ToggleGroupItem>
			<ToggleGroupItem
				value="brightness"
				aria-label="Toggle backandwhite"
				onClick={handleBrightness}
			>
				brillo
			</ToggleGroupItem>
			<ToggleGroupItem
				value="restore"
				aria-label="Toggle sepia"
				onClick={handleRestore}
			>
				mejorar
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
