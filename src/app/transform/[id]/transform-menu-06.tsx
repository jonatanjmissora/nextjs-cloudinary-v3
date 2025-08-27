import { useTransformStore } from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function TransformMenu06() {
	const { replaceTarget, setReplaceTarget, replaceObject, setReplaceObject } =
		useTransformStore()
	const [replaceTargetValue, setReplaceTargetValue] = useState<string>("")
	const [replaceObjectValue, setReplaceObjectValue] = useState<string>("")
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setReplaceTarget(replaceTargetValue)
		setReplaceObject(replaceObjectValue)
	}

	useEffect(() => {
		setReplaceTargetValue(replaceTarget)
		setReplaceObjectValue(replaceObject)
	}, [replaceTarget, replaceObject])

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<Label htmlFor="replaceObject" className="w-max">
					reemplazar a :
				</Label>
				<Input
					type="text"
					id="replaceTarget"
					name="replaceTarget"
					placeholder="objeto..."
					className="flex-1 text-center"
					value={replaceTargetValue}
					onChange={e => setReplaceTargetValue(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-4">
				<Label htmlFor="replaceColorObject">reemplazar con :</Label>
				<Input
					type="test"
					id="replaceColorObject"
					name="replaceColorObject"
					placeholder="objeto..."
					className="flex-1 text-center"
					value={replaceObjectValue}
					onChange={e => setReplaceObjectValue(e.target.value)}
				/>
			</div>
			<Button
				className="w-full cursor-pointer"
				type="submit"
				disabled={replaceTargetValue === "" || replaceObjectValue === ""}
			>
				Aplicar
			</Button>
		</form>
	)
}
