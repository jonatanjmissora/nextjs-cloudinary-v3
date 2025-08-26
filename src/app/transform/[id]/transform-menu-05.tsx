import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTransformStore from "@/lib/zustand-transform"
import { useEffect, useState } from "react"

export default function TransformMenu05() {
	const { recolorTarget, setRecolorTarget, recolorColor, setRecolorColor } =
		useTransformStore()
	const [recolorTargetValue, setRecolorTargetValue] = useState<string>("")
	const [recolorColorValue, setRecolorColorValue] = useState<string>("")
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
			<div className="flex items-center gap-4">
				<Label htmlFor="replaceColorObject">remplazar color de objeto :</Label>
				<Input
					type="color"
					id="replaceColorObject"
					name="replaceColorObject"
					className="w-1/4 border-none bg-transparent"
					value={recolorColorValue.replace("rgb:", "#")}
					onChange={e => setRecolorColorValue(e.target.value)}
				/>
			</div>
			<Button className="w-full cursor-pointer" type="submit">
				Aplicar
			</Button>
		</form>
	)
}
