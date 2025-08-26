import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import useTransformStore from "@/lib/zustand-transform"
import { useState, useEffect } from "react"

export default function TransformMenu08() {
	const { format, setFormat } = useTransformStore()
	const [formatValue, setFormatValue] = useState<string>("")

	useEffect(() => {
		setFormatValue(format)
	}, [format])

	return (
		<RadioGroup
			className="w-full flex justify-around items-center"
			onValueChange={setFormat}
			value={formatValue}
			defaultValue="webp"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="auto" id="auto" />
				<Label htmlFor="auto">auto</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="webp" id="webp" />
				<Label htmlFor="webp">.webp</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="jpg" id="jpg" />
				<Label htmlFor="jpg">.jpg</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="png" id="png" />
				<Label htmlFor="png">.png</Label>
			</div>
		</RadioGroup>
	)
}
