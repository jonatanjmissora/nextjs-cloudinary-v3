import useTransformStore from "@/lib/zustand-transform"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const TransformMenu8 = () => {
	const { setRemoveObject } = useTransformStore()

	const [removeObjectValue, setRemoveObjectValue] = useState<string>("")

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setRemoveObject(removeObjectValue)
	}

	const resetRemoveObject = () => {
		setRemoveObject("")
		setRemoveObjectValue("")
	}

	return (
		<article className="w-full px-4">
			<p className="pb-2">Remover objeto</p>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					type="text"
					name="removeObject"
					id="removeObject"
					onChange={e => setRemoveObjectValue(e.target.value)}
					placeholder="...object..."
					className="text-center"
					value={removeObjectValue}
				/>
				<Button variant="default" type="submit" className="">
					remove
				</Button>
				<Button
					variant="outline"
					type="button"
					onClick={resetRemoveObject}
					className=""
				>
					original
				</Button>
			</form>
		</article>
	)
}
