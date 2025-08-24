import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const TransformMenu9 = () => {
	const { setIsFillBackground, setCrop, setIsFill, setWidth, setHeight } =
		useTransformStore()

	const [widthValue, setWidthValue] = useState<number>(0)
	const [heightValue, setHeightValue] = useState<number>(0)
	const [fillBackgroundValue, setFillBackgroundValue] = useState<boolean>(false)
	const [cropValue, setCropValue] = useState<boolean>(false)
	const [arValue, setArValue] = useState<string>("null")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let newHeight: number = 0
		if (arValue !== "null") {
			switch (arValue) {
				case "ar16_9":
					newHeight = Math.round((widthValue * 9) / 16)
					break
				case "ar4_3":
					newHeight = Math.round((widthValue * 3) / 4)
					break
				case "ar4_5":
					newHeight = Math.round((widthValue * 5) / 4)
					break
				default:
					newHeight = 0
			}
		}
		console.log("ar", arValue)
		console.log("width", widthValue)
		console.log("height", arValue !== "null" ? newHeight : heightValue)
		console.log("newHeight", newHeight)
		setWidth(widthValue)
		setHeight(arValue !== "null" ? newHeight : heightValue)
		setIsFill(false)
	}

	const handleFillBackgroundChange = (checked: boolean) => {
		setIsFillBackground(checked)
		setFillBackgroundValue(checked)
	}

	const handleCropChange = (checked: boolean) => {
		setCrop(checked ? "fill" : "pad")
		setCropValue(checked)
	}

	const resetWidthHeight = () => {
		setWidthValue(0)
		setHeightValue(0)
		setWidth(0)
		setHeight(0)
		setIsFillBackground(false)
		setCrop("pad")
		setIsFill(true)
		setFillBackgroundValue(false)
		setCropValue(false)
		setArValue("null")
	}

	return (
		<article className="w-full px-4">
			<p className="pb-2">Tamaño y forma</p>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<InputSizeRow
					widthValue={widthValue}
					heightValue={heightValue}
					setWidthValue={setWidthValue}
					setHeightValue={setHeightValue}
				/>

				<AspectRatioRow arValue={arValue} setArValue={setArValue} />

				<IARow
					fillBackgroundValue={fillBackgroundValue}
					handleFillBackgroundChange={handleFillBackgroundChange}
					cropValue={cropValue}
					handleCropChange={handleCropChange}
					widthValue={widthValue}
					heightValue={heightValue}
				/>

				<div className="flex gap-2 w-full">
					<Button
						variant="default"
						type="submit"
						className="w-1/2"
						disabled={!widthValue || !heightValue}
					>
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

const AspectRatioRow = ({
	arValue,
	setArValue,
}: {
	arValue: string
	setArValue: (arValue: string) => void
}) => {
	return (
		<RadioGroup
			defaultValue="null"
			className="w-full flex justify-between items-center"
			onValueChange={setArValue}
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem
					value="ar16_9"
					id="ar16_9"
					// checked={arValue === "ar16_9"}
				/>
				<Label htmlFor="ar16_9">19:6</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem
					value="ar4_3"
					id="ar4_3"
					// checked={arValue === "ar4_3"}
				/>
				<Label htmlFor="ar4_3">4:3</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem
					value="ar4_5"
					id="ar4_5"
					// checked={arValue === "ar4_5"}
				/>
				<Label htmlFor="ar4_5">4:5</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="null" id="null" checked={arValue === "null"} />
				<Label htmlFor="null">none</Label>
			</div>
		</RadioGroup>
	)
}

const InputSizeRow = ({
	widthValue,
	heightValue,
	setWidthValue,
	setHeightValue,
}: {
	widthValue: number
	heightValue: number
	setWidthValue: (widthValue: number) => void
	setHeightValue: (heightValue: number) => void
}) => {
	return (
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
	)
}

const IARow = ({
	fillBackgroundValue,
	handleFillBackgroundChange,
	cropValue,
	handleCropChange,
	widthValue,
	heightValue,
}: {
	fillBackgroundValue: boolean
	handleFillBackgroundChange: (checked: boolean) => void
	cropValue: boolean
	handleCropChange: (checked: boolean) => void
	widthValue: number
	heightValue: number
}) => {
	return (
		<div className="flex gap-2 w-full">
			<div className="flex items-center gap-3 w-1/2">
				<Checkbox
					id="fillBg"
					checked={fillBackgroundValue}
					onCheckedChange={handleFillBackgroundChange}
					disabled={!widthValue || !heightValue}
				/>
				<Label htmlFor="fillBg">fillBackground</Label>
			</div>
			<div className="flex items-center gap-3 w-1/2">
				<Checkbox
					id="crop"
					checked={cropValue}
					onCheckedChange={handleCropChange}
					disabled={!widthValue || !heightValue}
				/>
				<Label htmlFor="crop">crop</Label>
			</div>
		</div>
	)
}
