import useTransformStore from "@/lib/zustand-transform"
import { Toggle } from "@/components/ui/toggle"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export const TransformMenu4 = () => {
	const { isRemoveBg, setIsRemoveBg, bgColor, setBgColor, setBgImage } =
		useTransformStore()

	const [bgColorValue, setBgColorValue] = useState<string>("#000")
	const [bgImageValue, setBgImageValue] = useState<string>("")

	const handleRemoveBg = () => {
		setIsRemoveBg(!isRemoveBg)
	}

	const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBgColorValue(e.target.value)
		const colorWithoutHash = `rgb:${e.target.value.slice(1)}`
		bgColor !== "" ? setBgColor("") : setBgColor(colorWithoutHash)
		setIsRemoveBg(true)
	}

	const handleBgImage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setBgImage(e.currentTarget.bgImage.value)
		setBgImageValue(e.currentTarget.bgImage.value)
		setIsRemoveBg(true)
		e.currentTarget.bgImage.blur()
	}

	const handleClear = () => {
		setIsRemoveBg(false)
		setBgColor("")
		setBgColorValue("#000")
		setBgImage("")
		setBgImageValue("")
	}

	return (
		<article className="w-full flex flex-col gap-2 px-4">
			<div className="flex gap-2 w-full">
				<Toggle pressed={isRemoveBg} className="w-1/2" onClick={handleRemoveBg}>
					bg-remove
				</Toggle>
				<Toggle pressed={bgColor !== "" && isRemoveBg} className="w-1/2">
					<input
						type="color"
						name="bg-color"
						id="bg-color"
						onChange={handleBgColorChange}
						value={bgColorValue}
					/>
				</Toggle>
			</div>
			<div className="flex gap-2 w-full">
				<form onSubmit={handleBgImage} className="w-1/2">
					<Input
						type="text"
						name="bgImage"
						id="bg-image"
						value={bgImageValue}
						className="w-full text-center"
						onChange={e => setBgImageValue(e.target.value)}
					/>
				</form>
				<Toggle pressed={!isRemoveBg} className="w-1/2" onClick={handleClear}>
					original
				</Toggle>
			</div>
		</article>
	)
}
