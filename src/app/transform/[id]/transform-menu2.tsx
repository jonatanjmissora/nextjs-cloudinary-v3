import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export const TransformMenu2 = () => {
	const {
		isCartoonify,
		setIsCartoonify,
		isVectorize,
		setIsVectorize,
		isVignette,
		setIsVignette,
	} = useTransformStore()

	const handleCartoonify = () => {
		setIsCartoonify(!isCartoonify)
		setIsVectorize(false)
		setIsVignette(false)
	}

	const handleVectorize = () => {
		setIsVectorize(!isVectorize)
		setIsCartoonify(false)
		setIsVignette(false)
	}

	const handleVignette = () => {
		setIsVignette(!isVignette)
		setIsCartoonify(false)
		setIsVectorize(false)
	}

	const handleClear = () => {
		setIsCartoonify(false)
		setIsVectorize(false)
		setIsVignette(false)
	}

	return (
		<ToggleGroup
			type="single"
			defaultValue="clear"
			className="flex gap-1 w-full px-4"
		>
			<ToggleGroupItem
				value="cartoonify"
				aria-label="Toggle grayscale"
				onClick={handleCartoonify}
			>
				cartoon
			</ToggleGroupItem>
			<ToggleGroupItem
				value="vectorize"
				aria-label="Toggle backandwhite"
				onClick={handleVectorize}
			>
				vector
			</ToggleGroupItem>
			<ToggleGroupItem
				value="vignette"
				aria-label="Toggle sepia"
				onClick={handleVignette}
			>
				viñeta
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
