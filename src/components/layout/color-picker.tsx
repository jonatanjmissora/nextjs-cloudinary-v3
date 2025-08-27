"use client"
import {
	ColorPicker,
	ColorPickerAlpha,
	ColorPickerEyeDropper,
	ColorPickerFormat,
	ColorPickerHue,
	ColorPickerOutput,
	ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker"
import { rgbToHex } from "@/lib/utils"

export default function ColorPickerBox({
	colorValue,
	setColorValue,
}: {
	colorValue: string
	setColorValue: (color: string) => void
}) {
	return (
		<ColorPicker
			className="max-w-sm h-[20dvh] rounded-md border bg-background p-4 shadow-sm"
			onChange={value => {
				setColorValue(rgbToHex(value as number[]))
			}}
			defaultValue={colorValue ? colorValue.replace("rgb:", "#") : "#00ff00"}
		>
			<ColorPickerSelection />
			<div className="flex items-center gap-4">
				<ColorPickerEyeDropper />
				<div className="grid w-full gap-1">
					<ColorPickerHue /> <ColorPickerAlpha />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<ColorPickerOutput /> <ColorPickerFormat />
			</div>
		</ColorPicker>
	)
}
