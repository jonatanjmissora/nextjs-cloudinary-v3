import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const TransformMenu5 = () => {
	const { recolorColor, setRecolorTarget, setRecolorColor } =
		useTransformStore()

	const [recolorTargetValue, setRecolorTargetValue] = useState<string>("")
	const [recolorColorValue, setRecolorColorValue] = useState<string>("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setRecolorTarget(recolorTargetValue)
		const colorWithoutHash = `#${recolorColorValue.slice(1)}`
		recolorColor !== ""
			? setRecolorColor("")
			: setRecolorColor(colorWithoutHash)
	}

	const resetRecolor = () => {
		setRecolorTarget("")
		setRecolorColor("")
		setRecolorTargetValue("")
		setRecolorColorValue("")
	}

	return (
		<article className="w-full px-4">
			<p className="pb-2">Cambiar color de objeto</p>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<Input
						type="text"
						name="recolorTarget"
						id="recolorTarget"
						onChange={e => setRecolorTargetValue(e.target.value)}
						placeholder="objeto..."
						className="w-1/2 text-center"
						value={recolorTargetValue}
					/>
					<div className="w-1/2 flex items-center justify-center">
						<input
							type="color"
							name="recolorColor"
							id="recolorColor"
							value={recolorColorValue}
							onChange={e => setRecolorColorValue(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex gap-2 w-full">
					<Button variant="default" type="submit" className="w-1/2">
						cambiar color
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={resetRecolor}
						className="w-1/2"
					>
						original
					</Button>
				</div>
			</form>
		</article>
	)
}
