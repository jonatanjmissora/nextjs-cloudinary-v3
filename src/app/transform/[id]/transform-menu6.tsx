import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useTransformStore from "@/lib/zustand-transform"

export const TransformMenu6 = () => {
	const { setReplaceBg } = useTransformStore()
	const [bgImageValue, setBgImageValue] = useState<string>("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setReplaceBg(bgImageValue)
	}

	const resetReplaceBg = () => {
		setBgImageValue("")
		setReplaceBg("")
	}

	return (
		<article className="w-full px-4">
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="text"
					name="bgImage"
					id="bgImage"
					value={bgImageValue}
					placeholder="...replace-bg..."
					className="text-center"
					onChange={e => setBgImageValue(e.target.value)}
				/>
				<Button variant="default" type="submit">
					replace-bg
				</Button>
				<Button variant="outline" type="button" onClick={resetReplaceBg}>
					original
				</Button>
			</form>
		</article>
	)
}
