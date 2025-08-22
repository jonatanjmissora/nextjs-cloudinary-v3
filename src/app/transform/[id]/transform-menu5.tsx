import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const TransformMenu5 = () => {
	const { recolorTarget, recolorColor, setRecolorTarget, setRecolorColor } =
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
			{recolorTarget && recolorColor && (
				<div>
					<p>{recolorTarget}</p>
					<p>{recolorColor}</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<Input
						type="text"
						name="recolorTarget"
						id="recolorTarget"
						onChange={e => setRecolorTargetValue(e.target.value)}
						className="w-1/2 text-center"
						value={recolorTargetValue}
					/>
					<Input
						type="color"
						name="recolorColor"
						id="recolorColor"
						className="w-1/2"
						value={recolorColorValue}
						onChange={e => setRecolorColorValue(e.target.value)}
					/>
				</div>
				<div className="flex gap-2 w-full">
					<Button
						variant="outline"
						type="button"
						onClick={resetRecolor}
						className="w-1/2"
					>
						original
					</Button>
					<Button variant="default" type="submit" className="w-1/2">
						recolor
					</Button>
				</div>
			</form>
		</article>
	)
}
