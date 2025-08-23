import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const TransformMenu9 = () => {
	const { setIsFillBackground, setCrop, setIsFill, setWidth, setHeight } =
		useTransformStore()

	const [widthValue, setWidthValue] = useState<number>(0)
	const [heightValue, setHeightValue] = useState<number>(0)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setWidth(widthValue)
		setHeight(heightValue)
		setIsFill(false)
	}

	const resetWidthHeight = () => {
		setWidthValue(0)
		setHeightValue(0)
		setWidth(0)
		setHeight(0)
		setIsFillBackground(false)
		setCrop("pad")
		setIsFill(true)
	}

	return (
		<article className="w-full px-4">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<Input
						type="text"
						name="width"
						id="width"
						onChange={e => setWidthValue(Number(e.target.value))}
						placeholder="...width..."
						className="w-1/2 text-center"
						value={widthValue}
					/>
					<Input
						type="text"
						name="height"
						id="height"
						onChange={e => setHeightValue(Number(e.target.value))}
						placeholder="...height..."
						className="w-1/2 text-center"
						value={heightValue}
					/>
				</div>
				<div className="flex gap-2 w-full">
					<div className="flex items-center gap-3 w-1/2">
						<Checkbox
							id="fillBg"
							onCheckedChange={checked =>
								setIsFillBackground(checked as boolean)
							}
						/>
						<Label htmlFor="fillBg">fillBackground</Label>
					</div>
					<div className="flex items-center gap-3 w-1/2">
						<Checkbox
							id="crop"
							onCheckedChange={checked => setCrop(checked ? "fill" : "pad")}
						/>
						<Label htmlFor="crop">crop</Label>
					</div>
				</div>
				<div className="flex gap-2 w-full">
					<Button variant="default" type="submit" className="w-1/2">
						resize
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={resetWidthHeight}
						className="w-1/2"
					>
						original
					</Button>
				</div>
			</form>
		</article>
	)
}
