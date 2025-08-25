import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export default function TransformMenu01() {
	const { effect, setEffect } = useTransformStore()

	return (
		<ToggleGroup
			type="single"
			className="flex flex-col gap-1 w-full px-4"
			onValueChange={setEffect}
			value={effect}
		>
			<div className="flex gap-1 w-full">
				<ToggleGroupItem value="grayscale" aria-label="Toggle grayscale">
					grayscale
				</ToggleGroupItem>
				<ToggleGroupItem
					value="blackandwhite"
					aria-label="Toggle blackandwhite"
				>
					black/white
				</ToggleGroupItem>
				<ToggleGroupItem value="sepia" aria-label="Toggle sepia">
					sepia
				</ToggleGroupItem>
			</div>
			<div className="flex gap-1 w-full">
				<ToggleGroupItem value="cartoonify" aria-label="Toggle cartoonify">
					cartoonify
				</ToggleGroupItem>
				<ToggleGroupItem value="vectorize" aria-label="Toggle vectorize">
					vectorize
				</ToggleGroupItem>
				<ToggleGroupItem value="vignette" aria-label="Toggle vignette">
					vignette
				</ToggleGroupItem>
			</div>
		</ToggleGroup>
	)
}
