"use client"
import {
	ColorPicker,
	ColorPickerAlpha,
	ColorPickerEyeDropper,
	ColorPickerFormat,
	ColorPickerHue,
	ColorPickerOutput,
	ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { rgbToHex } from "@/lib/utils"
import { useState } from "react"

export default function ColorPickerComponent({
	setColorFn,
}: {
	setColorFn: (color: string) => void
}) {
	const [colorValue, setColorValue] = useState<string>("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setColorFn(colorValue)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Open</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="h-[50dvh] w-[50dvw]">
				<AlertDialogDescription></AlertDialogDescription>
				<form onSubmit={handleSubmit}>
					<AlertDialogHeader>
						<AlertDialogTitle>Pick a color?</AlertDialogTitle>
						<ColorPickerBox
							colorValue={colorValue}
							setColorValue={setColorValue}
						/>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel type="button" className="cursor-pointer">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction type="submit" className="cursor-pointer">
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	)
}

const ColorPickerBox = ({
	colorValue,
	setColorValue,
}: {
	colorValue: string
	setColorValue: (color: string) => void
}) => {
	// biome-ignore lint/suspicious/noExplicitAny: no tengo el tipo de ColorLike
	const handleChange = (color: any) => {
		const colorArray = Object.values(color).slice(0, 3)
		const hex = rgbToHex(colorArray as number[])
		setColorValue(hex)
	}

	return (
		<ColorPicker
			className="max-w-sm h-[20dvh] rounded-md border bg-background p-4 shadow-sm"
			onChange={handleChange}
			defaultValue={colorValue ?? "#ff0000"}
		>
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
