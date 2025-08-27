import { useTransformStore } from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function TransformMenu07() {
	const { removeObject, setRemoveObject } = useTransformStore()
	const [removeObjectValue, setRemoveObjectValue] = useState<string>("")
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setRemoveObject(removeObjectValue)
	}

	useEffect(() => {
		setRemoveObjectValue(removeObject)
	}, [removeObject])

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<Label htmlFor="removeObject" className="w-max">
					quitar :
				</Label>
				<Input
					type="text"
					id="removeObject"
					name="removeObject"
					placeholder="objeto..."
					className="flex-1 text-center"
					value={removeObjectValue}
					onChange={e => setRemoveObjectValue(e.target.value)}
				/>
			</div>
			<Button
				className="w-full cursor-pointer"
				type="submit"
				disabled={removeObjectValue === ""}
			>
				Aplicar
			</Button>
		</form>
	)
}
