import ColorPickerBox from "@/components/layout/color-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTransformStore from "@/lib/zustand-transform"
import { Palette } from "lucide-react"
import { useEffect, useState } from "react"

export default function TransformMenu05() {
	const { recolorTarget, setRecolorTarget, recolorColor, setRecolorColor } =
		useTransformStore()
	const [recolorTargetValue, setRecolorTargetValue] = useState<string>("")
	const [recolorColorValue, setRecolorColorValue] = useState<string>("")
	const [showColorPicker, setShowColorPicker] = useState(false)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setRecolorTarget(recolorTargetValue)
		setRecolorColor(recolorColorValue)
	}

	useEffect(() => {
		setRecolorTargetValue(recolorTarget)
		setRecolorColorValue(recolorColor)
	}, [recolorTarget, recolorColor])

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<Label htmlFor="object" className="w-max">
					objeto :
				</Label>
				<Input
					type="text"
					id="object"
					name="object"
					placeholder="objeto..."
					className="flex-1 text-center"
					value={recolorTargetValue}
					onChange={e => setRecolorTargetValue(e.target.value)}
				/>
			</div>

			<div className="flex flex-col items-start gap-4">
				<div className="flex items-center gap-6">
					<Label htmlFor="replaceColorObject">
						remplazar color de objeto :
					</Label>
					{/* <Input
					type="color"
					id="replaceColorObject"
					name="replaceColorObject"
					className="w-1/4 border-none bg-transparent"
					value={recolorColorValue.replace("rgb:", "#")}
					onChange={e => setRecolorColorValue(e.target.value)}
				/> */}
					<button
						type="button"
						onClick={() => setShowColorPicker(!showColorPicker)}
						className={`h-9 w-16 border rounded-md text-center`}
						style={{ backgroundColor: recolorColorValue.replace("rgb:", "#") }}
					>
						{recolorColorValue ? "" : <Palette className="mx-auto size-5" />}
					</button>
				</div>
				{showColorPicker && (
					<ColorPickerBox
						colorValue={recolorColorValue}
						setColorValue={setRecolorColorValue}
					/>
				)}
			</div>
			<Button
				className="w-full cursor-pointer"
				type="submit"
				disabled={recolorTargetValue === "" || recolorColorValue === ""}
			>
				Aplicar
			</Button>
		</form>
	)
}
