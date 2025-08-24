import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const TransformMenu7 = () => {
	const { setReplaceTarget, setReplaceObject } = useTransformStore()

	const [replaceTargetValue, setReplaceTargetValue] = useState<string>("")
	const [replaceObjectValue, setReplaceObjectValue] = useState<string>("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setReplaceTarget(replaceTargetValue)
		setReplaceObject(replaceObjectValue)
	}

	const resetReplace = () => {
		setReplaceTarget("")
		setReplaceObject("")
		setReplaceTargetValue("")
		setReplaceObjectValue("")
	}

	return (
		<article className="w-full px-4">
			<p className="pb-2">Cambiar objeto</p>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2">
					<Input
						type="text"
						name="replaceTarget"
						id="replaceTarget"
						onChange={e => setReplaceTargetValue(e.target.value)}
						placeholder="...target..."
						className="w-1/2 text-center"
						value={replaceTargetValue}
					/>
					<Input
						type="text"
						name="replaceObject"
						id="replaceObject"
						onChange={e => setReplaceObjectValue(e.target.value)}
						placeholder="...object..."
						className="w-1/2 text-center"
						value={replaceObjectValue}
					/>
				</div>
				<div className="flex gap-2 w-full">
					<Button variant="default" type="submit" className="w-1/2">
						replace
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={resetReplace}
						className="w-1/2"
					>
						original
					</Button>
				</div>
			</form>
		</article>
	)
}
