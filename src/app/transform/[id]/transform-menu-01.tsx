import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export default function TransformMenu01() {
	const { effect, setEffect } = useTransformStore()

	return (
		<ToggleGroup
			type="single"
			className="flex flex-col w-full px-4"
			onValueChange={setEffect}
			value={effect}
		>
			<div className="flex w-full">
				<ToggleGroupItem
					variant="outline"
					value="grayscale"
					aria-label="Toggle grayscale"
				>
					grayscale
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="blackandwhite"
					aria-label="Toggle blackandwhite"
				>
					black/white
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="sepia"
					aria-label="Toggle sepia"
				>
					sepia
				</ToggleGroupItem>
			</div>
			<div className="flex w-full">
				<ToggleGroupItem
					variant="outline"
					value="cartoonify"
					aria-label="Toggle cartoonify"
				>
					cartoonify
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="vectorize"
					aria-label="Toggle vectorize"
				>
					vectorize
				</ToggleGroupItem>
				<ToggleGroupItem
					variant="outline"
					value="vignette"
					aria-label="Toggle vignette"
				>
					vignette
				</ToggleGroupItem>
			</div>
		</ToggleGroup>
	)
}
