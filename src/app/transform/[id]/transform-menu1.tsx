import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export const TransformMenu1 = () => {
	const {
		isGreyScale,
		setIsGreyScale,
		isBackWhite,
		setIsBackWhite,
		isSepia,
		setIsSepia,
	} = useTransformStore()

	const handleGrayScale = () => {
		setIsGreyScale(!isGreyScale)
		setIsBackWhite(false)
		setIsSepia(false)
	}

	const handleBackWhite = () => {
		setIsBackWhite(!isBackWhite)
		setIsGreyScale(false)
		setIsSepia(false)
	}

	const handleSepia = () => {
		setIsSepia(!isSepia)
		setIsGreyScale(false)
		setIsBackWhite(false)
	}

	const handleClear = () => {
		setIsGreyScale(false)
		setIsBackWhite(false)
		setIsSepia(false)
	}

	return (
		<ToggleGroup
			type="single"
			defaultValue="clear"
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="grayscale"
				aria-label="Toggle grayscale"
				onClick={handleGrayScale}
			>
				grayscale
			</ToggleGroupItem>
			<ToggleGroupItem
				value="backandwhite"
				aria-label="Toggle backandwhite"
				onClick={handleBackWhite}
			>
				back/white
			</ToggleGroupItem>
			<ToggleGroupItem
				value="sepia"
				aria-label="Toggle sepia"
				onClick={handleSepia}
			>
				sepia
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
