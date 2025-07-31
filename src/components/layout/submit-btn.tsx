"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

export default function SubmitBtn() {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" className="bg-orange-500" disabled={pending}>
			{pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Subir"}
		</Button>
	)
}
