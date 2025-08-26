import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTransformStore from "@/lib/zustand-transform"
import { useEffect, useState } from "react"

export default function TransformMenu03() {
	const {
		isRemoveBg,
		setIsRemoveBg,
		bgColor,
		setBgColor,
		bgImage,
		setBgImage,
	} = useTransformStore()

	const [isRemoveBgValue, setIsRemoveBgValue] = useState(false)
	const [bgColorValue, setBgColorValue] = useState("")
	const [bgImageValue, setBgImageValue] = useState("")

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		bgColorValue !== ""
			? setBgColor(`rgb:${bgColorValue.slice(1)}`)
			: setBgColor("")
		setIsRemoveBg(isRemoveBgValue)
		setBgImage(bgImageValue)
	}

	useEffect(() => {
		setIsRemoveBgValue(isRemoveBg)
	}, [isRemoveBg])
	useEffect(() => {
		setBgColorValue(bgColor)
	}, [bgColor])
	useEffect(() => {
		setBgImageValue(bgImage)
	}, [bgImage])

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
			<RemoveBackgroundChk
				isRemoveBgValue={isRemoveBgValue}
				setIsRemoveBgValue={setIsRemoveBgValue}
				setBgColorValue={setBgColorValue}
				setBgImageValue={setBgImageValue}
			/>
			<ReplaceBackgroundColor
				bgColorValue={bgColorValue}
				setBgColorValue={setBgColorValue}
				setIsRemoveBgValue={setIsRemoveBgValue}
			/>
			<ReplaceBackgroundImage
				bgImageValue={bgImageValue}
				setBgImageValue={setBgImageValue}
				setIsRemoveBgValue={setIsRemoveBgValue}
				setBgColorValue={setBgColorValue}
			/>
			<Button type="submit" className="w-full cursor-pointer">
				cambiar
			</Button>
		</form>
	)
}

const RemoveBackgroundChk = ({
	isRemoveBgValue,
	setIsRemoveBgValue,
	setBgColorValue,
	setBgImageValue,
}: {
	isRemoveBgValue: boolean
	setIsRemoveBgValue: (isRemoveBg: boolean) => void
	setBgColorValue: (bgColor: string) => void
	setBgImageValue: (bgImage: string) => void
}) => {
	const handleRemoveBg = () => {
		setIsRemoveBgValue(!isRemoveBgValue)
		setBgColorValue("")
		setBgImageValue("")
	}
	return (
		<div className="flex items-center gap-2">
			<Checkbox
				id="removeBackground"
				checked={isRemoveBgValue}
				onCheckedChange={handleRemoveBg}
			/>
			<Label htmlFor="removeBackground">remover fondo</Label>
		</div>
	)
}

const ReplaceBackgroundColor = ({
	bgColorValue,
	setBgColorValue,
	setIsRemoveBgValue,
}: {
	bgColorValue: string
	setBgColorValue: (bgColor: string) => void
	setIsRemoveBgValue: (isRemoveBg: boolean) => void
}) => {
	const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsRemoveBgValue(true)
		setBgColorValue(e.target.value)
	}

	return (
		<div className="flex items-center gap-4">
			<Label htmlFor="replaceBackgroundColor">remplazar color de fondo :</Label>
			<Input
				type="color"
				id="replaceBackgroundColor"
				name="replaceBackgroundColor"
				className="w-1/4 border-none bg-transparent"
				value={bgColorValue.replace("rgb:", "#")}
				onChange={handleBgColorChange}
			/>
		</div>
	)
}

const ReplaceBackgroundImage = ({
	bgImageValue,
	setBgImageValue,
	setIsRemoveBgValue,
	setBgColorValue,
}: {
	bgImageValue: string
	setBgImageValue: (bgImage: string) => void
	setIsRemoveBgValue: (isRemoveBg: boolean) => void
	setBgColorValue: (bgColor: string) => void
}) => {
	const handleBgImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsRemoveBgValue(true)
		setBgColorValue("")
		setBgImageValue(e.target.value)
	}
	return (
		<div className="flex items-center gap-4">
			<Label htmlFor="replaceBackgroundImage" className="w-max">
				imagen :
			</Label>
			<Input
				type="text"
				id="replaceBackgroundImage"
				name="replaceBackgroundImage"
				placeholder="public_id..."
				className="flex-1 text-center"
				value={bgImageValue}
				onChange={handleBgImage}
			/>
		</div>
	)
}
