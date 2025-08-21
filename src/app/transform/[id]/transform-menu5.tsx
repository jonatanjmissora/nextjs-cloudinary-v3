import useTransformStore from "@/lib/zustand-transform"
import {
	ColorPicker,
	ColorPickerAlpha,
	ColorPickerEyeDropper,
	ColorPickerFormat,
	ColorPickerHue,
	ColorPickerOutput,
	ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker"

export const TransformMenu5 = () => {
	const { recolorTarget, recolorColor, setRecolorTarget, setRecolorColor } =
		useTransformStore()

	return (
		<ColorPicker className="max-w-sm rounded-md border bg-background p-4 shadow-sm">
			{" "}
			<ColorPickerSelection />{" "}
			<div className="flex items-center gap-4">
				{" "}
				<ColorPickerEyeDropper />{" "}
				<div className="grid w-full gap-1">
					{" "}
					<ColorPickerHue /> <ColorPickerAlpha />{" "}
				</div>{" "}
			</div>{" "}
			<div className="flex items-center gap-2">
				{" "}
				<ColorPickerOutput /> <ColorPickerFormat />{" "}
			</div>{" "}
		</ColorPicker>
	)
}
