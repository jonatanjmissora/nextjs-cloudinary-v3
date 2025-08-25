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
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<Input
					type="text"
					name="bgImage"
					id="bgImage"
					value={bgImageValue}
					placeholder="reemplazar con prompt..."
					className="text-center"
					onChange={e => setBgImageValue(e.target.value)}
				/>
				<div className="flex gap-2 w-full">
					<Button variant="default" type="submit" className="w-1/2">
						remplazar
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={resetReplaceBg}
						className="w-1/2"
					>
						original
					</Button>
				</div>
			</form>
		</article>
	)
}
