import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTransformStore from "@/lib/zustand-transform"

export const TransformMenu02 = () => {
	const {
		isOpacity,
		setIsOpacity,
		isBrightness,
		setIsBrightness,
		isRestore,
		setIsRestore,
	} = useTransformStore()

	const handleChange = (value: string[]) => {
		value.includes("opacity") ? setIsOpacity(true) : setIsOpacity(false)
		value.includes("brightness")
			? setIsBrightness(true)
			: setIsBrightness(false)
		value.includes("restore") ? setIsRestore(true) : setIsRestore(false)
	}

	const ToggleGroupArray = []
	if (isOpacity) ToggleGroupArray.push("opacity")
	if (isBrightness) ToggleGroupArray.push("brightness")
	if (isRestore) ToggleGroupArray.push("restore")

	return (
		<ToggleGroup
			type="multiple"
			className="flex gap-1 w-full px-4"
			onValueChange={handleChange}
			value={ToggleGroupArray}
		>
			<ToggleGroupItem value="opacity" aria-label="Toggle grayscale">
				opacity
			</ToggleGroupItem>
			<ToggleGroupItem value="brightness" aria-label="Toggle backandwhite">
				brillo
			</ToggleGroupItem>
			<ToggleGroupItem value="restore" aria-label="Toggle sepia">
				mejorar
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
