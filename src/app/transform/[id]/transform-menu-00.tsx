import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useTransformStore from "@/lib/zustand-transform"
import { useEffect, useState } from "react"

export default function TransformMenu00() {
	const {
		width,
		height,
		setWidth,
		setHeight,
		setIsFill,
		arValue,
		setArValue,
		isFillBackground,
		setIsFillBackground,
		crop,
		setCrop,
	} = useTransformStore()

	const [widthInputValue, setWidthInputValue] = useState(width)
	const [heightInputValue, setHeightInputValue] = useState(height)
	const [arInputValue, setArInputValue] = useState(arValue)
	const [isFillBackgroundInputValue, setIsFillBackgroundInputValue] =
		useState(isFillBackground)
	const [cropInputValue, setCropInputValue] = useState(crop)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let newHeight: number = 0
		if (arInputValue !== "null") {
			switch (arInputValue) {
				case "ar16_9":
					newHeight = Math.round((widthInputValue * 9) / 16)
					break
				case "ar4_3":
					newHeight = Math.round((widthInputValue * 3) / 4)
					break
				case "ar4_5":
					newHeight = Math.round((widthInputValue * 5) / 4)
					break
				default:
					newHeight = 0
			}
		}
		setWidth(Number(widthInputValue))
		setHeight(Number(arInputValue !== "null" ? newHeight : heightInputValue))
		setIsFill(false)
		setArValue(arInputValue)
		setIsFillBackground(isFillBackgroundInputValue)
		setCrop(cropInputValue as "fill" | "pad")
	}

	useEffect(() => {
		setWidthInputValue(width)
		setHeightInputValue(height)
		setArInputValue(arValue)
		setIsFillBackgroundInputValue(isFillBackground)
		setCropInputValue(crop)
	}, [width, height, arValue, isFillBackground, crop])

	return (
		<article className="w-full px-4">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<InputSizeRow
					widthInputValue={widthInputValue}
					heightInputValue={heightInputValue}
					setWidthInputValue={setWidthInputValue}
					setHeightInputValue={setHeightInputValue}
				/>

				<AspectRatioRow
					arInputValue={arInputValue}
					setArInputValue={setArInputValue}
					widthInputValue={widthInputValue}
					heightInputValue={heightInputValue}
				/>

				<IARow
					isFillBackgroundInputValue={isFillBackgroundInputValue}
					setIsFillBackgroundInputValue={setIsFillBackgroundInputValue}
					cropInputValue={cropInputValue}
					setCropInputValue={setCropInputValue}
					widthInputValue={widthInputValue}
					heightInputValue={heightInputValue}
				/>

				<Button
					variant="default"
					type="submit"
					className="w-full cursor-pointer"
					disabled={!widthInputValue || !heightInputValue}
				>
					cambiar
				</Button>
			</form>
		</article>
	)
}

const InputSizeRow = ({
	widthInputValue,
	heightInputValue,
	setWidthInputValue,
	setHeightInputValue,
}: {
	widthInputValue: number
	heightInputValue: number
	setWidthInputValue: (widthInputValue: number) => void
	setHeightInputValue: (heightInputValue: number) => void
}) => {
	return (
		<div className="flex flex-col">
			<div className="flex w-full">
				<span className="w-1/2 text-center">ancho</span>
				<span className="w-1/2 text-center">alto</span>
			</div>

			<div className="flex w-full">
				<Input
					type="text"
					name="width"
					id="width"
					placeholder="...width..."
					className="w-1/2 text-center"
					value={widthInputValue}
					onChange={e => setWidthInputValue(Number(e.target.value))}
				/>
				<Input
					type="text"
					name="height"
					id="height"
					placeholder="...height..."
					className="w-1/2 text-center"
					value={heightInputValue}
					onChange={e => setHeightInputValue(Number(e.target.value))}
				/>
			</div>
		</div>
	)
}

const AspectRatioRow = ({
	arInputValue,
	setArInputValue,
	widthInputValue,
	heightInputValue,
}: {
	arInputValue: "null" | "ar16_9" | "ar4_3" | "ar4_5"
	setArInputValue: (arInputValue: "null" | "ar16_9" | "ar4_3" | "ar4_5") => void
	widthInputValue: number
	heightInputValue: number
}) => {
	return (
		<RadioGroup
			defaultValue="null"
			className="w-full flex justify-between items-center"
			onValueChange={setArInputValue}
			value={arInputValue}
			disabled={!widthInputValue || !heightInputValue}
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="ar16_9" id="ar16_9" />
				<Label htmlFor="ar16_9">19:6</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="ar4_3" id="ar4_3" />
				<Label htmlFor="ar4_3">4:3</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="ar4_5" id="ar4_5" />
				<Label htmlFor="ar4_5">4:5</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="null" id="null" />
				<Label htmlFor="null">none</Label>
			</div>
		</RadioGroup>
	)
}

const IARow = ({
	isFillBackgroundInputValue,
	setIsFillBackgroundInputValue,
	cropInputValue,
	setCropInputValue,
	widthInputValue,
	heightInputValue,
}: {
	isFillBackgroundInputValue: boolean
	setIsFillBackgroundInputValue: (checked: boolean) => void
	cropInputValue: "fill" | "pad"
	setCropInputValue: (cropInputValue: "fill" | "pad") => void
	widthInputValue: number
	heightInputValue: number
}) => {
	const handleFillCropValueChange = (value: string) => {
		if (value === "fillBackground") {
			setIsFillBackgroundInputValue(true)
			setCropInputValue("pad")
		} else if (value === "crop") {
			setIsFillBackgroundInputValue(false)
			setCropInputValue("fill")
		} else {
			setIsFillBackgroundInputValue(false)
			setCropInputValue("pad")
		}
	}
	return (
		<RadioGroup
			defaultValue="null"
			className="w-full flex justify-between items-center"
			onValueChange={handleFillCropValueChange}
			value={
				isFillBackgroundInputValue
					? "fillBackground"
					: cropInputValue === "fill"
						? "crop"
						: "null"
			}
			disabled={!widthInputValue || !heightInputValue}
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="fillBackground" id="fillBg" />
				<Label htmlFor="fillBg">fillBackground</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="crop" id="crop" />
				<Label htmlFor="crop">crop</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="null" id="null" />
				<Label htmlFor="null">none</Label>
			</div>
		</RadioGroup>
	)
}
