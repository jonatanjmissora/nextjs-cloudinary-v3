import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useTransformStore from "@/lib/zustand-transform"
import { useEffect, useState } from "react"

export default function TransformMenu04() {
	const { setReplaceBg, replaceBg } = useTransformStore()
	const [bgPromptValue, setBgPromptValue] = useState("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setReplaceBg(bgPromptValue)
	}

	useEffect(() => {
		setBgPromptValue(replaceBg)
	}, [replaceBg])

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<Label htmlFor="replaceBackgroundPrompt" className="w-max">
					prompt :
				</Label>
				<Input
					type="text"
					id="replaceBackgroundPrompt"
					name="replaceBackgroundPrompt"
					placeholder="prompt..."
					className="flex-1 text-center"
					value={bgPromptValue}
					onChange={e => setBgPromptValue(e.target.value)}
				/>
			</div>
			<Button className="w-full cursor-pointer" type="submit">
				Aplicar
			</Button>
		</form>
	)
}
